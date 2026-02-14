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
  { componentId: 'icon-001', componentName: 'Iconography', usageCount: 4210, trend: 5.2 },
  { componentId: 'token-001', componentName: 'Design Tokens', usageCount: 3842, trend: 3.8 },
  { componentId: 'typo-001', componentName: 'Typography', usageCount: 2890, trend: 2.8 },
  { componentId: 'spacing-001', componentName: 'Spacing', usageCount: 2456, trend: 1.5 },
  { componentId: 'btn-001', componentName: 'Button', usageCount: 2145, trend: 8.4 },
  { componentId: 'textfield-001', componentName: 'Textfield', usageCount: 1654, trend: 4.2 },
  { componentId: 'avatar-001', componentName: 'Avatar', usageCount: 1432, trend: 3.1 },
  { componentId: 'badge-001', componentName: 'Badge', usageCount: 1087, trend: 6.7 },
  { componentId: 'select-001', componentName: 'Select', usageCount: 987, trend: 2.5 },
  { componentId: 'lozenge-001', componentName: 'Lozenge', usageCount: 945, trend: 4.0 }
]

export const projectCoverage: ProjectCoverage[] = [
  { projectId: 'proj-001', projectName: 'Jira Board Redesign', coverage: 87, totalComponents: 45, adoptedComponents: 39 },
  { projectId: 'proj-002', projectName: 'Confluence Spaces', coverage: 72, totalComponents: 32, adoptedComponents: 23 },
  { projectId: 'proj-003', projectName: 'Trello Board', coverage: 91, totalComponents: 28, adoptedComponents: 25 },
  { projectId: 'proj-004', projectName: 'Bitbucket PR Review', coverage: 78, totalComponents: 52, adoptedComponents: 41 },
  { projectId: 'proj-005', projectName: 'Statuspage Dashboard', coverage: 95, totalComponents: 38, adoptedComponents: 36 },
  { projectId: 'proj-006', projectName: 'Opsgenie Alerts', coverage: 88, totalComponents: 18, adoptedComponents: 16 },
  { projectId: 'proj-007', projectName: 'Compass Service Catalog', coverage: 76, totalComponents: 25, adoptedComponents: 19 },
  { projectId: 'proj-008', projectName: 'Atlas Team Directory', coverage: 82, totalComponents: 15, adoptedComponents: 12 }
]

export const platformUsage: PlatformUsage[] = [
  {
    platform: 'web',
    components: ['btn-001', 'textfield-001', 'select-001', 'modal-001', 'tabs-001', 'banner-001', 'tooltip-001'],
    usage: 68
  },
  {
    platform: 'ios',
    components: ['btn-001', 'textfield-001', 'avatar-001', 'toggle-001', 'badge-001'],
    usage: 22
  },
  {
    platform: 'android',
    components: ['btn-001', 'textfield-001', 'avatar-001', 'toggle-001'],
    usage: 10
  }
]

export const alerts: Alert[] = [
  {
    id: 'alert-001',
    type: 'warning',
    message: 'Dropdown Menu usage detected — component is deprecated, migrate to Popup + Menu',
    componentId: 'dropdown-001',
    date: '2026-02-06'
  },
  {
    id: 'alert-002',
    type: 'info',
    message: 'Button v3.2.1 adoption reached 95% across all projects',
    componentId: 'btn-001',
    date: '2026-02-01'
  },
  {
    id: 'alert-003',
    type: 'warning',
    message: 'Confluence Spaces project coverage below 75% threshold',
    date: '2026-01-28'
  },
  {
    id: 'alert-004',
    type: 'success',
    message: 'Statuspage Dashboard achieved 95% design system coverage',
    date: '2026-01-25'
  },
  {
    id: 'alert-005',
    type: 'warning',
    message: 'Lozenge "moved" appearance fails WCAG AA contrast — fix in review',
    componentId: 'lozenge-001',
    date: '2026-02-03'
  }
]

