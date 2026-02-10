import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { ChatMessage, ChatTrigger, ChatSuggestion, ChatAction, ChatConversation } from '@/types/chat'
import { useComponentsStore } from './components'
import { useIssuesStore } from './issues'
import { useAnalyticsStore } from './analytics'
import { useAuditStore } from './audit'
import { useRequestsStore } from './requests'
import { useContributionsStore } from './contributions'

export const useChatStore = defineStore('chat', () => {
  // State
  const isActive = ref(false)
  const messages = ref<ChatMessage[]>([])
  const isTyping = ref(false)
  const currentConversationId = ref<string | null>(null)
  const conversations = ref<ChatConversation[]>([
    { id: 'conv-1', title: 'Estado del sistema', preview: 'Resumen general de componentes...', timestamp: new Date(Date.now() - 3600000 * 2), messageCount: 4 },
    { id: 'conv-2', title: 'Audit de diseño', preview: 'Issues de inconsistencia pendientes...', timestamp: new Date(Date.now() - 3600000 * 24), messageCount: 6 },
    { id: 'conv-3', title: 'Búsqueda de componentes', preview: 'Buscar button, input, modal...', timestamp: new Date(Date.now() - 3600000 * 48), messageCount: 3 },
    { id: 'conv-4', title: 'Métricas de adopción', preview: 'Analytics de uso del design system...', timestamp: new Date(Date.now() - 3600000 * 72), messageCount: 5 },
  ])

  // Available triggers
  const triggers: ChatTrigger[] = [
    { command: '/components', description: 'Buscar y listar componentes del design system', icon: 'Box', example: '/components button' },
    { command: '/issues', description: 'Ver issues abiertos y su estado', icon: 'Bug', example: '/issues critical' },
    { command: '/analytics', description: 'Resumen de métricas de adopción', icon: 'BarChart3', example: '/analytics' },
    { command: '/audit', description: 'Estado del audit y issues críticas', icon: 'AlertTriangle', example: '/audit' },
    { command: '/requests', description: 'Requests de componentes pendientes', icon: 'GitPullRequest', example: '/requests' },
    { command: '/contributions', description: 'Estado de contribuciones y PRs', icon: 'GitMerge', example: '/contributions' },
    { command: '/status', description: 'Resumen general del sistema', icon: 'Activity', example: '/status' },
    { command: '/navigate', description: 'Navegar a una sección de la plataforma', icon: 'ArrowRight', example: '/navigate analytics' },
    { command: '/help', description: 'Ver comandos disponibles', icon: 'HelpCircle', example: '/help' },
  ]

  // Quick suggestions for empty state
  const suggestions: ChatSuggestion[] = [
    { id: 'status', label: 'Ver estado del sistema', description: 'Resumen general de componentes, issues y métricas', icon: 'Activity', trigger: '/status' },
    { id: 'audit', label: 'Revisar audit', description: 'Issues de inconsistencia de diseño pendientes', icon: 'AlertTriangle', trigger: '/audit' },
    { id: 'components', label: 'Explorar componentes', description: 'Buscar y filtrar componentes disponibles', icon: 'Box', trigger: '/components' },
  ]

  // Getters
  const hasMessages = computed(() => messages.value.length > 0)

  const matchingTriggers = computed(() => {
    return (input: string): ChatTrigger[] => {
      if (!input.startsWith('/')) return []
      const cmd = input.toLowerCase().split(' ')[0] ?? ''
      return triggers.filter(t => t.command.startsWith(cmd))
    }
  })

  // Helpers
  function createMessage(role: 'user' | 'assistant', content: string, actions?: ChatAction[], data?: ChatMessage['data']): ChatMessage {
    return {
      id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      role,
      content,
      timestamp: new Date(),
      actions,
      data
    }
  }

  async function simulateTyping(delayMs = 600): Promise<void> {
    isTyping.value = true
    await new Promise(resolve => setTimeout(resolve, delayMs))
    isTyping.value = false
  }

  // Trigger handlers
  function handleComponents(query?: string): ChatMessage {
    const store = useComponentsStore()
    const components = store.components

    if (query) {
      const q = query.toLowerCase()
      const matches = components.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.tags.some(t => t.toLowerCase().includes(q)) ||
        c.category.toLowerCase().includes(q)
      )

      if (matches.length === 0) {
        return createMessage('assistant', `No encontré componentes que coincidan con "${query}". Intenta con otro término o usa \`/components\` para ver todos.`)
      }

      return createMessage(
        'assistant',
        `Encontré **${matches.length} componente${matches.length !== 1 ? 's' : ''}** para "${query}":`,
        matches.slice(0, 8).map(c => ({
          type: 'navigate' as const,
          label: c.name,
          payload: `/component/${c.id}`
        })),
        {
          list: matches.slice(0, 8).map(c => ({
            text: `**${c.name}** — ${c.description}`,
            badge: c.status,
            badgeColor: c.status === 'stable' ? 'success' as const : c.status === 'beta' ? 'warning' as const : 'danger' as const
          }))
        }
      )
    }

    // No query: show summary
    const stats = store.stats
    return createMessage(
      'assistant',
      `Aquí tienes un resumen de la **Component Library**:`,
      [
        { type: 'navigate', label: 'Ver librería completa', payload: '/' }
      ],
      {
        items: [
          { label: 'Total componentes', value: stats.total },
          { label: 'Estables', value: stats.stable, status: 'success' },
          { label: 'Beta', value: stats.beta, status: 'warning' },
          { label: 'Deprecated', value: stats.deprecated, status: 'danger' },
          { label: 'Cobertura', value: `${stats.coverage}%`, status: 'info' },
          { label: 'Con actualizaciones', value: stats.needsUpdate, status: 'warning' },
        ]
      }
    )
  }

  function handleIssues(filter?: string): ChatMessage {
    const store = useIssuesStore()
    const stats = store.stats

    if (filter === 'critical' || filter === 'high') {
      const critical = store.issues.filter(i => i.priority === filter && i.status !== 'closed')
      return createMessage(
        'assistant',
        `Hay **${critical.length} issues ${filter}** sin cerrar:`,
        [{ type: 'navigate', label: 'Ver todas las issues', payload: '/issues' }],
        {
          list: critical.slice(0, 6).map(i => ({
            text: `**${i.title}** — ${i.type} · asignado a ${i.assignee?.name || 'sin asignar'}`,
            badge: i.status,
            badgeColor: i.status === 'open' ? 'danger' as const : i.status === 'in_progress' ? 'warning' as const : 'success' as const
          }))
        }
      )
    }

    return createMessage(
      'assistant',
      `Resumen de **Issues** del Design System:`,
      [{ type: 'navigate', label: 'Ir a Issues', payload: '/issues' }],
      {
        items: [
          { label: 'Total', value: stats.total },
          { label: 'Abiertas', value: stats.open, status: 'danger' },
          { label: 'En progreso', value: stats.inProgress, status: 'warning' },
          { label: 'Resueltas', value: stats.resolved, status: 'success' },
          { label: 'Bugs activos', value: stats.bugs, status: 'danger' },
          { label: 'Críticas', value: stats.critical, status: 'danger' },
        ]
      }
    )
  }

  function handleAnalytics(): ChatMessage {
    const store = useAnalyticsStore()
    const stats = store.stats

    return createMessage(
      'assistant',
      `Métricas de **adopción** del Design System:`,
      [{ type: 'navigate', label: 'Ver Analytics completo', payload: '/analytics' }],
      {
        items: [
          { label: 'Tasa de adopción', value: `${stats.adoptionRate}%`, status: 'success' },
          { label: 'Componentes usados', value: stats.componentsUsed },
          { label: 'Proyectos activos', value: stats.activeProjects },
          { label: 'Cobertura promedio', value: `${store.avgTeamCoverage}%`, status: 'info' },
          { label: 'Componentes sanos', value: store.healthyComponents, status: 'success' },
          { label: 'Tiempo impl. promedio', value: `${store.avgImplementationTime} días` },
        ]
      }
    )
  }

  function handleAudit(): ChatMessage {
    const store = useAuditStore()
    const stats = store.stats

    return createMessage(
      'assistant',
      `Estado del **Design Audit**:`,
      [{ type: 'navigate', label: 'Ir al Audit', payload: '/audit' }],
      {
        items: [
          { label: 'Issues totales', value: stats.totalIssues, status: 'warning' },
          { label: 'Críticas', value: stats.critical, status: 'danger' },
          { label: 'Alta prioridad', value: stats.high, status: 'warning' },
          { label: 'Media', value: stats.medium, status: 'info' },
          { label: 'Auto-corregibles', value: stats.autoFixable, status: 'success' },
          { label: 'Cobertura promedio', value: `${stats.avgCoverage}%` },
        ]
      }
    )
  }

  function handleRequests(): ChatMessage {
    const store = useRequestsStore()
    const stats = store.stats
    const topVoted = store.topVoted

    return createMessage(
      'assistant',
      `**Component Requests** — solicitudes de la comunidad:`,
      [{ type: 'navigate', label: 'Ver Requests', payload: '/requests' }],
      {
        items: [
          { label: 'Total requests', value: stats.total },
          { label: 'Enviadas', value: stats.submitted, status: 'info' },
          { label: 'En revisión', value: stats.underReview, status: 'warning' },
          { label: 'En desarrollo', value: stats.inDevelopment, status: 'success' },
          { label: 'Top votada', value: topVoted[0]?.title || 'N/A', status: 'accent' as any },
        ]
      }
    )
  }

  function handleContributions(): ChatMessage {
    const store = useContributionsStore()
    const stats = store.stats

    return createMessage(
      'assistant',
      `Estado de **Contributions** y PRs:`,
      [{ type: 'navigate', label: 'Ver Contributions', payload: '/contributions' }],
      {
        items: [
          { label: 'Total', value: stats.total },
          { label: 'Pendientes de review', value: stats.pending, status: 'warning' },
          { label: 'Aprobadas', value: stats.approved, status: 'success' },
          { label: 'Merged', value: stats.merged, status: 'info' },
          { label: 'Rechazadas', value: stats.rejected, status: 'danger' },
        ]
      }
    )
  }

  function handleStatus(): ChatMessage {
    const componentsStore = useComponentsStore()
    const issuesStore = useIssuesStore()
    const auditStore = useAuditStore()
    const requestsStore = useRequestsStore()
    const contributionsStore = useContributionsStore()

    const cStats = componentsStore.stats
    const iStats = issuesStore.stats
    const aStats = auditStore.stats

    return createMessage(
      'assistant',
      `**Resumen general** del Design System Manager:`,
      [
        { type: 'trigger', label: 'Ver componentes', payload: '/components' },
        { type: 'trigger', label: 'Ver issues', payload: '/issues' },
        { type: 'trigger', label: 'Ver audit', payload: '/audit' },
      ],
      {
        items: [
          { label: 'Componentes', value: `${cStats.total} (${cStats.stable} estables)`, status: 'success' },
          { label: 'Cobertura', value: `${cStats.coverage}%`, status: cStats.coverage >= 80 ? 'success' : 'warning' },
          { label: 'Issues abiertas', value: iStats.open, status: iStats.open > 5 ? 'danger' : 'warning' },
          { label: 'Issues críticas', value: iStats.critical, status: iStats.critical > 0 ? 'danger' : 'success' },
          { label: 'Audit pendientes', value: aStats.totalIssues, status: aStats.critical > 0 ? 'danger' : 'warning' },
          { label: 'Requests activas', value: requestsStore.stats.total },
          { label: 'PRs pendientes', value: contributionsStore.stats.pending, status: 'warning' },
        ]
      }
    )
  }

  function handleNavigate(target?: string): { message: ChatMessage; route?: string } {
    const routes: Record<string, { path: string; label: string }> = {
      dashboard: { path: '/', label: 'Dashboard' },
      home: { path: '/', label: 'Dashboard' },
      components: { path: '/', label: 'Component Library' },
      issues: { path: '/issues', label: 'Issues' },
      contributions: { path: '/contributions', label: 'Contributions' },
      audit: { path: '/audit', label: 'Design Audit' },
      requests: { path: '/requests', label: 'Component Requests' },
      analytics: { path: '/analytics', label: 'Analytics' },
      docs: { path: '/docs', label: 'Documentation' },
    }

    if (target) {
      const match = routes[target.toLowerCase()]
      if (match) {
        return {
          message: createMessage('assistant', `Navegando a **${match.label}**...`),
          route: match.path
        }
      }
      return {
        message: createMessage(
          'assistant',
          `No encontré la sección "${target}". Las secciones disponibles son: ${Object.keys(routes).join(', ')}`
        )
      }
    }

    return {
      message: createMessage(
        'assistant',
        `¿A dónde quieres ir? Las secciones disponibles son:`,
        Object.entries(routes).map(([key, val]) => ({
          type: 'navigate' as const,
          label: val.label,
          payload: val.path
        }))
      )
    }
  }

  function handleHelp(): ChatMessage {
    return createMessage(
      'assistant',
      `Estos son los **comandos disponibles**. Escribe cualquiera para obtener información del sistema:`,
      undefined,
      {
        list: triggers.map(t => ({
          text: `\`${t.command}\` — ${t.description}`,
          badge: t.example || '',
          badgeColor: 'accent' as const
        }))
      }
    )
  }

  function handleFreeText(text: string): ChatMessage {
    const lower = text.toLowerCase()

    // Try to match intent
    if (lower.includes('componente') || lower.includes('component') || lower.includes('botón') || lower.includes('button')) {
      const query = text.replace(/.*(?:componente|component|buscar|busca|encuentra|find)\s*/i, '').trim()
      return handleComponents(query || undefined)
    }
    if (lower.includes('issue') || lower.includes('bug') || lower.includes('error')) {
      return handleIssues()
    }
    if (lower.includes('analytic') || lower.includes('métrica') || lower.includes('adopción') || lower.includes('adoption')) {
      return handleAnalytics()
    }
    if (lower.includes('audit') || lower.includes('inconsistencia')) {
      return handleAudit()
    }
    if (lower.includes('request') || lower.includes('solicitud') || lower.includes('pedido')) {
      return handleRequests()
    }
    if (lower.includes('contribución') || lower.includes('contribution') || lower.includes('pr ') || lower.includes('pull request')) {
      return handleContributions()
    }
    if (lower.includes('estado') || lower.includes('status') || lower.includes('resumen') || lower.includes('overview')) {
      return handleStatus()
    }
    if (lower.includes('navegar') || lower.includes('ir a') || lower.includes('navigate') || lower.includes('go to')) {
      const target = text.replace(/.*(?:navegar a|ir a|navigate to|go to)\s*/i, '').trim()
      return handleNavigate(target || undefined).message
    }
    if (lower.includes('ayuda') || lower.includes('help') || lower.includes('comando')) {
      return handleHelp()
    }

    // Default response
    return createMessage(
      'assistant',
      `No estoy seguro de qué necesitas. Puedo ayudarte con información del Design System. Prueba con alguno de estos comandos:`,
      [
        { type: 'trigger', label: '/status', payload: '/status' },
        { type: 'trigger', label: '/components', payload: '/components' },
        { type: 'trigger', label: '/help', payload: '/help' },
      ]
    )
  }

  // Main action: send message
  async function sendMessage(text: string): Promise<string | undefined> {
    const trimmed = text.trim()
    if (!trimmed) return

    // Add user message
    messages.value.push(createMessage('user', trimmed))

    // Parse trigger or free text
    let response: ChatMessage
    let navigateTo: string | undefined

    if (trimmed.startsWith('/')) {
      const parts = trimmed.split(/\s+/)
      const command = parts[0]?.toLowerCase() ?? ''
      const args = parts.slice(1).join(' ').trim() || undefined

      switch (command) {
        case '/components':
          response = handleComponents(args)
          break
        case '/issues':
          response = handleIssues(args)
          break
        case '/analytics':
          response = handleAnalytics()
          break
        case '/audit':
          response = handleAudit()
          break
        case '/requests':
          response = handleRequests()
          break
        case '/contributions':
          response = handleContributions()
          break
        case '/status':
          response = handleStatus()
          break
        case '/navigate': {
          const nav = handleNavigate(args)
          response = nav.message
          navigateTo = nav.route
          break
        }
        case '/help':
          response = handleHelp()
          break
        default:
          response = createMessage(
            'assistant',
            `Comando desconocido: \`${command}\`. Usa \`/help\` para ver los comandos disponibles.`
          )
      }
    } else {
      response = handleFreeText(trimmed)
    }

    // Simulate typing delay
    await simulateTyping(400 + Math.random() * 400)

    // Add assistant response
    messages.value.push(response)

    return navigateTo
  }

  // Actions
  function activate() {
    isActive.value = true
  }

  function deactivate() {
    isActive.value = false
  }

  function toggle() {
    isActive.value = !isActive.value
  }

  function clearMessages() {
    messages.value = []
    currentConversationId.value = null
  }

  function newConversation() {
    // Save current if it has messages
    if (messages.value.length > 0 && !currentConversationId.value) {
      const firstUserMsg = messages.value.find(m => m.role === 'user')
      const title = firstUserMsg?.content.slice(0, 40) || 'Nueva conversación'
      conversations.value.unshift({
        id: `conv-${Date.now()}`,
        title,
        preview: messages.value[messages.value.length - 1]?.content.slice(0, 60) || '',
        timestamp: new Date(),
        messageCount: messages.value.length,
      })
    }
    messages.value = []
    currentConversationId.value = null
  }

  function selectConversation(id: string) {
    currentConversationId.value = id
    // In a real app, this would load messages from storage
    messages.value = []
  }

  function deleteConversation(id: string) {
    conversations.value = conversations.value.filter(c => c.id !== id)
    if (currentConversationId.value === id) {
      messages.value = []
      currentConversationId.value = null
    }
  }

  return {
    // State
    isActive,
    messages,
    isTyping,
    currentConversationId,
    conversations,
    // Data
    triggers,
    suggestions,
    // Getters
    hasMessages,
    matchingTriggers,
    // Actions
    sendMessage,
    activate,
    deactivate,
    toggle,
    clearMessages,
    newConversation,
    selectConversation,
    deleteConversation,
  }
})
