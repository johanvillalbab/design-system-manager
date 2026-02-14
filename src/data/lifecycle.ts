import type { ComponentLifecycle, AIMetadata } from '@/types'

export const mockLifecycles: Record<string, ComponentLifecycle> = {
  'btn-001': {
    componentId: 'btn-001',
    stages: [
      {
        id: 'stage-1',
        type: 'design',
        status: 'completed',
        assignee: { name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/40?img=2' },
        startedAt: '2025-08-01T00:00:00Z',
        completedAt: '2025-08-15T00:00:00Z',
        artifacts: [
          { type: 'figma', url: 'https://figma.com/file/button', label: 'Button Design Specs' }
        ],
        notes: 'Initial design completed with 7 appearance variants and 2 spacing options'
      },
      {
        id: 'stage-2',
        type: 'review',
        status: 'completed',
        assignee: { name: 'Design Systems Team', avatar: 'https://i.pravatar.cc/40?img=70' },
        startedAt: '2025-08-16T00:00:00Z',
        completedAt: '2025-08-20T00:00:00Z',
        artifacts: [],
        notes: 'Design review passed — added danger variant per feedback'
      },
      {
        id: 'stage-3',
        type: 'development',
        status: 'completed',
        assignee: { name: 'Marcus Johnson', avatar: 'https://i.pravatar.cc/40?img=8' },
        startedAt: '2025-08-21T00:00:00Z',
        completedAt: '2025-09-10T00:00:00Z',
        artifacts: [
          { type: 'code', url: 'https://github.com/ds/components/button', label: 'Source Code' },
          { type: 'storybook', url: 'https://storybook.ds.com/button', label: 'Storybook' }
        ],
        notes: 'Implemented for Web, iOS, and Android with full token integration'
      },
      {
        id: 'stage-4',
        type: 'testing',
        status: 'completed',
        assignee: { name: 'QA Team', avatar: 'https://i.pravatar.cc/40?img=65' },
        startedAt: '2025-09-11T00:00:00Z',
        completedAt: '2025-09-15T00:00:00Z',
        artifacts: [
          { type: 'test', url: 'https://github.com/ds/components/button/tests', label: 'Test Suite' }
        ],
        notes: '98% test coverage — a11y audit passed WCAG AA'
      },
      {
        id: 'stage-5',
        type: 'release',
        status: 'completed',
        startedAt: '2025-09-16T00:00:00Z',
        completedAt: '2025-09-16T00:00:00Z',
        artifacts: [],
        notes: 'Released as v3.0.0 — breaking change: variant → appearance'
      }
    ]
  },
  'textfield-001': {
    componentId: 'textfield-001',
    stages: [
      {
        id: 'stage-1',
        type: 'design',
        status: 'completed',
        assignee: { name: 'Jordan Kim', avatar: 'https://i.pravatar.cc/40?img=3' },
        startedAt: '2025-06-10T00:00:00Z',
        completedAt: '2025-06-28T00:00:00Z',
        artifacts: [{ type: 'figma', url: 'https://figma.com/file/textfield', label: 'Textfield Specs' }],
        notes: 'Design includes label, helper text, error state, and character count'
      },
      {
        id: 'stage-2',
        type: 'review',
        status: 'completed',
        startedAt: '2025-06-29T00:00:00Z',
        completedAt: '2025-07-02T00:00:00Z',
        artifacts: [],
        notes: 'Approved with minor adjustments to error icon placement'
      },
      {
        id: 'stage-3',
        type: 'development',
        status: 'completed',
        assignee: { name: 'Alex Rivera', avatar: 'https://i.pravatar.cc/40?img=1' },
        startedAt: '2025-07-03T00:00:00Z',
        completedAt: '2025-07-28T00:00:00Z',
        artifacts: [{ type: 'code', url: 'https://github.com/ds/components/textfield', label: 'Source Code' }],
        notes: 'Web + iOS implementation complete, Android following next sprint'
      },
      {
        id: 'stage-4',
        type: 'testing',
        status: 'completed',
        completedAt: '2025-08-05T00:00:00Z',
        artifacts: [],
        notes: 'Passed — validated with screen readers (VoiceOver, TalkBack, NVDA)'
      },
      {
        id: 'stage-5',
        type: 'release',
        status: 'completed',
        completedAt: '2025-08-06T00:00:00Z',
        artifacts: [],
        notes: 'Released as v2.9.0'
      }
    ]
  },
  'modal-001': {
    componentId: 'modal-001',
    stages: [
      {
        id: 'stage-1',
        type: 'design',
        status: 'completed',
        assignee: { name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/40?img=2' },
        startedAt: '2025-10-01T00:00:00Z',
        completedAt: '2025-10-18T00:00:00Z',
        artifacts: [{ type: 'figma', url: 'https://figma.com/file/modal', label: 'Modal Dialog Specs' }],
        notes: 'Designed small, medium, large, and x-large widths with focus trap'
      },
      {
        id: 'stage-2',
        type: 'review',
        status: 'completed',
        startedAt: '2025-10-19T00:00:00Z',
        completedAt: '2025-10-22T00:00:00Z',
        artifacts: [],
        notes: 'Approved — added auto-focus on primary action button'
      },
      {
        id: 'stage-3',
        type: 'development',
        status: 'completed',
        assignee: { name: 'Marcus Johnson', avatar: 'https://i.pravatar.cc/40?img=8' },
        startedAt: '2025-10-23T00:00:00Z',
        completedAt: '2025-11-20T00:00:00Z',
        artifacts: [
          { type: 'code', url: 'https://github.com/ds/components/modal', label: 'Source Code' },
          { type: 'storybook', url: 'https://storybook.ds.com/modal', label: 'Storybook' }
        ],
        notes: 'Implemented with portal rendering and scroll lock'
      },
      {
        id: 'stage-4',
        type: 'testing',
        status: 'completed',
        assignee: { name: 'QA Team', avatar: 'https://i.pravatar.cc/40?img=65' },
        startedAt: '2025-11-21T00:00:00Z',
        completedAt: '2025-11-28T00:00:00Z',
        artifacts: [{ type: 'test', url: 'https://github.com/ds/components/modal/tests', label: 'Test Suite' }],
        notes: 'Focus management and Escape key handling verified across browsers'
      },
      {
        id: 'stage-5',
        type: 'release',
        status: 'completed',
        startedAt: '2025-12-01T00:00:00Z',
        completedAt: '2025-12-01T00:00:00Z',
        artifacts: [],
        notes: 'Released as v2.0.0'
      }
    ]
  },
  'banner-001': {
    componentId: 'banner-001',
    stages: [
      {
        id: 'stage-1',
        type: 'design',
        status: 'completed',
        assignee: { name: 'Jordan Kim', avatar: 'https://i.pravatar.cc/40?img=3' },
        startedAt: '2025-12-01T00:00:00Z',
        completedAt: '2025-12-15T00:00:00Z',
        artifacts: [{ type: 'figma', url: 'https://figma.com/file/banner', label: 'Banner Specs' }],
        notes: 'Info, warning, and error banner variants with dismiss action'
      },
      {
        id: 'stage-2',
        type: 'review',
        status: 'completed',
        startedAt: '2025-12-16T00:00:00Z',
        completedAt: '2025-12-18T00:00:00Z',
        artifacts: [],
        notes: 'Approved — added success variant'
      },
      {
        id: 'stage-3',
        type: 'development',
        status: 'completed',
        assignee: { name: 'Alex Rivera', avatar: 'https://i.pravatar.cc/40?img=1' },
        startedAt: '2025-12-19T00:00:00Z',
        completedAt: '2026-01-15T00:00:00Z',
        artifacts: [{ type: 'code', url: 'https://github.com/ds/components/banner', label: 'Source Code' }],
        notes: 'Web implementation complete, mobile pending'
      },
      {
        id: 'stage-4',
        type: 'testing',
        status: 'in_progress',
        assignee: { name: 'QA Team', avatar: 'https://i.pravatar.cc/40?img=65' },
        startedAt: '2026-01-16T00:00:00Z',
        artifacts: [],
        notes: 'Screen reader announcements under review for aria-live regions'
      },
      {
        id: 'stage-5',
        type: 'release',
        status: 'pending',
        artifacts: [],
        notes: ''
      }
    ]
  },
  'inline-edit-001': {
    componentId: 'inline-edit-001',
    stages: [
      {
        id: 'stage-1',
        type: 'design',
        status: 'completed',
        assignee: { name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/40?img=2' },
        startedAt: '2025-11-15T00:00:00Z',
        completedAt: '2025-12-02T00:00:00Z',
        artifacts: [{ type: 'figma', url: 'https://figma.com/file/inline-edit', label: 'Inline Edit Specs' }],
        notes: 'Design covers read view, edit view, validation states, and confirmation'
      },
      {
        id: 'stage-2',
        type: 'review',
        status: 'completed',
        startedAt: '2025-12-03T00:00:00Z',
        completedAt: '2025-12-06T00:00:00Z',
        artifacts: [],
        notes: 'Approved with note to add keyboard shortcut for cancellation'
      },
      {
        id: 'stage-3',
        type: 'development',
        status: 'in_progress',
        assignee: { name: 'Marcus Johnson', avatar: 'https://i.pravatar.cc/40?img=8' },
        startedAt: '2025-12-07T00:00:00Z',
        artifacts: [{ type: 'code', url: 'https://github.com/ds/components/inline-edit', label: 'Source Code (WIP)' }],
        notes: 'Web implementation 80% complete — custom input composition pending'
      },
      {
        id: 'stage-4',
        type: 'testing',
        status: 'pending',
        artifacts: [],
        notes: ''
      },
      {
        id: 'stage-5',
        type: 'release',
        status: 'pending',
        artifacts: [],
        notes: ''
      }
    ]
  }
}

export const mockAIMetadata: Record<string, AIMetadata> = {
  'btn-001': {
    summary: 'A button triggers an event or action. They let users know what will happen next. Supports seven appearance variants (default, primary, subtle, link, subtle-link, warning, danger), two spacing modes, icon placement, loading states, and full accessibility compliance.',
    keywords: ['button', 'action', 'primary', 'cta', 'submit', 'form', 'click', 'danger', 'loading'],
    useCases: [
      'Primary call-to-action on a page or dialog',
      'Form submission and cancel actions',
      'Destructive operations requiring confirmation',
      'Toolbar actions with icon-only buttons',
      'Toggle buttons for selected/unselected states'
    ],
    relatedComponents: ['textfield-001', 'form-001', 'modal-001'],
    codePatterns: [
      '<Button appearance="primary" onClick={handleSave}>Save changes</Button>',
      '<Button appearance="danger" onClick={handleDelete}>Delete</Button>',
      '<Button isLoading={isSaving} appearance="primary">Saving...</Button>',
      '<Button iconBefore={AddIcon}>Create project</Button>'
    ],
    constraints: [
      'Only one primary button per section or dialog',
      'Always provide an onClick handler — buttons without actions are anti-patterns',
      'Icon-only buttons require an explicit aria-label',
      'Never use buttons for navigation — use Link or router-link instead',
      'Minimum touch target: 44x44 CSS pixels (WCAG 2.2 Level AAA)'
    ]
  },
  'textfield-001': {
    summary: 'A text field lets users enter and edit text. It supports labels, placeholder text, helper messages, error/success validation states, character counts, and required field indicators. Always pair with a visible label for accessibility.',
    keywords: ['input', 'text', 'field', 'form', 'validation', 'label', 'placeholder', 'required'],
    useCases: [
      'Single-line text entry in forms',
      'Search input with icon',
      'Email and password fields with validation',
      'Inline editing of titles and descriptions',
      'Number input with min/max constraints'
    ],
    relatedComponents: ['btn-001', 'select-001', 'form-001', 'checkbox-001'],
    codePatterns: [
      '<Textfield label="Full name" placeholder="e.g. Jane Doe" isRequired />',
      '<Textfield label="Email" type="email" invalidMessage="Enter a valid email address" />',
      '<Textfield label="Bio" elemAfterInput={<CharacterCount />} maxLength={200} />'
    ],
    constraints: [
      'Always provide a visible label — never rely on placeholder alone',
      'Connect error messages with aria-describedby for screen readers',
      'Use the appropriate input type (email, tel, url, number) for mobile keyboard optimization',
      'Disable autocomplete only when there is a security reason to do so'
    ]
  },
  'select-001': {
    summary: 'Select allows users to choose one or multiple options from a dropdown list. It supports search filtering, async option loading, grouping, custom option rendering, and clear selection. Built on top of downshift for accessibility.',
    keywords: ['select', 'dropdown', 'picker', 'options', 'form', 'multi-select', 'combobox'],
    useCases: [
      'Choosing a country or region from a long list',
      'Assigning a team member to an issue',
      'Multi-select for labels or categories',
      'Cascading selects for location hierarchies',
      'Async search for users or entities'
    ],
    relatedComponents: ['textfield-001', 'checkbox-001', 'form-001'],
    codePatterns: [
      '<Select label="Assignee" options={users} onChange={setAssignee} isClearable />',
      '<Select label="Labels" options={labels} isMulti isSearchable />',
      '<Select label="Country" options={countries} menuPlacement="auto" />'
    ],
    constraints: [
      'Prefer radio buttons if there are 5 or fewer options',
      'Always provide a label — the select trigger alone is insufficient',
      'Test with keyboard-only navigation (Arrow keys, Enter, Escape)',
      'Limit multi-select visible chips to 3 — show "+N more" for the rest'
    ]
  },
  'checkbox-001': {
    summary: 'A checkbox allows users to select one or more items from a set, or to turn an option on or off. Supports an indeterminate (mixed) state for parent-child relationships in tree views or bulk selection.',
    keywords: ['checkbox', 'form', 'toggle', 'selection', 'boolean', 'multi-select', 'indeterminate'],
    useCases: [
      'Multi-option forms (interests, permissions)',
      'Terms and conditions acceptance',
      'Bulk selection in data tables',
      'Feature toggles in settings pages',
      'Parent-child selection trees'
    ],
    relatedComponents: ['toggle-001', 'select-001', 'form-001'],
    codePatterns: [
      '<Checkbox label="I agree to the terms" isRequired />',
      '<Checkbox label="Select all" isIndeterminate={someSelected} isChecked={allSelected} />',
      '<CheckboxGroup label="Notifications">{options.map(o => <Checkbox key={o.id} label={o.label} />)}</CheckboxGroup>'
    ],
    constraints: [
      'Use toggle instead when the setting takes effect immediately without submission',
      'Always provide a visible label — don\'t rely on surrounding text',
      'Indeterminate state is visual only — aria-checked should be "mixed"',
      'Group related checkboxes with fieldset and legend for screen readers'
    ]
  },
  'toggle-001': {
    summary: 'A toggle switches between enabled and disabled states. Unlike a checkbox, changes take effect immediately without needing a submit action. Use toggles for binary settings like enabling notifications or dark mode.',
    keywords: ['toggle', 'switch', 'on-off', 'settings', 'boolean', 'preference', 'immediate'],
    useCases: [
      'Enabling or disabling a feature (notifications, dark mode)',
      'Visibility toggles (show/hide elements)',
      'Auto-save preference',
      'Maintenance mode for admin dashboards',
      'Privacy settings (share analytics, location)'
    ],
    relatedComponents: ['checkbox-001', 'form-001'],
    codePatterns: [
      '<Toggle label="Enable notifications" isChecked={enabled} onChange={setEnabled} />',
      '<Toggle label="Dark mode" size="large" />'
    ],
    constraints: [
      'Use checkbox instead when the change requires explicit submission',
      'Provide a clear label that describes the "on" state',
      'Announce state changes to screen readers via aria-checked',
      'Do not use a toggle for destructive actions — use a button with confirmation'
    ]
  },
  'avatar-001': {
    summary: 'An avatar represents a user or entity. It displays an image when available, falling back to initials or a generic person icon. Supports size variants (xsmall to xlarge), presence indicators (online, busy, offline), and grouped stacking.',
    keywords: ['avatar', 'user', 'profile', 'image', 'initials', 'presence', 'group'],
    useCases: [
      'User profile pictures in headers and comments',
      'Assignee indicators in issue trackers',
      'Avatar groups showing team members',
      'Presence status in collaboration tools',
      'Entity placeholders (team, project, space)'
    ],
    relatedComponents: ['badge-001', 'lozenge-001', 'tooltip-001'],
    codePatterns: [
      '<Avatar name="Sarah Chen" src="https://avatar.example/sarah.jpg" size="medium" />',
      '<Avatar name="QA Team" appearance="circle" presence="online" />',
      '<AvatarGroup maxCount={5} data={teamMembers} />'
    ],
    constraints: [
      'Always provide the name prop for alt text and initials fallback',
      'Limit avatar groups to maxCount 5–8 to avoid visual clutter',
      'Use appearance="square" only for non-person entities (teams, projects)',
      'Presence indicators must have a text equivalent for screen readers'
    ]
  },
  'badge-001': {
    summary: 'A badge is a visual indicator for numeric values. It highlights counts that need the user\'s attention, like unread notifications or pending tasks. Supports appearance variants (default, primary, important, added, removed).',
    keywords: ['badge', 'count', 'indicator', 'notification', 'unread', 'number'],
    useCases: [
      'Unread notification count on navigation items',
      'Issue count per project or label',
      'Cart item count in e-commerce',
      'Pending review count on pull requests',
      'New activity indicator'
    ],
    relatedComponents: ['avatar-001', 'lozenge-001', 'tabs-001'],
    codePatterns: [
      '<Badge appearance="primary">{unreadCount}</Badge>',
      '<Badge appearance="important" max={99}>{notifications}</Badge>',
      '<Badge>{issueCount}</Badge>'
    ],
    constraints: [
      'Badge content should be numeric — use Lozenge for text labels',
      'Use max prop to cap display (e.g., "99+" instead of 312)',
      'Important appearance should be reserved for counts that require immediate attention',
      'Include aria-label that describes the count context ("5 unread notifications")'
    ]
  },
  'modal-001': {
    summary: 'A modal dialog displays content in a layer above the page that requires user interaction. It traps focus, prevents background scrolling, and is dismissed via Escape key or an explicit close button. Available in small, medium, large, and x-large widths.',
    keywords: ['modal', 'dialog', 'overlay', 'popup', 'lightbox', 'confirmation', 'focus-trap'],
    useCases: [
      'Confirmation before destructive actions',
      'Form workflows that shouldn\'t lose context',
      'Image or media preview overlays',
      'Onboarding step-by-step wizards',
      'Detail views without page navigation'
    ],
    relatedComponents: ['btn-001', 'form-001', 'banner-001'],
    codePatterns: [
      '<ModalTransition>{isOpen && <Modal onClose={close}><ModalHeader><ModalTitle>Confirm delete</ModalTitle></ModalHeader><ModalBody>This action cannot be undone.</ModalBody><ModalFooter><Button appearance="subtle" onClick={close}>Cancel</Button><Button appearance="danger" onClick={handleDelete}>Delete</Button></ModalFooter></Modal>}</ModalTransition>',
      '<Modal width="large"><ModalHeader><ModalTitle>Edit profile</ModalTitle></ModalHeader><ModalBody><Form>{fields}</Form></ModalBody></Modal>'
    ],
    constraints: [
      'Avoid nesting modals — use a multi-step flow within a single modal instead',
      'Always provide a visible close mechanism (X button or cancel action)',
      'Auto-focus the primary action button or first input on open',
      'Content that scrolls should scroll inside ModalBody, not the whole modal',
      'Escape key must close the modal — do not prevent default behavior'
    ]
  },
  'tabs-001': {
    summary: 'Tabs organize content into separate views where only one view is visible at a time. Users select a tab to reveal its content panel. Supports horizontal and vertical orientations, controlled and uncontrolled modes.',
    keywords: ['tabs', 'tab', 'panels', 'navigation', 'sections', 'content', 'switch'],
    useCases: [
      'Switching between related content sections on a page',
      'Settings pages with categorized options',
      'Dashboard views (overview, activity, settings)',
      'Code editor file tabs',
      'Component documentation (usage, API, examples)'
    ],
    relatedComponents: ['btn-001', 'badge-001', 'nav-001'],
    codePatterns: [
      '<Tabs id="settings"><TabList><Tab>General</Tab><Tab>Security</Tab><Tab>Notifications</Tab></TabList><TabPanel>General settings content</TabPanel><TabPanel>Security content</TabPanel><TabPanel>Notifications content</TabPanel></Tabs>'
    ],
    constraints: [
      'Use tabs only when content in each panel is at the same level of hierarchy',
      'Don\'t use tabs for sequential steps — use a stepper or wizard instead',
      'Tab labels should be short (1–2 words) and descriptive',
      'Keyboard navigation: Arrow keys between tabs, Tab key into panel content',
      'Minimum of 2 tabs, maximum recommended 6–7 before overflow'
    ]
  },
  'lozenge-001': {
    summary: 'A lozenge is a visual indicator for status. It uses color and text to highlight an item\'s current state. Available in subtle and bold appearances across default, success, removed, in-progress, new, and moved themes.',
    keywords: ['lozenge', 'status', 'label', 'tag', 'pill', 'indicator', 'state'],
    useCases: [
      'Issue status indicators (To Do, In Progress, Done)',
      'Feature flags (New, Beta, Deprecated)',
      'User role labels (Admin, Member, Guest)',
      'Build status (Passing, Failing, Pending)',
      'Content lifecycle (Draft, Review, Published)'
    ],
    relatedComponents: ['badge-001', 'avatar-001', 'tooltip-001'],
    codePatterns: [
      '<Lozenge appearance="success">Done</Lozenge>',
      '<Lozenge appearance="inprogress" isBold>In progress</Lozenge>',
      '<Lozenge appearance="removed">Blocked</Lozenge>',
      '<Lozenge appearance="new">Beta</Lozenge>'
    ],
    constraints: [
      'Keep text short — 1–2 words maximum',
      'Use bold appearance for primary status, subtle for secondary',
      'Don\'t use lozenges as interactive elements — they are informational only',
      'Color alone must not convey meaning — text is required for accessibility'
    ]
  },
  'form-001': {
    summary: 'The form pattern provides a standard layout for composing form fields with consistent validation, error handling, and submission behavior. It orchestrates Textfield, Select, Checkbox, and Button components with proper label association and field spacing.',
    keywords: ['form', 'validation', 'submit', 'layout', 'fields', 'error', 'required'],
    useCases: [
      'User registration and login forms',
      'Settings and preferences forms',
      'Data entry and editing forms',
      'Search filter panels',
      'Multi-step wizard forms'
    ],
    relatedComponents: ['btn-001', 'textfield-001', 'select-001', 'checkbox-001'],
    codePatterns: [
      '<Form onSubmit={handleSubmit}><Field name="name" label="Name" isRequired>{({ fieldProps }) => <Textfield {...fieldProps} />}</Field><FormFooter><Button appearance="primary" type="submit">Submit</Button></FormFooter></Form>'
    ],
    constraints: [
      'Every field must have a visible label — do not rely on placeholders alone',
      'Show validation errors inline next to the field, not only in a summary',
      'Required fields must be marked with the isRequired prop',
      'Preserve user input on validation failure — never clear the form',
      'Submit buttons should clearly describe the action ("Create project", not "Submit")'
    ]
  },
  'tooltip-001': {
    summary: 'A tooltip is a floating, non-actionable label that appears on hover or keyboard focus. It provides additional context about an element. Use tooltips sparingly for supplemental information that doesn\'t fit in the UI.',
    keywords: ['tooltip', 'hover', 'popover', 'hint', 'label', 'description', 'help'],
    useCases: [
      'Explaining icon-only buttons',
      'Showing full text for truncated content',
      'Providing keyboard shortcut hints',
      'Clarifying disabled state reasons',
      'Additional context for data visualizations'
    ],
    relatedComponents: ['btn-001', 'avatar-001', 'badge-001'],
    codePatterns: [
      '<Tooltip content="Bold (Cmd+B)"><Button iconBefore={BoldIcon} /></Tooltip>',
      '<Tooltip content="This field is required by your organization\'s policy"><InformationIcon /></Tooltip>'
    ],
    constraints: [
      'Tooltips must not contain interactive content (links, buttons)',
      'Keep content to one short sentence or less',
      'Never put essential information only in tooltips — it must be accessible elsewhere',
      'Tooltip must be reachable by keyboard (focus, not just hover)',
      'Dismiss on Escape key press'
    ]
  }
}

export function getLifecycle(componentId: string): ComponentLifecycle | null {
  return mockLifecycles[componentId] || null
}

export function getAIMetadata(componentId: string): AIMetadata | null {
  return mockAIMetadata[componentId] || null
}
