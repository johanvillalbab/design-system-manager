import type { AuditIssue, AuditProject } from '@/types'

export const mockAuditIssues: AuditIssue[] = [
  {
    id: 'iss-001',
    severity: 'critical',
    type: 'Unlinked Component',
    title: 'Button not linked to library',
    description: 'Custom button implementation found instead of design system component',
    location: {
      file: 'Mobile App v2.fig',
      page: 'Home Screen',
      frame: 'CTA Section'
    },
    suggestion: 'Replace with Button component from DS Library',
    autoFixable: true,
    screenshot: 'https://placehold.co/400x200/f4f2ec/6b4ec0?text=Button+Issue'
  },
  {
    id: 'iss-002',
    severity: 'critical',
    type: 'Unlinked Component',
    title: 'Card using local styles',
    description: 'Card component detached from main library',
    location: {
      file: 'Dashboard Redesign.fig',
      page: 'Analytics',
      frame: 'Stats Cards'
    },
    suggestion: 'Relink to Card component v2.1.0',
    autoFixable: true,
    screenshot: 'https://placehold.co/400x200/f4f2ec/a07c0c?text=Card+Issue'
  },
  {
    id: 'iss-003',
    severity: 'high',
    type: 'Style Override',
    title: 'Non-standard color used',
    description: 'Using #3B82F6 instead of Primary-500 token',
    location: {
      file: 'Marketing Site.fig',
      page: 'Landing Page',
      frame: 'Hero Section'
    },
    suggestion: 'Replace with --color-primary-500 token',
    autoFixable: true,
    screenshot: 'https://placehold.co/400x200/f4f2ec/4a6fa5?text=Color+Override'
  },
  {
    id: 'iss-004',
    severity: 'high',
    type: 'Style Override',
    title: 'Typography mismatch',
    description: 'Using 15px font size not in type scale',
    location: {
      file: 'Mobile App v2.fig',
      page: 'Settings',
      frame: 'Account Info'
    },
    suggestion: 'Use text-sm (14px) or text-base (16px)',
    autoFixable: false,
    screenshot: 'https://placehold.co/400x200/f4f2ec/6e6e8a?text=Typography+Issue'
  },
  {
    id: 'iss-005',
    severity: 'high',
    type: 'Deprecated Component',
    title: 'Using deprecated Dropdown',
    description: 'Dropdown v1.0.0 is deprecated, use Select instead',
    location: {
      file: 'Admin Panel.fig',
      page: 'User Management',
      frame: 'Filter Section'
    },
    suggestion: 'Replace with Select component v2.0.0',
    autoFixable: false,
    screenshot: 'https://placehold.co/400x200/f4f2ec/bf2a40?text=Deprecated+Dropdown'
  },
  {
    id: 'iss-006',
    severity: 'medium',
    type: 'Naming Convention',
    title: 'Inconsistent layer naming',
    description: 'Layer named "btn" instead of "Button/Primary"',
    location: {
      file: 'Mobile App v2.fig',
      page: 'Checkout',
      frame: 'Payment Form'
    },
    suggestion: 'Rename to follow naming convention: Component/Variant',
    autoFixable: true,
    screenshot: 'https://placehold.co/400x200/f4f2ec/6e6e8a?text=Naming+Issue'
  },
  {
    id: 'iss-007',
    severity: 'medium',
    type: 'Naming Convention',
    title: 'Unnamed auto-layout frame',
    description: 'Frame using default name "Frame 847"',
    location: {
      file: 'Dashboard Redesign.fig',
      page: 'Reports',
      frame: 'Chart Container'
    },
    suggestion: 'Provide semantic name like "ReportChart/Container"',
    autoFixable: false,
    screenshot: 'https://placehold.co/400x200/f4f2ec/6e6e8a?text=Frame+Naming'
  },
  {
    id: 'iss-008',
    severity: 'medium',
    type: 'Spacing Issue',
    title: 'Non-standard spacing value',
    description: 'Using 18px gap instead of spacing token',
    location: {
      file: 'Marketing Site.fig',
      page: 'Features',
      frame: 'Feature Grid'
    },
    suggestion: 'Use spacing-4 (16px) or spacing-5 (20px)',
    autoFixable: true,
    screenshot: 'https://placehold.co/400x200/f4f2ec/6e6e8a?text=Spacing+Issue'
  },
  {
    id: 'iss-009',
    severity: 'critical',
    type: 'Unlinked Component',
    title: 'Input field not from library',
    description: 'Custom text input with different styling',
    location: {
      file: 'Admin Panel.fig',
      page: 'Login',
      frame: 'Login Form'
    },
    suggestion: 'Replace with Input Field component v2.8.0',
    autoFixable: true,
    screenshot: 'https://placehold.co/400x200/f4f2ec/6b4ec0?text=Input+Issue'
  },
  {
    id: 'iss-010',
    severity: 'high',
    type: 'Style Override',
    title: 'Border radius override',
    description: 'Using 6px radius instead of radius-md token (8px)',
    location: {
      file: 'Mobile App v2.fig',
      page: 'Profile',
      frame: 'Avatar Card'
    },
    suggestion: 'Use --radius-md (8px) token',
    autoFixable: true,
    screenshot: 'https://placehold.co/400x200/f4f2ec/a07c0c?text=Radius+Override'
  }
]

export const mockProjects: AuditProject[] = [
  {
    id: 'proj-001',
    name: 'Mobile App v2',
    coverage: 87,
    issues: 4,
    lastAudit: '2026-01-22'
  },
  {
    id: 'proj-002',
    name: 'Dashboard Redesign',
    coverage: 72,
    issues: 3,
    lastAudit: '2026-01-21'
  },
  {
    id: 'proj-003',
    name: 'Marketing Site',
    coverage: 94,
    issues: 2,
    lastAudit: '2026-01-20'
  },
  {
    id: 'proj-004',
    name: 'Admin Panel',
    coverage: 65,
    issues: 3,
    lastAudit: '2026-01-19'
  },
  {
    id: 'proj-005',
    name: 'E-commerce Flow',
    coverage: 91,
    issues: 1,
    lastAudit: '2026-01-18'
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
