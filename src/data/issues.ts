import type { Issue } from '@/types'

export const mockIssues: Issue[] = [
  {
    id: 'issue-001',
    title: 'Button component has inconsistent hover states on iOS',
    description: 'When using the Button component on iOS Safari, the hover state persists after touch, causing visual inconsistency. This affects all button variants.',
    type: 'bug',
    status: 'open',
    priority: 'high',
    componentId: 'btn-001',
    labels: ['ios', 'touch', 'accessibility'],
    assignee: { name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/40?img=2' },
    author: { name: 'Alex Rivera', avatar: 'https://i.pravatar.cc/40?img=1' },
    createdAt: '2026-01-20T10:30:00Z',
    updatedAt: '2026-01-22T14:15:00Z',
    comments: [
      {
        id: 'c1',
        author: { name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/40?img=2' },
        content: 'I can reproduce this. Looking into the touch event handling.',
        createdAt: '2026-01-21T09:00:00Z'
      }
    ]
  },
  {
    id: 'issue-002',
    title: 'Add dark mode support for Card component',
    description: 'The Card component needs proper dark mode styling. Currently it uses hardcoded colors that don\'t adapt to the theme.',
    type: 'enhancement',
    status: 'in_progress',
    priority: 'medium',
    componentId: 'card-001',
    labels: ['dark-mode', 'theming', 'design-tokens'],
    assignee: { name: 'Marcus Johnson', avatar: 'https://i.pravatar.cc/40?img=8' },
    author: { name: 'Jordan Kim', avatar: 'https://i.pravatar.cc/40?img=3' },
    createdAt: '2026-01-18T08:00:00Z',
    updatedAt: '2026-01-23T11:30:00Z',
    comments: [
      {
        id: 'c2',
        author: { name: 'Marcus Johnson', avatar: 'https://i.pravatar.cc/40?img=8' },
        content: 'Working on this now. Will use CSS custom properties for all colors.',
        createdAt: '2026-01-22T10:00:00Z'
      },
      {
        id: 'c3',
        author: { name: 'Jordan Kim', avatar: 'https://i.pravatar.cc/40?img=3' },
        content: 'Great! Make sure to also update the shadow tokens.',
        createdAt: '2026-01-22T11:00:00Z'
      }
    ]
  },
  {
    id: 'issue-003',
    title: 'Input field accessibility: missing aria-describedby for error states',
    description: 'Screen readers don\'t announce error messages because the input fields are missing aria-describedby attributes linking to the error text.',
    type: 'bug',
    status: 'open',
    priority: 'critical',
    componentId: 'inp-001',
    labels: ['accessibility', 'a11y', 'wcag'],
    author: { name: 'Lisa Park', avatar: 'https://i.pravatar.cc/40?img=5' },
    createdAt: '2026-01-24T09:15:00Z',
    updatedAt: '2026-01-24T09:15:00Z',
    comments: []
  },
  {
    id: 'issue-004',
    title: 'Document Modal component keyboard navigation',
    description: 'The Modal component has keyboard trap functionality but it\'s not documented. Need to add documentation explaining how focus is managed.',
    type: 'documentation',
    status: 'open',
    priority: 'low',
    componentId: 'modal-001',
    labels: ['documentation', 'accessibility'],
    author: { name: 'David Chen', avatar: 'https://i.pravatar.cc/40?img=12' },
    createdAt: '2026-01-22T15:00:00Z',
    updatedAt: '2026-01-22T15:00:00Z',
    comments: []
  },
  {
    id: 'issue-005',
    title: 'Should Tabs support vertical orientation?',
    description: 'Some designs require vertical tabs for sidebars. Should we add this as a prop or create a separate component?',
    type: 'question',
    status: 'open',
    priority: 'medium',
    componentId: 'tab-001',
    labels: ['question', 'api-design'],
    author: { name: 'Emily Watson', avatar: 'https://i.pravatar.cc/40?img=9' },
    createdAt: '2026-01-23T14:30:00Z',
    updatedAt: '2026-01-23T16:00:00Z',
    comments: [
      {
        id: 'c4',
        author: { name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/40?img=2' },
        content: 'I think an orientation prop would be cleaner than a separate component. Similar to how we handle button groups.',
        createdAt: '2026-01-23T15:45:00Z'
      }
    ]
  },
  {
    id: 'issue-006',
    title: 'Badge component truncates long text without ellipsis',
    description: 'When badge text is too long, it gets cut off abruptly without showing an ellipsis or tooltip.',
    type: 'bug',
    status: 'resolved',
    priority: 'low',
    componentId: 'badge-001',
    labels: ['ui', 'overflow'],
    assignee: { name: 'Alex Rivera', avatar: 'https://i.pravatar.cc/40?img=1' },
    author: { name: 'Sophie Kim', avatar: 'https://i.pravatar.cc/40?img=15' },
    createdAt: '2026-01-15T11:00:00Z',
    updatedAt: '2026-01-19T10:00:00Z',
    comments: [
      {
        id: 'c5',
        author: { name: 'Alex Rivera', avatar: 'https://i.pravatar.cc/40?img=1' },
        content: 'Fixed in v2.1.0. Added text-overflow: ellipsis and a title attribute for the full text.',
        createdAt: '2026-01-19T10:00:00Z'
      }
    ]
  },
  {
    id: 'issue-007',
    title: 'Add loading skeleton variant to Card',
    description: 'We need a skeleton loading state for cards to improve perceived performance during data fetching.',
    type: 'enhancement',
    status: 'in_progress',
    priority: 'medium',
    componentId: 'card-001',
    labels: ['enhancement', 'loading-states', 'ux'],
    assignee: { name: 'Jordan Kim', avatar: 'https://i.pravatar.cc/40?img=3' },
    author: { name: 'Marcus Johnson', avatar: 'https://i.pravatar.cc/40?img=8' },
    createdAt: '2026-01-20T09:00:00Z',
    updatedAt: '2026-01-24T08:00:00Z',
    comments: []
  },
  {
    id: 'issue-008',
    title: 'Color token documentation needs examples',
    description: 'The color tokens page lists all tokens but doesn\'t show visual examples or usage context.',
    type: 'documentation',
    status: 'closed',
    priority: 'medium',
    componentId: 'color-001',
    labels: ['documentation', 'foundations'],
    author: { name: 'Lisa Park', avatar: 'https://i.pravatar.cc/40?img=5' },
    createdAt: '2026-01-10T10:00:00Z',
    updatedAt: '2026-01-17T14:00:00Z',
    comments: [
      {
        id: 'c6',
        author: { name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/40?img=2' },
        content: 'Added swatches and usage examples in the latest docs update.',
        createdAt: '2026-01-17T14:00:00Z'
      }
    ]
  }
]

export const issueLabels = [
  'accessibility',
  'a11y',
  'api-design',
  'bug',
  'dark-mode',
  'design-tokens',
  'documentation',
  'enhancement',
  'foundations',
  'ios',
  'loading-states',
  'overflow',
  'question',
  'theming',
  'touch',
  'ui',
  'ux',
  'wcag'
]