export const recommendations: Recommendation[] = [
  {
    id: 'rec-001',
    type: 'deprecate',
    componentId: 'dropdown-001',
    componentName: 'Dropdown Menu',
    reason: 'Only 28 instances remain, superseded by Popup + Menu pattern',
    metric: '28 instances across 3 projects'
  },
  {
    id: 'rec-002',
    type: 'update',
    componentId: 'lozenge-001',
    componentName: 'Lozenge',
    reason: '312 instances still on v1.5.0, missing contrast fix for "moved" appearance',
    metric: '33% of usage on outdated version'
  },
  {
    id: 'rec-003',
    type: 'promote',
    componentId: 'banner-001',
    componentName: 'Banner',
    reason: 'Beta component with 312 stable instances and zero bugs in 60 days',
    metric: '312 instances, 0 open bugs'
  },
  {
    id: 'rec-004',
    type: 'update',
    componentId: 'tooltip-001',
    componentName: 'Tooltip',
    reason: '145 instances running v1.3.x, missing Firefox Escape key fix',
    metric: '19% of usage needs update'
  }
]

export const analyticsStats = {
  totalComponents: 24,
  adoptionRate: 84,
  avgImplementationTime: 2.3,
  activeProjects: 8,
  totalInstances: 22891,
  issuesResolved: 134,
  stars: 0,
  forks: 0,
  latestVersion: '',
  totalVersions: 0,
  weeklyDownloads: 0
}

export const implementationTime: { component: string; days: number }[] = [
  { component: 'Button', days: 1.5 },
  { component: 'Textfield', days: 2.0 },
  { component: 'Select', days: 2.8 },
  { component: 'Modal Dialog', days: 3.5 },
  { component: 'Tabs', days: 2.5 },
  { component: 'Form Pattern', days: 5.0 },
  { component: 'Navigation Pattern', days: 4.0 },
  { component: 'Page Layout', days: 8.0 }
]

export const dependencyGraph = {
  nodes: [
    { id: 'btn-001', name: 'Button', group: 'components' },
    { id: 'textfield-001', name: 'Textfield', group: 'components' },
    { id: 'select-001', name: 'Select', group: 'components' },
    { id: 'modal-001', name: 'Modal Dialog', group: 'components' },
    { id: 'tabs-001', name: 'Tabs', group: 'components' },
    { id: 'avatar-001', name: 'Avatar', group: 'components' },
    { id: 'form-001', name: 'Form Pattern', group: 'patterns' },
    { id: 'token-001', name: 'Design Tokens', group: 'foundations' },
    { id: 'typo-001', name: 'Typography', group: 'foundations' },
    { id: 'spacing-001', name: 'Spacing', group: 'foundations' }
  ],
  links: [
    { source: 'btn-001', target: 'token-001' },
    { source: 'btn-001', target: 'typo-001' },
    { source: 'btn-001', target: 'spacing-001' },
    { source: 'textfield-001', target: 'token-001' },
    { source: 'textfield-001', target: 'typo-001' },
    { source: 'select-001', target: 'token-001' },
    { source: 'select-001', target: 'textfield-001' },
    { source: 'modal-001', target: 'btn-001' },
    { source: 'modal-001', target: 'spacing-001' },
    { source: 'tabs-001', target: 'token-001' },
    { source: 'tabs-001', target: 'typo-001' },
    { source: 'avatar-001', target: 'token-001' },
    { source: 'form-001', target: 'btn-001' },
    { source: 'form-001', target: 'textfield-001' },
    { source: 'form-001', target: 'select-001' }
  ]
}

// Team Adoption Data (v2.5)
import type { TeamAdoption, ComponentHealth } from '@/types'

