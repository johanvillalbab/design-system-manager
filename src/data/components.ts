import type { DesignComponent, ComponentDetail } from '@/types'

export const mockComponents: DesignComponent[] = [
  {
    id: 'btn-001',
    name: 'Button',
    description: 'Primary interactive element for user actions',
    category: 'components',
    version: '3.2.1',
    status: 'stable',
    platforms: ['ios', 'android', 'web'],
    lastUpdated: '2026-01-15',
    usageCount: 1842,
    needsUpdate: false,
    tags: ['interactive', 'action', 'core']
  },
  {
    id: 'inp-001',
    name: 'Input Field',
    description: 'Text input with validation states',
    category: 'components',
    version: '2.8.0',
    status: 'stable',
    platforms: ['ios', 'android', 'web'],
    lastUpdated: '2026-01-10',
    usageCount: 1256,
    needsUpdate: false,
    tags: ['form', 'input', 'text']
  },
  {
    id: 'card-001',
    name: 'Card',
    description: 'Container for grouped content',
    category: 'components',
    version: '2.1.0',
    status: 'stable',
    platforms: ['ios', 'android', 'web'],
    lastUpdated: '2025-12-20',
    usageCount: 987,
    needsUpdate: true,
    tags: ['container', 'layout']
  },
  {
    id: 'modal-001',
    name: 'Modal',
    description: 'Overlay dialog for focused interactions',
    category: 'components',
    version: '1.5.2',
    status: 'beta',
    platforms: ['web'],
    lastUpdated: '2026-01-18',
    usageCount: 432,
    needsUpdate: false,
    tags: ['overlay', 'dialog', 'focus']
  },
  {
    id: 'nav-001',
    name: 'Navigation Bar',
    description: 'Primary navigation component',
    category: 'patterns',
    version: '2.0.0',
    status: 'stable',
    platforms: ['ios', 'android', 'web'],
    lastUpdated: '2025-11-30',
    usageCount: 756,
    needsUpdate: true,
    tags: ['navigation', 'header']
  },
  {
    id: 'tab-001',
    name: 'Tabs',
    description: 'Tabbed navigation for content sections',
    category: 'components',
    version: '1.2.0',
    status: 'stable',
    platforms: ['ios', 'android', 'web'],
    lastUpdated: '2025-12-05',
    usageCount: 621,
    needsUpdate: false,
    tags: ['navigation', 'tabs']
  },
  {
    id: 'avatar-001',
    name: 'Avatar',
    description: 'User profile image or placeholder',
    category: 'components',
    version: '1.0.3',
    status: 'stable',
    platforms: ['ios', 'android', 'web'],
    lastUpdated: '2025-10-15',
    usageCount: 534,
    needsUpdate: false,
    tags: ['user', 'image', 'profile']
  },
  {
    id: 'badge-001',
    name: 'Badge',
    description: 'Small status indicator',
    category: 'components',
    version: '1.1.0',
    status: 'stable',
    platforms: ['ios', 'android', 'web'],
    lastUpdated: '2025-11-20',
    usageCount: 892,
    needsUpdate: false,
    tags: ['status', 'indicator']
  },
  {
    id: 'toast-001',
    name: 'Toast',
    description: 'Temporary notification messages',
    category: 'components',
    version: '0.9.0',
    status: 'beta',
    platforms: ['web'],
    lastUpdated: '2026-01-05',
    usageCount: 287,
    needsUpdate: false,
    tags: ['notification', 'feedback']
  },
  {
    id: 'dropdown-001',
    name: 'Dropdown',
    description: 'Selectable options menu',
    category: 'components',
    version: '1.0.0',
    status: 'deprecated',
    platforms: ['web'],
    lastUpdated: '2024-08-10',
    usageCount: 12,
    needsUpdate: false,
    tags: ['select', 'menu', 'options']
  },
  {
    id: 'color-001',
    name: 'Color Tokens',
    description: 'Brand and semantic color palette',
    category: 'foundations',
    version: '4.0.0',
    status: 'stable',
    platforms: ['ios', 'android', 'web'],
    lastUpdated: '2026-01-01',
    usageCount: 2456,
    needsUpdate: false,
    tags: ['color', 'tokens', 'brand']
  },
  {
    id: 'typo-001',
    name: 'Typography',
    description: 'Font scales and text styles',
    category: 'foundations',
    version: '3.1.0',
    status: 'stable',
    platforms: ['ios', 'android', 'web'],
    lastUpdated: '2025-12-15',
    usageCount: 2134,
    needsUpdate: false,
    tags: ['font', 'text', 'scale']
  },
  {
    id: 'spacing-001',
    name: 'Spacing System',
    description: '8px grid-based spacing tokens',
    category: 'foundations',
    version: '2.0.0',
    status: 'stable',
    platforms: ['ios', 'android', 'web'],
    lastUpdated: '2025-10-01',
    usageCount: 1987,
    needsUpdate: false,
    tags: ['spacing', 'grid', 'layout']
  },
  {
    id: 'icon-001',
    name: 'Icon Library',
    description: '500+ consistent iconography',
    category: 'foundations',
    version: '5.2.0',
    status: 'stable',
    platforms: ['ios', 'android', 'web'],
    lastUpdated: '2026-01-12',
    usageCount: 3421,
    needsUpdate: false,
    tags: ['icons', 'symbols']
  },
  {
    id: 'form-001',
    name: 'Form Pattern',
    description: 'Complete form layout with validation',
    category: 'patterns',
    version: '2.3.0',
    status: 'stable',
    platforms: ['ios', 'android', 'web'],
    lastUpdated: '2025-12-28',
    usageCount: 445,
    needsUpdate: false,
    tags: ['form', 'validation', 'layout']
  },
  {
    id: 'search-001',
    name: 'Search Pattern',
    description: 'Search input with filters and results',
    category: 'patterns',
    version: '1.8.0',
    status: 'stable',
    platforms: ['web'],
    lastUpdated: '2025-11-15',
    usageCount: 312,
    needsUpdate: true,
    tags: ['search', 'filter', 'results']
  },
  {
    id: 'empty-001',
    name: 'Empty States',
    description: 'Placeholder content for empty views',
    category: 'patterns',
    version: '1.2.0',
    status: 'stable',
    platforms: ['ios', 'android', 'web'],
    lastUpdated: '2025-09-20',
    usageCount: 234,
    needsUpdate: false,
    tags: ['empty', 'placeholder', 'state']
  },
  {
    id: 'dash-001',
    name: 'Dashboard Template',
    description: 'Analytics dashboard layout',
    category: 'templates',
    version: '1.0.0',
    status: 'beta',
    platforms: ['web'],
    lastUpdated: '2026-01-20',
    usageCount: 45,
    needsUpdate: false,
    tags: ['dashboard', 'analytics', 'layout']
  },
  {
    id: 'profile-001',
    name: 'Profile Template',
    description: 'User profile page layout',
    category: 'templates',
    version: '1.1.0',
    status: 'stable',
    platforms: ['ios', 'android', 'web'],
    lastUpdated: '2025-11-10',
    usageCount: 89,
    needsUpdate: false,
    tags: ['profile', 'user', 'settings']
  },
  {
    id: 'select-001',
    name: 'Select',
    description: 'Modern dropdown replacement',
    category: 'components',
    version: '2.0.0',
    status: 'stable',
    platforms: ['ios', 'android', 'web'],
    lastUpdated: '2026-01-08',
    usageCount: 567,
    needsUpdate: false,
    tags: ['select', 'dropdown', 'form']
  }
]

