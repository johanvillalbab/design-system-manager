import type { UsageMetric, ComponentUsage, ProjectCoverage, PlatformUsage, Alert, Recommendation } from '@/types'

export const adoptionOverTime: UsageMetric[] = [
  { date: '2025-07', value: 45 },
  { date: '2025-08', value: 52 },
  { date: '2025-09', value: 58 },
  { date: '2025-10', value: 64 },
  { date: '2025-11', value: 71 },
  { date: '2025-12', value: 78 },
  { date: '2026-01', value: 84 }
]

export const topComponents: ComponentUsage[] = [
  { componentId: 'icon-001', componentName: 'Icon Library', usageCount: 3421, trend: 5.2 },
  { componentId: 'color-001', componentName: 'Color Tokens', usageCount: 2456, trend: 3.1 },
  { componentId: 'typo-001', componentName: 'Typography', usageCount: 2134, trend: 2.8 },
  { componentId: 'spacing-001', componentName: 'Spacing System', usageCount: 1987, trend: 1.5 },
  { componentId: 'btn-001', componentName: 'Button', usageCount: 1842, trend: 8.4 },
  { componentId: 'inp-001', componentName: 'Input Field', usageCount: 1256, trend: 4.2 },
  { componentId: 'card-001', componentName: 'Card', usageCount: 987, trend: -2.1 },
  { componentId: 'badge-001', componentName: 'Badge', usageCount: 892, trend: 6.7 },
  { componentId: 'nav-001', componentName: 'Navigation Bar', usageCount: 756, trend: 1.2 },
  { componentId: 'tab-001', componentName: 'Tabs', usageCount: 621, trend: 3.5 }
]

export const projectCoverage: ProjectCoverage[] = [
  { projectId: 'proj-001', projectName: 'Mobile App v2', coverage: 87, totalComponents: 45, adoptedComponents: 39 },
  { projectId: 'proj-002', projectName: 'Dashboard Redesign', coverage: 72, totalComponents: 32, adoptedComponents: 23 },
  { projectId: 'proj-003', projectName: 'Marketing Site', coverage: 94, totalComponents: 28, adoptedComponents: 26 },
  { projectId: 'proj-004', projectName: 'Admin Panel', coverage: 65, totalComponents: 52, adoptedComponents: 34 },
  { projectId: 'proj-005', projectName: 'E-commerce Flow', coverage: 91, totalComponents: 38, adoptedComponents: 35 },
  { projectId: 'proj-006', projectName: 'Onboarding Screens', coverage: 88, totalComponents: 18, adoptedComponents: 16 },
  { projectId: 'proj-007', projectName: 'Settings Module', coverage: 76, totalComponents: 25, adoptedComponents: 19 },
  { projectId: 'proj-008', projectName: 'Notification Center', coverage: 82, totalComponents: 15, adoptedComponents: 12 }
]

export const platformUsage: PlatformUsage[] = [
  { 
    platform: 'web', 
    components: ['btn-001', 'inp-001', 'card-001', 'modal-001', 'tab-001', 'toast-001', 'select-001'],
    usage: 68 
  },
  { 
    platform: 'ios', 
    components: ['btn-001', 'inp-001', 'card-001', 'nav-001', 'avatar-001'],
    usage: 22 
  },
  { 
    platform: 'android', 
    components: ['btn-001', 'inp-001', 'card-001', 'nav-001'],
    usage: 10 
  }
]

export const alerts: Alert[] = [
  {
    id: 'alert-001',
    type: 'warning',
    message: 'Card component usage dropped 15% in the last 30 days',
    componentId: 'card-001',
    date: '2026-01-22'
  },
  {
    id: 'alert-002',
    type: 'info',
    message: 'Button v3.2.1 adoption reached 95% across all projects',
    componentId: 'btn-001',
    date: '2026-01-20'
  },
  {
    id: 'alert-003',
    type: 'warning',
    message: 'Admin Panel project coverage below 70% threshold',
    date: '2026-01-19'
  },
  {
    id: 'alert-004',
    type: 'success',
    message: 'Marketing Site achieved 94% design system coverage',
    date: '2026-01-18'
  }
]

export const recommendations: Recommendation[] = [
  {
    id: 'rec-001',
    type: 'deprecate',
    componentId: 'dropdown-001',
    componentName: 'Dropdown',
    reason: 'Zero usage in the last 60 days',
    metric: '0 instances'
  },
  {
    id: 'rec-002',
    type: 'update',
    componentId: 'card-001',
    componentName: 'Card',
    reason: '156 instances still on v1.x',
    metric: '16% of usage'
  },
  {
    id: 'rec-003',
    type: 'promote',
    componentId: 'modal-001',
    componentName: 'Modal',
    reason: 'Beta component with stable usage pattern',
    metric: '432 instances, 0 issues'
  }
]

export const analyticsStats = {
  totalComponents: 20,
  adoptionRate: 84,
  avgImplementationTime: 2.3,
  activeProjects: 8,
  totalInstances: 18456,
  issuesResolved: 127,
  stars: 0,
  forks: 0,
  latestVersion: '',
  totalVersions: 0,
  weeklyDownloads: 0
}

