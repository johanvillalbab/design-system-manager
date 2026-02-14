import type { AuditIssue, AuditProject } from '@/types'

export const mockAuditIssues: AuditIssue[] = [
  {
    id: 'iss-001',
    severity: 'critical',
    type: 'Unlinked Component',
    title: 'Button not linked to library',
    description: 'A custom button implementation was found using hardcoded styles instead of the Button component from the design system library. The element has different border-radius and padding than the standard.',
    location: {
      file: 'Jira Board Redesign.fig',
      page: 'Issue Detail',
      frame: 'Action Bar'
    },
    suggestion: 'Replace with Button component (appearance="primary") from the DS Library v3.2.1',
    autoFixable: true,
    screenshot: 'https://placehold.co/400x200/f4f2ec/6b4ec0?text=Unlinked+Button'
  },
  {
    id: 'iss-002',
    severity: 'critical',
    type: 'Unlinked Component',
    title: 'Textfield detached from library',
    description: 'The login form uses a locally styled text input that was detached from the Textfield component. It lacks the standard focus ring and validation states.',
    location: {
      file: 'Confluence Spaces.fig',
      page: 'Authentication',
      frame: 'Login Form'
    },
    suggestion: 'Relink to Textfield component v2.9.0 with isRequired and label props',
    autoFixable: true,
    screenshot: 'https://placehold.co/400x200/f4f2ec/6b4ec0?text=Detached+Textfield'
  },
  {
    id: 'iss-003',
    severity: 'critical',
    type: 'Unlinked Component',
    title: 'Select using custom dropdown',
    description: 'A hand-built dropdown menu is being used instead of the Select component. Missing keyboard navigation and screen reader support.',
    location: {
      file: 'Bitbucket PR Review.fig',
      page: 'Repository Settings',
      frame: 'Branch Permissions'
    },
    suggestion: 'Replace with Select component v2.3.0 with isSearchable and isClearable props',
    autoFixable: true,
    screenshot: 'https://placehold.co/400x200/f4f2ec/6b4ec0?text=Custom+Dropdown'
  },
  {
    id: 'iss-004',
    severity: 'high',
    type: 'Style Override',
    title: 'Non-token color in primary action',
    description: 'Using #2684FF (custom blue) instead of the brand.bold token for the primary CTA button background. This breaks theming consistency.',
    location: {
      file: 'Trello Board.fig',
      page: 'Board View',
      frame: 'Create Card Modal'
    },
    suggestion: 'Replace with color.background.brand.bold token',
    autoFixable: true,
    screenshot: 'https://placehold.co/400x200/f4f2ec/4a6fa5?text=Color+Override'
  },
  {
    id: 'iss-005',
    severity: 'high',
    type: 'Style Override',
    title: 'Typography off-scale at 15px',
    description: 'Body text using 15px font-size which does not exist in the typography scale. Closest tokens are 14px (body small) and 16px (body medium).',
    location: {
      file: 'Jira Board Redesign.fig',
      page: 'Settings',
      frame: 'Notification Preferences'
    },
    suggestion: 'Use font.body or font.body.small from the typography scale',
    autoFixable: false,
    screenshot: 'https://placehold.co/400x200/f4f2ec/6e6e8a?text=15px+Typography'
  },
  {
    id: 'iss-006',
    severity: 'high',
    type: 'Deprecated Component',
    title: 'Dropdown Menu still in use',
    description: 'The deprecated Dropdown Menu component (v1.0.0) is being used. It has been replaced by the Popup + Menu composition pattern since v2.0.0.',
    location: {
      file: 'Confluence Spaces.fig',
      page: 'Space Settings',
      frame: 'User Permissions Table'
    },
    suggestion: 'Migrate to Popup + Menu pattern per the migration guide',
    autoFixable: false,
    screenshot: 'https://placehold.co/400x200/f4f2ec/bf2a40?text=Deprecated+Dropdown'
  },
  {
    id: 'iss-007',
    severity: 'high',
    type: 'Style Override',
    title: 'Border radius mismatch on Avatar',
    description: 'Avatar using 6px border-radius instead of the standard circle (50%) or square (3px) defined in the Avatar component spec.',
    location: {
      file: 'Trello Board.fig',
      page: 'Member Directory',
      frame: 'Team Cards'
    },
    suggestion: 'Use Avatar component with appearance="circle" for users',
    autoFixable: true,
    screenshot: 'https://placehold.co/400x200/f4f2ec/a07c0c?text=Avatar+Radius'
  },
  {
    id: 'iss-008',
    severity: 'medium',
    type: 'Spacing Issue',
    title: 'Non-standard 18px gap in form layout',
    description: 'Form fields use 18px vertical gap between items. The spacing scale defines 16px (space.200) and 24px (space.300) as the closest options.',
    location: {
      file: 'Bitbucket PR Review.fig',
      page: 'Create Repository',
      frame: 'Repository Details Form'
    },
    suggestion: 'Use space.200 (16px) for compact forms or space.300 (24px) for relaxed forms',
    autoFixable: true,
    screenshot: 'https://placehold.co/400x200/f4f2ec/6e6e8a?text=18px+Gap'
  },
  {
    id: 'iss-009',
    severity: 'medium',
    type: 'Naming Convention',
    title: 'Layer named "btn_cta" instead of convention',
    description: 'Layer uses non-standard naming "btn_cta" instead of the convention "Button/Primary" with slash-separated component/variant format.',
    location: {
      file: 'Jira Board Redesign.fig',
      page: 'Sprint Board',
      frame: 'Column Header'
    },
    suggestion: 'Rename to "Button/Primary" following Component/Variant convention',
    autoFixable: true,
    screenshot: 'https://placehold.co/400x200/f4f2ec/6e6e8a?text=Layer+Naming'
  },
  {
    id: 'iss-010',
    severity: 'medium',
    type: 'Naming Convention',
    title: 'Auto-layout frame with default name',
    description: 'Frame named "Frame 1247" containing a group of Lozenge status indicators. Unnamed frames reduce design file maintainability.',
    location: {
      file: 'Confluence Spaces.fig',
      page: 'Page List',
      frame: 'Status Filters'
    },
    suggestion: 'Rename to "StatusFilter/Container" following semantic naming',
    autoFixable: false,
    screenshot: 'https://placehold.co/400x200/f4f2ec/6e6e8a?text=Unnamed+Frame'
  }
]

