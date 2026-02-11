<script setup lang="ts">
import { ref, nextTick, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useChatStore } from '@/stores/chat'
import ChatMessage from '@/components/chat/ChatMessage.vue'
import ChatInput from '@/components/chat/ChatInput.vue'
import ChatTriggerCards from '@/components/chat/ChatTriggerCards.vue'
import { Box, X, Trash2, Sparkles, Plus, MessageSquare, Trash, PanelLeftClose, PanelLeft } from 'lucide-vue-next'

const router = useRouter()
const chatStore = useChatStore()

const messagesContainer = ref<HTMLDivElement | null>(null)
const chatInputRef = ref<InstanceType<typeof ChatInput> | null>(null)
const showSidebar = ref(true)

// Auto-scroll on new messages
watch(
  () => chatStore.messages.length,
  async () => {
    await nextTick()
    scrollToBottom()
  }
)

watch(
  () => chatStore.isTyping,
  async () => {
    await nextTick()
    scrollToBottom()
  }
)

onMounted(() => {
  chatInputRef.value?.focus()
})

function scrollToBottom() {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

async function handleSend(text: string) {
  const navigateTo = await chatStore.sendMessage(text)
  if (navigateTo) {
    setTimeout(() => {
      router.push(navigateTo)
    }, 800)
  }
}

function handleTrigger(command: string) {
  handleSend(command)
}

function exitChat() {
  router.back()
}

function formatTime(date: Date): string {
  const now = new Date()
  const diffH = Math.floor((now.getTime() - date.getTime()) / 3600000)
  if (diffH < 1) return 'Ahora'
  if (diffH < 24) return `Hace ${diffH}h`
  const diffD = Math.floor(diffH / 24)
  return `Hace ${diffD}d`
}
</script>

<template>
  <div class="fixed inset-0 z-50 bg-surface-950 flex">

    <!-- ═══ Sidebar: Conversation History ═══ -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="-translate-x-full opacity-0"
      enter-to-class="translate-x-0 opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="translate-x-0 opacity-100"
      leave-to-class="-translate-x-full opacity-0"
    >
      <aside
        v-show="showSidebar"
        class="w-[260px] flex-shrink-0 bg-surface-900 border-r border-border flex flex-col h-full"
      >
        <!-- Sidebar header -->
        <div class="p-4 border-b border-border flex items-center justify-between">
          <h2 class="text-xs font-semibold text-text-muted uppercase tracking-[0.15em]">Historial</h2>
          <button
            @click="chatStore.newConversation()"
            class="p-1.5 rounded-lg hover:bg-surface-700/50 text-text-muted hover:text-accent-400 transition-all"
            title="Nueva conversación"
          >
            <Plus class="w-4 h-4" />
          </button>
        </div>

        <!-- Conversation list -->
        <div class="flex-1 overflow-y-auto p-2 space-y-0.5">
          <button
            v-for="conv in chatStore.conversations"
            :key="conv.id"
            @click="chatStore.selectConversation(conv.id)"
            class="w-full group flex items-start gap-3 px-3 py-3 rounded-xl text-left transition-all duration-200"
            :class="chatStore.currentConversationId === conv.id
              ? 'bg-surface-700/60 border border-border'
              : 'hover:bg-surface-800/60 border border-transparent'"
          >
            <MessageSquare class="w-4 h-4 text-text-muted mt-0.5 flex-shrink-0" />
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-text-primary truncate">{{ conv.title }}</p>
              <p class="text-xs text-text-muted mt-0.5 truncate">{{ conv.preview }}</p>
            </div>
            <div class="flex flex-col items-end gap-1 flex-shrink-0">
              <span class="text-[10px] text-text-muted">{{ formatTime(conv.timestamp) }}</span>
              <button
                @click.stop="chatStore.deleteConversation(conv.id)"
                class="p-1 rounded-md opacity-0 group-hover:opacity-100 hover:bg-surface-600/50 text-text-muted hover:text-danger-400 transition-all"
                title="Eliminar"
              >
                <Trash class="w-3 h-3" />
              </button>
            </div>
          </button>

          <!-- Empty state -->
          <div v-if="chatStore.conversations.length === 0" class="px-4 py-8 text-center">
            <MessageSquare class="w-8 h-8 text-text-dim mx-auto mb-2" />
            <p class="text-xs text-text-muted">Sin conversaciones aún</p>
          </div>
        </div>
      </aside>
    </Transition>

    <!-- ═══ Main Chat Area ═══ -->
    <div class="flex-1 flex flex-col min-w-0 relative">

      <!-- Dot pattern background -->
      <div class="absolute inset-0 pointer-events-none opacity-[0.4]"
        style="background-image: radial-gradient(circle, var(--color-surface-500) 0.5px, transparent 0.5px); background-size: 24px 24px;"
      ></div>

      <!-- Top accent line -->
      <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-500/30 to-transparent z-10"></div>

      <!-- Header -->
      <header class="relative z-10 flex items-center justify-between px-5 py-3.5 border-b border-border/50 glass">
        <div class="flex items-center gap-3">
          <!-- Sidebar toggle -->
          <button
            @click="showSidebar = !showSidebar"
            class="p-2 rounded-xl hover:bg-surface-700/50 text-text-muted hover:text-text-secondary transition-all duration-200"
            :title="showSidebar ? 'Ocultar historial' : 'Mostrar historial'"
          >
            <PanelLeftClose v-if="showSidebar" class="w-[18px] h-[18px]" />
            <PanelLeft v-else class="w-[18px] h-[18px]" />
          </button>

          <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center">
            <Box class="w-4 h-4 text-surface-950" />
          </div>
          <div>
            <h1 class="font-display font-semibold text-text-primary text-sm tracking-tight">DS Manager Chat</h1>
            <p class="text-[10px] text-text-muted tracking-widest uppercase">Modo conversacional</p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button
            v-if="chatStore.hasMessages"
            @click="chatStore.clearMessages()"
            class="p-2 rounded-xl hover:bg-surface-700/50 text-text-muted hover:text-text-secondary transition-all duration-200"
            title="Limpiar conversación"
          >
            <Trash2 class="w-4 h-4" />
          </button>
          <button
            @click="exitChat"
            class="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-800/60 border border-border hover:bg-surface-700/60 hover:border-accent-500/20 text-text-secondary text-sm font-medium transition-all duration-200"
          >
            <X class="w-4 h-4" />
            Salir
          </button>
        </div>
      </header>

      <!-- Chat messages area -->
      <div
        ref="messagesContainer"
        class="flex-1 overflow-y-auto relative z-[1]"
      >
        <div class="max-w-3xl mx-auto px-6 py-8">
          <!-- Empty state: just greeting -->
          <div
            v-if="!chatStore.hasMessages"
            class="flex flex-col items-center justify-center min-h-[50vh]"
          >
            <div class="text-center animate-fade-up">
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center mx-auto mb-5">
                <Sparkles class="w-7 h-7 text-surface-950" />
              </div>
              <h2 class="text-2xl font-display font-bold text-text-primary tracking-tight mb-2">
                Hola, Sho
              </h2>
              <p class="text-text-muted text-sm max-w-md leading-relaxed">
                Soy tu asistente del Design System. Pregúntame sobre componentes, issues, métricas de adopción o cualquier cosa del sistema.
              </p>
            </div>
          </div>

          <!-- Messages -->
          <div v-else class="space-y-5">
            <ChatMessage
              v-for="message in chatStore.messages"
              :key="message.id"
              :message="message"
            />

            <!-- Typing indicator -->
            <div
              v-if="chatStore.isTyping"
              class="flex gap-3 justify-start animate-fade-up"
            >
              <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center flex-shrink-0">
                <span class="text-surface-950 font-bold text-xs">DS</span>
              </div>
              <div class="bg-surface-800/60 border border-border rounded-2xl rounded-bl-md px-4 py-3">
                <div class="flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-text-muted/40 animate-bounce [animation-delay:0ms]"></span>
                  <span class="w-2 h-2 rounded-full bg-text-muted/40 animate-bounce [animation-delay:150ms]"></span>
                  <span class="w-2 h-2 rounded-full bg-text-muted/40 animate-bounce [animation-delay:300ms]"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ═══ Bottom: Triggers + Input (grouped together) ═══ -->
      <div class="relative z-10 border-t border-border/50">
        <!-- Gradient fade above -->
        <div class="absolute -top-16 left-0 right-0 h-16 bg-gradient-to-t from-surface-950 to-transparent pointer-events-none"></div>

        <div class="max-w-3xl mx-auto px-6 pt-4 pb-5">
          <!-- Trigger cards: only when no messages -->
          <div v-if="!chatStore.hasMessages" class="mb-3 animate-fade-up stagger-2">
            <ChatTriggerCards @trigger="handleTrigger" />
          </div>

          <!-- Chat input -->
          <ChatInput
            ref="chatInputRef"
            @send="handleSend"
          />
        </div>
      </div>
    </div>
  </div>
</template>
