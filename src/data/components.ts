import type { DesignComponent, ComponentDetail } from '@/types'

export const mockComponents: DesignComponent[] = [
  // ── Foundations ──
  {
    id: 'token-001',
    name: 'Design Tokens',
    description: 'Design tokens are the single source of truth to name and store design decisions for color, spacing, typography, and elevation.',
    category: 'foundations',
    version: '4.2.0',
    status: 'stable',
    platforms: ['ios', 'android', 'web'],
    lastUpdated: '2026-01-28',
    usageCount: 3842,
    needsUpdate: false,
    tags: ['tokens', 'variables', 'theming', 'color', 'spacing']
  },
  {
    id: 'typo-001',
    name: 'Typography',
    description: 'A system of fonts and text styles that provides hierarchy and readability across all products and platforms.',
    category: 'foundations',
    version: '3.4.0',
    status: 'stable',
    platforms: ['ios', 'android', 'web'],
    lastUpdated: '2026-01-10',
    usageCount: 2890,
    needsUpdate: false,
    tags: ['font', 'text', 'heading', 'body', 'scale']
  },
  {
    id: 'spacing-001',
    name: 'Spacing',
    description: 'A spacing scale based on an 8px grid that simplifies the creation of page layouts and maintains visual consistency.',
    category: 'foundations',
    version: '2.1.0',
    status: 'stable',
    platforms: ['ios', 'android', 'web'],
    lastUpdated: '2025-11-15',
    usageCount: 2456,
    needsUpdate: false,
    tags: ['spacing', 'grid', 'layout', 'padding', 'margin']
  },
  {
    id: 'icon-001',
    name: 'Iconography',
    description: 'A comprehensive icon library with 600+ glyphs designed for clarity at small sizes. Supports multiple sizes and color tokens.',
    category: 'foundations',
    version: '5.8.0',
    status: 'stable',
    platforms: ['ios', 'android', 'web'],
    lastUpdated: '2026-02-01',
    usageCount: 4210,
    needsUpdate: false,
    tags: ['icons', 'glyphs', 'symbols', 'svg']
  },

  // ── Components ──
  {
    id: 'btn-001',
    name: 'Button',
    description: 'A button triggers an event or action. They let users know what will happen next and guide them through a workflow.',
    category: 'components',
    version: '3.2.1',
    status: 'stable',
    platforms: ['ios', 'android', 'web'],
    lastUpdated: '2026-01-20',
    usageCount: 2145,
    needsUpdate: false,
    tags: ['button', 'action', 'cta', 'submit', 'interactive']
  },
  {
    id: 'textfield-001',
    name: 'Textfield',
    description: 'A text field is an input that allows a user to write or edit text. It supports labels, helper text, and validation states.',
    category: 'components',
    version: '2.9.0',
    status: 'stable',
    platforms: ['ios', 'android', 'web'],
    lastUpdated: '2026-01-12',
    usageCount: 1654,
    needsUpdate: false,
    tags: ['input', 'text', 'form', 'field', 'validation']
  },
  {
    id: 'select-001',
    name: 'Select',
    description: 'Select allows users to make a single selection or multiple selections from a list of options.',
    category: 'components',
    version: '2.3.0',
    status: 'stable',
    platforms: ['ios', 'android', 'web'],
    lastUpdated: '2026-01-08',
    usageCount: 987,
    needsUpdate: false,
    tags: ['select', 'dropdown', 'form', 'options', 'picker']
  },
  {
    id: 'checkbox-001',
    name: 'Checkbox',
    description: 'A checkbox allows a user to select one or more options from a set. Supports indeterminate state for partial selections.',
    category: 'components',
    version: '1.8.0',
    status: 'stable',
    platforms: ['ios', 'android', 'web'],
    lastUpdated: '2025-12-18',
    usageCount: 876,
    needsUpdate: false,
    tags: ['checkbox', 'form', 'selection', 'toggle', 'input']
  },
  {
    id: 'toggle-001',
    name: 'Toggle',
    description: 'A toggle is used to view or switch between enabled or disabled states. It should be used for binary settings that take effect immediately.',
    category: 'components',
    version: '1.5.0',
    status: 'stable',
    platforms: ['ios', 'android', 'web'],
    lastUpdated: '2025-11-28',
    usageCount: 623,
    needsUpdate: false,
    tags: ['toggle', 'switch', 'boolean', 'settings', 'on-off']
  },
  {
    id: 'avatar-001',
    name: 'Avatar',
    description: 'An avatar is a visual representation of a user or entity. Supports images, initials fallback, and presence indicators.',
    category: 'components',
    version: '2.1.0',
    status: 'stable',
    platforms: ['ios', 'android', 'web'],
    lastUpdated: '2025-12-05',
    usageCount: 1432,
    needsUpdate: false,
    tags: ['avatar', 'user', 'image', 'profile', 'presence']
  },
  {
    id: 'badge-001',
    name: 'Badge',
    description: 'A badge is a visual indicator for numeric values such as tallies and scores. Use it to display counts that need attention.',
    category: 'components',
    version: '1.3.0',
    status: 'stable',
    platforms: ['ios', 'android', 'web'],
    lastUpdated: '2025-11-20',
    usageCount: 1087,
    needsUpdate: false,
    tags: ['badge', 'count', 'indicator', 'notification']
  },
  {
    id: 'lozenge-001',
    name: 'Lozenge',
    description: 'A lozenge is a visual indicator used to highlight an item\'s status for quick recognition. Comes in subtle and bold appearances.',
    category: 'components',
    version: '1.6.0',
    status: 'stable',
    platforms: ['ios', 'android', 'web'],
    lastUpdated: '2025-12-12',
    usageCount: 945,
    needsUpdate: true,
    tags: ['lozenge', 'status', 'label', 'tag', 'pill']
  },
  {
    id: 'modal-001',
    name: 'Modal Dialog',
    description: 'A modal dialog displays content that requires user interaction in a layer above the page. It blocks interaction with the page until dismissed.',
    category: 'components',
    version: '2.0.0',
    status: 'stable',
    platforms: ['ios', 'android', 'web'],
    lastUpdated: '2026-01-25',
    usageCount: 534,
    needsUpdate: false,
    tags: ['modal', 'dialog', 'overlay', 'popup', 'confirmation']
  },
  {
    id: 'tooltip-001',
    name: 'Tooltip',
    description: 'A tooltip is a floating, non-actionable label used to explain a user interface element or feature on hover or focus.',
    category: 'components',
    version: '1.4.0',
    status: 'stable',
    platforms: ['web'],
    lastUpdated: '2025-10-30',
    usageCount: 756,
    needsUpdate: true,
    tags: ['tooltip', 'hover', 'popover', 'hint', 'info']
  },
  {
    id: 'banner-001',
    name: 'Banner',
    description: 'A banner displays a prominent message at the top of the screen. Use banners to inform users about important changes or persistent conditions.',
    category: 'components',
    version: '1.2.0',
    status: 'beta',
    platforms: ['web'],
    lastUpdated: '2026-02-03',
    usageCount: 312,
    needsUpdate: false,
    tags: ['banner', 'alert', 'message', 'notification', 'announcement']
  },
  {
    id: 'tabs-001',
    name: 'Tabs',
    description: 'Tabs are used to organize content by grouping similar information on the same page. They help reduce cognitive load by letting users switch between views.',
    category: 'components',
    version: '2.0.0',
    status: 'stable',
    platforms: ['ios', 'android', 'web'],
    lastUpdated: '2025-12-22',
    usageCount: 823,
    needsUpdate: false,
    tags: ['tabs', 'navigation', 'content', 'panels', 'sections']
  },
  {
    id: 'progress-001',
    name: 'Progress Bar',
    description: 'A progress bar communicates the status of a system process. It visually indicates how much of a task has been completed.',
    category: 'components',
    version: '1.1.0',
    status: 'stable',
    platforms: ['ios', 'android', 'web'],
    lastUpdated: '2025-10-18',
    usageCount: 389,
    needsUpdate: false,
    tags: ['progress', 'loading', 'status', 'bar', 'indicator']
  },
  {
    id: 'dropdown-001',
    name: 'Dropdown Menu',
    description: 'A dropdown menu displays a list of actions or options to a user. Deprecated in favor of the new Popup + Menu composition.',
    category: 'components',
    version: '1.0.0',
    status: 'deprecated',
    platforms: ['web'],
    lastUpdated: '2024-09-15',
    usageCount: 28,
    needsUpdate: false,
    tags: ['dropdown', 'menu', 'actions', 'deprecated']
  },

  // ── Patterns ──
  {
    id: 'form-001',
    name: 'Form Pattern',
    description: 'A standard form layout that combines text fields, selects, checkboxes, and buttons with built-in validation, error handling, and accessibility.',
    category: 'patterns',
    version: '2.5.0',
    status: 'stable',
    platforms: ['ios', 'android', 'web'],
    lastUpdated: '2026-01-18',
    usageCount: 567,
    needsUpdate: false,
    tags: ['form', 'validation', 'layout', 'input', 'submit']
  },
  {
    id: 'nav-001',
    name: 'Navigation Pattern',
    description: 'Defines the primary and secondary navigation structure for applications including top bar, side navigation, and breadcrumbs.',
    category: 'patterns',
    version: '2.2.0',
    status: 'stable',
    platforms: ['ios', 'android', 'web'],
    lastUpdated: '2025-12-30',
    usageCount: 445,
    needsUpdate: true,
    tags: ['navigation', 'sidebar', 'breadcrumbs', 'routing', 'menu']
  },
  {
    id: 'empty-001',
    name: 'Empty State',
    description: 'An empty state appears when there is no data to display and describes what the user can do next. Includes illustration, title, description, and action.',
    category: 'patterns',
    version: '1.4.0',
    status: 'stable',
    platforms: ['ios', 'android', 'web'],
    lastUpdated: '2025-11-05',
    usageCount: 278,
    needsUpdate: false,
    tags: ['empty', 'placeholder', 'zero-state', 'onboarding']
  },
  {
    id: 'inline-edit-001',
    name: 'Inline Edit',
    description: 'An inline edit displays a custom input component that switches between reading and editing modes on the same page without navigating away.',
    category: 'patterns',
    version: '1.7.0',
    status: 'beta',
    platforms: ['web'],
    lastUpdated: '2026-01-30',
    usageCount: 189,
    needsUpdate: false,
    tags: ['inline-edit', 'editable', 'in-place', 'toggle-edit']
  },

  // ── Templates ──
  {
    id: 'page-layout-001',
    name: 'Page Layout',
    description: 'A collection of components that define the overall page structure including header, sidebar, main content area, and footer regions.',
    category: 'templates',
    version: '1.3.0',
    status: 'stable',
    platforms: ['web'],
    lastUpdated: '2025-12-15',
    usageCount: 134,
    needsUpdate: false,
    tags: ['page', 'layout', 'structure', 'grid', 'regions']
  },
  {
    id: 'settings-001',
    name: 'Settings Page',
    description: 'A pre-built settings page template with grouped preferences, toggles, form sections, and save/cancel actions.',
    category: 'templates',
    version: '1.0.0',
    status: 'beta',
    platforms: ['web'],
    lastUpdated: '2026-02-01',
    usageCount: 56,
    needsUpdate: false,
    tags: ['settings', 'preferences', 'configuration', 'admin']
  }
]