export const mockProjects: AuditProject[] = [
  {
    id: 'proj-001',
    name: 'Jira Board Redesign',
    coverage: 87,
    issues: 3,
    lastAudit: '2026-02-05'
  },
  {
    id: 'proj-002',
    name: 'Confluence Spaces',
    coverage: 72,
    issues: 3,
    lastAudit: '2026-02-03'
  },
  {
    id: 'proj-003',
    name: 'Trello Board',
    coverage: 91,
    issues: 2,
    lastAudit: '2026-02-01'
  },
  {
    id: 'proj-004',
    name: 'Bitbucket PR Review',
    coverage: 78,
    issues: 2,
    lastAudit: '2026-01-28'
  },
  {
    id: 'proj-005',
    name: 'Statuspage Dashboard',
    coverage: 95,
    issues: 0,
    lastAudit: '2026-01-25'
  }
]

export const auditStats = {
  totalIssues: mockAuditIssues.length,
  critical: mockAuditIssues.filter(i => i.severity === 'critical').length,
  high: mockAuditIssues.filter(i => i.severity === 'high').length,
  medium: mockAuditIssues.filter(i => i.severity === 'medium').length,
  autoFixable: mockAuditIssues.filter(i => i.autoFixable).length,
  avgCoverage: Math.round(mockProjects.reduce((acc, p) => acc + p.coverage, 0) / mockProjects.length)
}
