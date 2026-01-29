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
  author: {
    name: string
    avatar: string
  }
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

// Issue Types (v2.5)
export type IssueType = 'bug' | 'enhancement' | 'documentation' | 'question'
export type IssueStatus = 'open' | 'in_progress' | 'resolved' | 'closed'
export type IssuePriority = 'low' | 'medium' | 'high' | 'critical'

export interface Issue {
  id: string
  title: string
  description: string
  type: IssueType
  status: IssueStatus
  priority: IssuePriority
  componentId?: string
  labels: string[]
  assignee?: { name: string; avatar: string }
  author: { name: string; avatar: string }
  createdAt: string
  updatedAt: string
  comments: IssueComment[]
}

export interface IssueComment {
  id: string
  author: { name: string; avatar: string }
  content: string
  createdAt: string
}

// Contribution Types (v2.5)
export type ContributionStatus = 'draft' | 'pending_review' | 'approved' | 'rejected' | 'merged'

export interface Branch {
  id: string
  name: string
  componentId: string
  basedOn: string
  author: { name: string; avatar: string }
  createdAt: string
  isDefault: boolean
}

export interface Contribution {
  id: string
  title: string
  description: string
  branchId: string
  componentId: string
  status: ContributionStatus
  author: { name: string; avatar: string }
  changes: ComponentChange[]
  reviews: Review[]
  createdAt: string
  updatedAt: string
}

export interface ComponentChange {
  field: 'props' | 'variants' | 'code' | 'docs' | 'styles'
  before: string
  after: string
  description: string
}

export interface Review {
  id: string
  author: { name: string; avatar: string }
  status: 'approved' | 'changes_requested' | 'commented'
  comment: string
  createdAt: string
}

// Lifecycle Types (v2.5)
export type LifecycleStageType = 'design' | 'review' | 'development' | 'testing' | 'release'
export type LifecycleStageStatus = 'pending' | 'in_progress' | 'completed' | 'blocked'

export interface ComponentLifecycle {
  componentId: string
  stages: LifecycleStage[]
}

export interface LifecycleStage {
  id: string
  type: LifecycleStageType
  status: LifecycleStageStatus
  assignee?: { name: string; avatar: string }
  startedAt?: string
  completedAt?: string
  artifacts: Artifact[]
  notes: string
}

export interface Artifact {
  type: 'figma' | 'sketch' | 'code' | 'storybook' | 'test'
  url: string
  label: string
}

// Documentation Types (v2.5)
export type DocSectionType = 'overview' | 'usage' | 'api' | 'accessibility' | 'examples'

export interface DocSection {
  id: string
  componentId: string
  type: DocSectionType
  content: string
  aiMetadata: AIMetadata
  lastUpdated: string
}

export interface AIMetadata {
  summary: string
  keywords: string[]
  useCases: string[]
  relatedComponents: string[]
  codePatterns: string[]
  constraints: string[]
}

// Team & Health Metrics (v2.5)
export interface TeamAdoption {
  teamId: string
  teamName: string
  coverage: number
  componentsUsed: string[]
  lastActivity: string
}

export interface ComponentHealth {
  componentId: string
  componentName: string
  bugCount: number
  openIssues: number
  contributionsPending: number
  lastUpdate: string
  adoptionTrend: number
}