export const mockComponentDetail: ComponentDetail = {
  id: 'btn-001',
  name: 'Button',
  description: 'A button triggers an event or action. They let users know what will happen next and guide them through a workflow. Buttons support multiple variants, sizes, icon placement, and loading states for comprehensive UI coverage across all platforms.',
  category: 'components',
  version: '3.2.1',
  status: 'stable',
  platforms: ['ios', 'android', 'web'],
  lastUpdated: '2026-01-20',
  usageCount: 2145,
  needsUpdate: false,
  tags: ['button', 'action', 'cta', 'submit', 'interactive'],
  variants: [
    { id: 'default', name: 'Default', description: 'Standard button used for most actions' },
    { id: 'primary', name: 'Primary', description: 'High-emphasis button for the main call-to-action' },
    { id: 'subtle', name: 'Subtle', description: 'Low-emphasis button that blends with surrounding content' },
    { id: 'link', name: 'Link', description: 'Button styled as an inline text link' },
    { id: 'danger', name: 'Danger', description: 'Destructive action that requires confirmation' },
    { id: 'disabled', name: 'Disabled', description: 'Non-interactive state when action is unavailable' },
    { id: 'loading', name: 'Loading', description: 'Processing state with a spinner overlay' }
  ],
  props: [
    { name: 'appearance', type: "'default' | 'primary' | 'subtle' | 'link' | 'subtle-link' | 'warning' | 'danger'", default: "'default'", required: false, description: 'The visual style that controls the button appearance' },
    { name: 'spacing', type: "'compact' | 'default'", default: "'default'", required: false, description: 'Controls the amount of internal padding' },
    { name: 'isDisabled', type: 'boolean', default: 'false', required: false, description: 'Set the button to a disabled state, preventing user interaction' },
    { name: 'isLoading', type: 'boolean', default: 'false', required: false, description: 'Shows a spinner overlay and prevents interaction while loading' },
    { name: 'isSelected', type: 'boolean', default: 'false', required: false, description: 'Applies a pressed/active visual treatment for toggle-style buttons' },
    { name: 'iconBefore', type: 'ReactNode', required: false, description: 'Icon displayed before the button label' },
    { name: 'iconAfter', type: 'ReactNode', required: false, description: 'Icon displayed after the button label' },
    { name: 'shouldFitContainer', type: 'boolean', default: 'false', required: false, description: 'When true, the button expands to fill its parent container width' },
    { name: 'onClick', type: '(e: MouseEvent) => void', required: true, description: 'Handler called when the button is clicked' }
  ],
  versions: [
    { version: '3.2.1', date: '2026-01-20', changes: ['Fixed focus ring visibility on Safari', 'Improved touch target size to meet WCAG 2.2 requirements'], author: 'Sarah Chen' },
    { version: '3.2.0', date: '2025-12-20', changes: ['Added isLoading prop with spinner overlay', 'New subtle-link appearance variant'], author: 'Marcus Johnson' },
    { version: '3.1.0', date: '2025-11-05', changes: ['Icon placement support (iconBefore/iconAfter)', 'RTL layout improvements for bidirectional text'], author: 'Sarah Chen' },
    { version: '3.0.0', date: '2025-09-01', changes: ['BREAKING: Renamed variant prop to appearance', 'Full accessibility audit — WCAG AA compliance', 'New danger appearance for destructive actions'], author: 'Design Systems Team' }
  ],
  comments: [
    {
      id: 'c1',
      author: { name: 'Alex Rivera', avatar: 'https://i.pravatar.cc/40?img=1' },
      content: 'The new loading state is excellent for our checkout flow. One request: could we add a progress variant that shows a percentage for file uploads?',
      date: '2026-01-22',
      replies: [
        {
          id: 'c1r1',
          author: { name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/40?img=2' },
          content: 'Great idea! I\'ve added it to the v3.3.0 roadmap. In the meantime, you can compose Button with ProgressBar for a similar effect.',
          date: '2026-01-23'
        }
      ]
    },
    {
      id: 'c2',
      author: { name: 'Jordan Kim', avatar: 'https://i.pravatar.cc/40?img=3' },
      content: 'Touch targets have been verified at 44x44pt minimum. WCAG 2.2 Target Size (Level AAA) compliance confirmed across all platforms.',
      date: '2026-01-21'
    }
  ],
  usage: {
    doList: [
      'Use the primary appearance for the single most important action on the page',
      'Provide clear, action-oriented labels like "Save changes" or "Create project"',
      'Use the loading state during async operations to prevent double-submission',
      'Pair iconBefore with text labels for improved scannability',
      'Use the danger appearance for destructive actions like "Delete" or "Remove"'
    ],
    dontList: [
      'Don\'t use a button for navigation — use a Link component instead',
      'Don\'t disable a button without providing a reason via tooltip or helper text',
      'Don\'t place more than one primary button in the same section or dialog',
      'Don\'t use vague labels like "Click here" or "Submit" without context',
      'Don\'t override token-based colors with custom CSS'
    ]
  },
  accessibility: {
    wcagLevel: 'AA',
    keyboardNav: [
      'Enter or Space activates the button',
      'Tab moves focus to the next focusable element',
      'Shift + Tab moves focus to the previous focusable element',
      'Disabled buttons are removed from the tab order'
    ],
    screenReader: [
      'Announces the button label, role, and current state',
      'Loading state announces "Loading, please wait" via aria-live',
      'Disabled state announces "dimmed" or "unavailable"',
      'Icon-only buttons require an aria-label for screen reader context'
    ]
  },
  codeSnippets: [
    {
      platform: 'web',
      language: 'tsx',
      code: `import Button from '@atlaskit/button/new'
import AddIcon from '@atlaskit/icon/core/add'

// Primary call-to-action
<Button appearance="primary" onClick={handleSave}>
  Save changes
</Button>

// Button with icon
<Button
  appearance="default"
  iconBefore={AddIcon}
  onClick={handleCreate}
>
  Create project
</Button>

// Loading state
<Button
  appearance="primary"
  isLoading={isSaving}
  onClick={handleSubmit}
>
  {isSaving ? 'Saving...' : 'Save'}
</Button>

// Danger action
<Button appearance="danger" onClick={handleDelete}>
  Delete repository
</Button>`
    },
    {
      platform: 'ios',
      language: 'swift',
      code: `import AtlasKit

// Primary button
DSButton(
  title: "Save changes",
  appearance: .primary,
  action: { viewModel.save() }
)

// Button with icon
DSButton(
  title: "Create project",
  appearance: .default,
  iconBefore: .add,
  action: { viewModel.create() }
)

// Loading state
DSButton(
  title: "Saving...",
  appearance: .primary,
  isLoading: viewModel.isSaving,
  action: { viewModel.submit() }
)`
    },
    {
      platform: 'android',
      language: 'kotlin',
      code: `import com.atlassian.designsystem.button.DSButton
import com.atlassian.designsystem.button.ButtonAppearance

// Primary button
DSButton(
  text = "Save changes",
  appearance = ButtonAppearance.Primary,
  onClick = { viewModel.save() }
)

// Button with icon
DSButton(
  text = "Create project",
  appearance = ButtonAppearance.Default,
  iconBefore = DSIcon.Add,
  onClick = { viewModel.create() }
)

// Loading state
DSButton(
  text = "Saving...",
  appearance = ButtonAppearance.Primary,
  isLoading = viewModel.isSaving,
  onClick = { viewModel.submit() }
)`
    }
  ]
}

export function getComponentById(id: string): ComponentDetail | undefined {
  const basic = mockComponents.find(c => c.id === id)
  if (!basic) return undefined

  return {
    ...mockComponentDetail,
    ...basic
  }
}