export const implementationTime: { component: string; days: number }[] = [
  { component: 'Button', days: 1.5 },
  { component: 'Input Field', days: 2.0 },
  { component: 'Card', days: 1.2 },
  { component: 'Modal', days: 3.5 },
  { component: 'Navigation Bar', days: 4.0 },
  { component: 'Tabs', days: 2.5 },
  { component: 'Form Pattern', days: 5.0 },
  { component: 'Dashboard Template', days: 8.0 }
]

export const dependencyGraph = {
  nodes: [
    { id: 'btn-001', name: 'Button', group: 'components' },
    { id: 'inp-001', name: 'Input', group: 'components' },
    { id: 'card-001', name: 'Card', group: 'components' },
    { id: 'modal-001', name: 'Modal', group: 'components' },
    { id: 'form-001', name: 'Form Pattern', group: 'patterns' },
    { id: 'color-001', name: 'Colors', group: 'foundations' },
    { id: 'typo-001', name: 'Typography', group: 'foundations' },
    { id: 'spacing-001', name: 'Spacing', group: 'foundations' }
  ],
  links: [
    { source: 'btn-001', target: 'color-001' },
    { source: 'btn-001', target: 'typo-001' },
    { source: 'btn-001', target: 'spacing-001' },
    { source: 'inp-001', target: 'color-001' },
    { source: 'inp-001', target: 'typo-001' },
    { source: 'card-001', target: 'spacing-001' },
    { source: 'card-001', target: 'color-001' },
    { source: 'modal-001', target: 'btn-001' },
    { source: 'modal-001', target: 'card-001' },
    { source: 'form-001', target: 'btn-001' },
    { source: 'form-001', target: 'inp-001' },
    { source: 'form-001', target: 'card-001' }
  ]
}

// Team Adoption Data (v2.5)
import type { TeamAdoption, ComponentHealth } from '@/types'

export const teamAdoption: TeamAdoption[] = [
  {
    teamId: 'team-001',
    teamName: 'Mobile App',
    coverage: 87,
    componentsUsed: ['btn-001', 'inp-001', 'card-001', 'modal-001', 'nav-001'],
    lastActivity: '2026-01-24T10:00:00Z'
  },
  {
    teamId: 'team-002',
    teamName: 'Web Platform',
    coverage: 94,
    componentsUsed: ['btn-001', 'inp-001', 'card-001', 'tab-001', 'form-001'],
    lastActivity: '2026-01-24T14:30:00Z'
  },
  {
    teamId: 'team-003',
    teamName: 'Marketing',
    coverage: 72,
    componentsUsed: ['btn-001', 'card-001', 'badge-001'],
    lastActivity: '2026-01-22T09:00:00Z'
  },
  {
    teamId: 'team-004',
    teamName: 'Admin Tools',
    coverage: 65,
    componentsUsed: ['btn-001', 'inp-001', 'tab-001'],
    lastActivity: '2026-01-20T16:00:00Z'
  },
  {
    teamId: 'team-005',
    teamName: 'E-commerce',
    coverage: 91,
    componentsUsed: ['btn-001', 'inp-001', 'card-001', 'modal-001', 'form-001', 'badge-001'],
    lastActivity: '2026-01-24T08:00:00Z'
  }
]

export const componentHealth: ComponentHealth[] = [
  {
    componentId: 'btn-001',
    componentName: 'Button',
    bugCount: 2,
    openIssues: 3,
    contributionsPending: 1,
    lastUpdate: '2026-01-22T00:00:00Z',
    adoptionTrend: 5.2
  },
  {
    componentId: 'inp-001',
    componentName: 'Input Field',
    bugCount: 1,
    openIssues: 2,
    contributionsPending: 1,
    lastUpdate: '2026-01-20T00:00:00Z',
    adoptionTrend: 4.1
  },
  {
    componentId: 'card-001',
    componentName: 'Card',
    bugCount: 0,
    openIssues: 2,
    contributionsPending: 2,
    lastUpdate: '2026-01-18T00:00:00Z',
    adoptionTrend: -2.1
  },
  {
    componentId: 'modal-001',
    componentName: 'Modal',
    bugCount: 0,
    openIssues: 1,
    contributionsPending: 0,
    lastUpdate: '2026-01-15T00:00:00Z',
    adoptionTrend: 1.5
  },
  {
    componentId: 'tab-001',
    componentName: 'Tabs',
    bugCount: 0,
    openIssues: 1,
    contributionsPending: 0,
    lastUpdate: '2026-01-10T00:00:00Z',
    adoptionTrend: 3.5
  }
]

export const recentActivity = [
  { type: 'release', message: 'Button v3.2.1 released', date: '2026-01-22T10:00:00Z', componentId: 'btn-001' },
  { type: 'issue', message: 'New bug reported for Input', date: '2026-01-24T09:15:00Z', componentId: 'inp-001' },
  { type: 'contribution', message: 'PR merged: Card skeleton variant', date: '2026-01-23T15:00:00Z', componentId: 'card-001' },
  { type: 'review', message: 'Design review completed for Modal', date: '2026-01-21T14:00:00Z', componentId: 'modal-001' },
  { type: 'adoption', message: 'Mobile App team adopted 5 new components', date: '2026-01-20T11:00:00Z' }
]
