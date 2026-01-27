// Component Types
export type ComponentCategory = 'foundations' | 'components' | 'patterns' | 'templates'
export type ComponentStatus = 'stable' | 'beta' | 'deprecated'
export type Platform = 'ios' | 'android' | 'web'

export interface DesignComponent {
  id: string
  name: string
  description: string
  category: ComponentCategory
  version: string
  status: ComponentStatus
  platforms: Platform[]
  lastUpdated: string
  usageCount: number
  needsUpdate: boolean
  preview?: string
  tags: string[]
}

export interface ComponentVariant {
  id: string
  name: string
  description: string
}

export interface ComponentProp {
  name: string
  type: string
  default?: string
  required: boolean
  description: string
}

export interface ComponentVersion {
  version: string
  date: string
  changes: string[]
  author: string
}

export interface ComponentComment {
  id: string
  author: string
  avatar: string
  content: string
  date: string
  replies?: ComponentComment[]
}

export interface ComponentDetail extends DesignComponent {
  variants: ComponentVariant[]
  props: ComponentProp[]
  versions: ComponentVersion[]
  comments: ComponentComment[]
  usage: {
    doList: string[]
    dontList: string[]
  }
  accessibility: {
    wcagLevel: string
    keyboardNav: string[]
    screenReader: string[]
  }
  codeSnippets: {
    platform: Platform
    code: string
    language: string
  }[]
}

// Audit Types
export type IssueSeverity = 'critical' | 'high' | 'medium'

export interface AuditIssue {
  id: string
  severity: IssueSeverity
  type: string
  title: string
  description: string
  location: {
    file: string
    page: string
    frame: string
  }
  suggestion: string
  autoFixable: boolean
  screenshot?: string
  fixed?: boolean
}

export interface AuditProject {
  id: string
  name: string
  coverage: number
  issues: number
  lastAudit: string
}

// Request Types
export type RequestStatus = 'submitted' | 'under_review' | 'in_development' | 'ready'
export type RequestPriority = 'low' | 'medium' | 'high' | 'critical'

export interface ComponentRequest {
  id: string
  title: string
  description: string
  userStory: string
  status: RequestStatus
  priority: RequestPriority
  votes: number
  votedBy: string[]
  createdAt: string
  updatedAt: string
  author: {
    name: string
    avatar: string
  }
  attachments: string[]
  similarComponents: string[]
  affectedProjects: number
  comments: ComponentComment[]
}

// Analytics Types
export interface UsageMetric {
  date: string
  value: number
}

export interface ComponentUsage {
  componentId: string
  componentName: string
  usageCount: number
  trend: number
}

export interface ProjectCoverage {
  projectId: string
  projectName: string
  coverage: number
  totalComponents: number
  adoptedComponents: number
}

export interface PlatformUsage {
  platform: Platform
  components: string[]
  usage: number
}

export interface Alert {
  id: string
  type: 'warning' | 'info' | 'success'
  message: string
  componentId?: string
  date: string
}

export interface Recommendation {
  id: string
  type: 'deprecate' | 'update' | 'promote'
  componentId: string
  componentName: string
  reason: string
  metric: string
}

// Navigation Types
export interface NavCategory {
  id: ComponentCategory
  name: string
  icon: string
  count: number
}

// Filter Types
export interface FilterState {
  search: string
  platforms: Platform[]
  categories: ComponentCategory[]
  statuses: ComponentStatus[]
}