export const teamAdoption: TeamAdoption[] = [
  {
    teamId: 'team-001',
    teamName: 'Jira Platform',
    coverage: 87,
    componentsUsed: ['btn-001', 'textfield-001', 'select-001', 'modal-001', 'tabs-001'],
    lastActivity: '2026-02-05T10:00:00Z'
  },
  {
    teamId: 'team-002',
    teamName: 'Confluence Cloud',
    coverage: 94,
    componentsUsed: ['btn-001', 'textfield-001', 'avatar-001', 'tabs-001', 'form-001'],
    lastActivity: '2026-02-06T14:30:00Z'
  },
  {
    teamId: 'team-003',
    teamName: 'Trello Web',
    coverage: 72,
    componentsUsed: ['btn-001', 'avatar-001', 'badge-001'],
    lastActivity: '2026-02-02T09:00:00Z'
  },
  {
    teamId: 'team-004',
    teamName: 'Bitbucket Cloud',
    coverage: 78,
    componentsUsed: ['btn-001', 'textfield-001', 'lozenge-001', 'select-001'],
    lastActivity: '2026-01-30T16:00:00Z'
  },
  {
    teamId: 'team-005',
    teamName: 'Statuspage',
    coverage: 95,
    componentsUsed: ['btn-001', 'textfield-001', 'banner-001', 'modal-001', 'form-001', 'badge-001'],
    lastActivity: '2026-02-07T08:00:00Z'
  }
]

export const componentHealth: ComponentHealth[] = [
  {
    componentId: 'btn-001',
    componentName: 'Button',
    bugCount: 1,
    openIssues: 1,
    contributionsPending: 1,
    lastUpdate: '2026-01-28T00:00:00Z',
    adoptionTrend: 8.4
  },
  {
    componentId: 'textfield-001',
    componentName: 'Textfield',
    bugCount: 1,
    openIssues: 1,
    contributionsPending: 1,
    lastUpdate: '2026-01-25T00:00:00Z',
    adoptionTrend: 4.2
  },
  {
    componentId: 'select-001',
    componentName: 'Select',
    bugCount: 1,
    openIssues: 1,
    contributionsPending: 0,
    lastUpdate: '2026-01-22T00:00:00Z',
    adoptionTrend: 2.5
  },
  {
    componentId: 'modal-001',
    componentName: 'Modal Dialog',
    bugCount: 1,
    openIssues: 1,
    contributionsPending: 1,
    lastUpdate: '2026-02-01T00:00:00Z',
    adoptionTrend: 1.5
  },
  {
    componentId: 'lozenge-001',
    componentName: 'Lozenge',
    bugCount: 1,
    openIssues: 1,
    contributionsPending: 1,
    lastUpdate: '2026-02-02T00:00:00Z',
    adoptionTrend: 4.0
  },
  {
    componentId: 'tabs-001',
    componentName: 'Tabs',
    bugCount: 1,
    openIssues: 1,
    contributionsPending: 0,
    lastUpdate: '2026-01-23T00:00:00Z',
    adoptionTrend: 3.5
  }
]

export const recentActivity = [
  { type: 'release', message: 'Button v3.2.1 released — Safari focus ring fix', date: '2026-02-01T10:00:00Z', componentId: 'btn-001' },
  { type: 'issue', message: 'New critical a11y bug: Textfield error not announced by NVDA', date: '2026-01-24T09:15:00Z', componentId: 'textfield-001' },
  { type: 'contribution', message: 'PR approved: Lozenge "moved" contrast fix', date: '2026-02-05T10:00:00Z', componentId: 'lozenge-001' },
  { type: 'contribution', message: 'PR submitted: Dark mode elevation tokens', date: '2026-01-30T09:30:00Z', componentId: 'token-001' },
  { type: 'review', message: 'Design review completed for Banner component', date: '2026-02-03T14:00:00Z', componentId: 'banner-001' },
  { type: 'adoption', message: 'Statuspage team adopted Banner and Badge components', date: '2026-02-07T08:00:00Z' },
  { type: 'release', message: 'Typography v3.4.0 released — responsive clamp() sizing', date: '2026-01-14T09:00:00Z', componentId: 'typo-001' }
]