export const mockComponentDetail: ComponentDetail = {
  id: 'btn-001',
  name: 'Button',
  description: 'Primary interactive element for user actions. Supports multiple variants, sizes, and states for comprehensive UI coverage.',
  category: 'components',
  version: '3.2.1',
  status: 'stable',
  platforms: ['ios', 'android', 'web'],
  lastUpdated: '2026-01-15',
  usageCount: 1842,
  needsUpdate: false,
  tags: ['interactive', 'action', 'core'],
  variants: [
    { id: 'default', name: 'Default', description: 'Standard button state' },
    { id: 'hover', name: 'Hover', description: 'Mouse over state' },
    { id: 'active', name: 'Active', description: 'Pressed/clicked state' },
    { id: 'disabled', name: 'Disabled', description: 'Non-interactive state' },
    { id: 'loading', name: 'Loading', description: 'Processing state with spinner' }
  ],
  props: [
    { name: 'variant', type: "'primary' | 'secondary' | 'ghost' | 'danger'", default: "'primary'", required: false, description: 'Visual style of the button' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", required: false, description: 'Button size' },
    { name: 'disabled', type: 'boolean', default: 'false', required: false, description: 'Disables button interaction' },
    { name: 'loading', type: 'boolean', default: 'false', required: false, description: 'Shows loading spinner' },
    { name: 'icon', type: 'IconName', required: false, description: 'Optional leading icon' },
    { name: 'iconPosition', type: "'left' | 'right'", default: "'left'", required: false, description: 'Icon placement' },
    { name: 'fullWidth', type: 'boolean', default: 'false', required: false, description: 'Expands to container width' },
    { name: 'onClick', type: '() => void', required: true, description: 'Click handler function' }
  ],
  versions: [
    { version: '3.2.1', date: '2026-01-15', changes: ['Fixed focus ring visibility', 'Improved touch target size'], author: 'Sarah Chen' },
    { version: '3.2.0', date: '2025-12-20', changes: ['Added loading state', 'New ghost variant'], author: 'Marcus Johnson' },
    { version: '3.1.0', date: '2025-11-05', changes: ['Icon support added', 'RTL improvements'], author: 'Sarah Chen' },
    { version: '3.0.0', date: '2025-09-01', changes: ['Breaking: New API structure', 'Accessibility overhaul'], author: 'Design Team' }
  ],
  comments: [
    {
      id: 'c1',
      author: { name: 'Alex Rivera', avatar: 'https://i.pravatar.cc/40?img=1' },
      content: 'The new loading state is great! Can we add a progress variant for file uploads?',
      date: '2026-01-16',
      replies: [
        {
          id: 'c1r1',
          author: { name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/40?img=2' },
          content: "Good idea! I'll add it to the backlog for v3.3.0",
          date: '2026-01-17'
        }
      ]
    },
    {
      id: 'c2',
      author: { name: 'Jordan Kim', avatar: 'https://i.pravatar.cc/40?img=3' },
      content: 'Touch targets are much better now. WCAG compliance confirmed.',
      date: '2026-01-15'
    }
  ],
  usage: {
    doList: [
      'Use for primary actions like "Submit", "Save", "Continue"',
      'Provide clear, action-oriented labels',
      'Use loading state during async operations',
      'Maintain consistent sizing within a section',
      'Use icon + text for improved scannability'
    ],
    dontList: [
      "Don't use for navigation (use Link instead)",
      "Don't disable without explaining why",
      "Don't use more than one primary button per section",
      "Don't make buttons look like links",
      "Don't use vague labels like 'Click here'"
    ]
  },
  accessibility: {
    wcagLevel: 'AA',
    keyboardNav: [
      'Enter or Space activates the button',
      'Tab moves focus to/from the button',
      'Disabled buttons are not focusable'
    ],
    screenReader: [
      'Announces button label and role',
      'Loading state announces "Loading, please wait"',
      'Disabled state announces "disabled"'
    ]
  },
  codeSnippets: [
    {
      platform: 'web',
      language: 'tsx',
      code: `import { Button } from '@ds/components'

<Button 
  variant="primary"
  size="md"
  onClick={() => handleSubmit()}
>
  Submit Form
</Button>

<Button 
  variant="secondary"
  icon="download"
  loading={isDownloading}
>
  Download Report
</Button>`
    },
    {
      platform: 'ios',
      language: 'swift',
      code: `import DesignSystem

DSButton(
  title: "Submit Form",
  variant: .primary,
  size: .medium
) {
  handleSubmit()
}

DSButton(
  title: "Download Report",
  variant: .secondary,
  icon: .download,
  isLoading: isDownloading
)`
    },
    {
      platform: 'android',
      language: 'kotlin',
      code: `import com.company.designsystem.components.DSButton

DSButton(
  text = "Submit Form",
  variant = ButtonVariant.Primary,
  size = ButtonSize.Medium,
  onClick = { handleSubmit() }
)

DSButton(
  text = "Download Report",
  variant = ButtonVariant.Secondary,
  icon = DSIcon.Download,
  isLoading = isDownloading
)`
    }
  ]
}

export function getComponentById(id: string): ComponentDetail | undefined {
  const basic = mockComponents.find(c => c.id === id)
  if (!basic) return undefined
  
  // For demo purposes, return the detailed button for any component
  return {
    ...mockComponentDetail,
    ...basic
  }
}
