import type { Issue } from '@/types'

export const mockIssues: Issue[] = [
  {
    id: 'issue-001',
    title: 'Button focus ring invisible on Safari when using subtle appearance',
    description: 'The focus ring on Button with appearance="subtle" is invisible on Safari 17+ due to the outline-offset being clipped by the parent container overflow. This fails WCAG 2.4.7 Focus Visible at Level AA.',
    type: 'bug',
    status: 'open',
    priority: 'critical',
    componentId: 'btn-001',
    labels: ['accessibility', 'safari', 'focus', 'wcag'],
    assignee: { name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/40?img=2' },
    author: { name: 'Alex Rivera', avatar: 'https://i.pravatar.cc/40?img=1' },
    createdAt: '2026-01-28T10:30:00Z',
    updatedAt: '2026-02-01T14:15:00Z',
    comments: [
      {
        id: 'c1',
        author: { name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/40?img=2' },
        content: 'Confirmed — Safari clips `outline-offset: 2px` when the parent has `overflow: hidden`. Switching to a box-shadow approach for the focus ring as a workaround.',
        createdAt: '2026-01-29T09:00:00Z'
      },
      {
        id: 'c1b',
        author: { name: 'Lisa Park', avatar: 'https://i.pravatar.cc/40?img=5' },
        content: 'This also affects the link appearance variant. Can we batch the fix?',
        createdAt: '2026-01-30T11:20:00Z'
      }
    ]
  },
  {
    id: 'issue-002',
    title: 'Textfield error messages not announced by NVDA screen reader',
    description: 'When a validation error appears on a Textfield, NVDA does not announce the error message because `aria-describedby` references an element that gets inserted after the attribute is set. The timing issue causes the association to be missed.',
    type: 'bug',
    status: 'open',
    priority: 'critical',
    componentId: 'textfield-001',
    labels: ['accessibility', 'a11y', 'screen-reader', 'wcag', 'nvda'],
    author: { name: 'Lisa Park', avatar: 'https://i.pravatar.cc/40?img=5' },
    createdAt: '2026-01-24T09:15:00Z',
    updatedAt: '2026-01-26T16:00:00Z',
    comments: [
      {
        id: 'c2',
        author: { name: 'Marcus Johnson', avatar: 'https://i.pravatar.cc/40?img=8' },
        content: 'Tested with JAWS and VoiceOver — works there. This is NVDA-specific. We need to render the error container in the DOM from the start (empty) and toggle content, rather than conditionally rendering it.',
        createdAt: '2026-01-25T10:00:00Z'
      }
    ]
  },
  {
    id: 'issue-003',
    title: 'Modal Dialog scrollbar causes layout shift on Windows',
    description: 'When opening a Modal, the background page scrollbar is hidden which causes a ~17px layout shift. This is noticeable on Windows browsers where scrollbars take up space. Need to compensate with padding-right on the body.',
    type: 'bug',
    status: 'in_progress',
    priority: 'high',
    componentId: 'modal-001',
    labels: ['windows', 'layout', 'scroll', 'ux'],
    assignee: { name: 'Marcus Johnson', avatar: 'https://i.pravatar.cc/40?img=8' },
    author: { name: 'Jordan Kim', avatar: 'https://i.pravatar.cc/40?img=3' },
    createdAt: '2026-01-18T08:00:00Z',
    updatedAt: '2026-02-03T11:30:00Z',
    comments: [
      {
        id: 'c3',
        author: { name: 'Marcus Johnson', avatar: 'https://i.pravatar.cc/40?img=8' },
        content: 'Implementing `scrollbar-gutter: stable` as the modern solution with a JS fallback for older browsers.',
        createdAt: '2026-02-02T10:00:00Z'
      }
    ]
  },
  {
    id: 'issue-004',
    title: 'Select component dropdown mispositioned inside overflow:hidden containers',
    description: 'When a Select is placed inside a container with `overflow: hidden`, the dropdown list gets clipped. The dropdown should use a portal strategy to render outside the overflow context.',
    type: 'bug',
    status: 'open',
    priority: 'high',
    componentId: 'select-001',
    labels: ['overflow', 'positioning', 'portal', 'z-index'],
    assignee: { name: 'Alex Rivera', avatar: 'https://i.pravatar.cc/40?img=1' },
    author: { name: 'Emily Watson', avatar: 'https://i.pravatar.cc/40?img=9' },
    createdAt: '2026-01-22T15:00:00Z',
    updatedAt: '2026-01-28T09:45:00Z',
    comments: [
      {
        id: 'c4',
        author: { name: 'Alex Rivera', avatar: 'https://i.pravatar.cc/40?img=1' },
        content: 'Looking into Floating UI as a positioning engine. It handles portal rendering and collision detection. Will prototype this week.',
        createdAt: '2026-01-27T14:30:00Z'
      }
    ]
  },
  {
    id: 'issue-005',
    title: 'Toggle component inconsistent between iOS and Android',
    description: 'The Toggle component has a 2px size difference between iOS and Android native implementations. The thumb size is 20px on iOS but 22px on Android, causing visual inconsistency in cross-platform screenshots and docs.',
    type: 'bug',
    status: 'open',
    priority: 'medium',
    componentId: 'toggle-001',
    labels: ['cross-platform', 'ios', 'android', 'consistency'],
    author: { name: 'David Chen', avatar: 'https://i.pravatar.cc/40?img=12' },
    createdAt: '2026-01-20T14:00:00Z',
    updatedAt: '2026-01-20T14:00:00Z',
    comments: []
  },
  {
    id: 'issue-006',
    title: 'Design tokens don\'t have dark mode equivalents for elevation shadows',
    description: 'The shadow/elevation tokens currently only define light mode values. In dark mode, these shadows are invisible against the dark background. Need to define dark-mode-specific shadow tokens using lighter values or outline-based elevation.',
    type: 'enhancement',
    status: 'in_progress',
    priority: 'high',
    componentId: 'token-001',
    labels: ['dark-mode', 'theming', 'design-tokens', 'elevation'],
    assignee: { name: 'Jordan Kim', avatar: 'https://i.pravatar.cc/40?img=3' },
    author: { name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/40?img=2' },
    createdAt: '2026-01-15T08:00:00Z',
    updatedAt: '2026-02-05T11:30:00Z',
    comments: [
      {
        id: 'c5',
        author: { name: 'Jordan Kim', avatar: 'https://i.pravatar.cc/40?img=3' },
        content: 'Proposal: use `border` + subtle box-shadow for elevation in dark mode instead of pure shadows. Draft tokens ready for review.',
        createdAt: '2026-02-04T09:00:00Z'
      },
      {
        id: 'c5b',
        author: { name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/40?img=2' },
        content: 'Looks good. Make sure to also update the elevation mixin documentation.',
        createdAt: '2026-02-04T14:00:00Z'
      }
    ]
  },
  {
    id: 'issue-007',
    title: 'Lozenge text color fails AA contrast on "moved" appearance',
    description: 'The "moved" appearance (yellow background) with the current text color only achieves a 3.8:1 contrast ratio, below the 4.5:1 WCAG AA minimum for normal text. Need to darken the text or adjust the background.',
    type: 'bug',
    status: 'open',
    priority: 'high',
    componentId: 'lozenge-001',
    labels: ['accessibility', 'color-contrast', 'wcag'],
    assignee: { name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/40?img=2' },
    author: { name: 'Lisa Park', avatar: 'https://i.pravatar.cc/40?img=5' },
    createdAt: '2026-02-01T09:00:00Z',
    updatedAt: '2026-02-03T10:00:00Z',
    comments: [
      {
        id: 'c6',
        author: { name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/40?img=2' },
        content: 'Adjusting the text color from #7A6400 to #5E4D00 brings the ratio to 5.2:1. Updating both bold and subtle variants.',
        createdAt: '2026-02-02T16:00:00Z'
      }
    ]
  },
  {
    id: 'issue-008',
    title: 'Deprecation warning needed for Dropdown Menu component',
    description: 'Dropdown Menu has been superseded by the Popup + Menu composition pattern. We need to add a deprecation notice to the component, show a console warning in development, and create a migration guide.',
    type: 'enhancement',
    status: 'in_progress',
    priority: 'medium',
    componentId: 'dropdown-001',
    labels: ['deprecation', 'migration', 'dx'],
    assignee: { name: 'Marcus Johnson', avatar: 'https://i.pravatar.cc/40?img=8' },
    author: { name: 'Alex Rivera', avatar: 'https://i.pravatar.cc/40?img=1' },
    createdAt: '2026-01-10T10:00:00Z',
    updatedAt: '2026-02-06T14:00:00Z',
    comments: [
      {
        id: 'c7',
        author: { name: 'Marcus Johnson', avatar: 'https://i.pravatar.cc/40?img=8' },
        content: 'Migration guide is drafted. Console warning added with a link to the guide. Will ship with the next minor release.',
        createdAt: '2026-02-06T14:00:00Z'
      }
    ]
  },
  {
    id: 'issue-009',
    title: 'Tabs keyboard navigation doesn\'t follow WAI-ARIA pattern on Android',
    description: 'On Android web, the Tabs component allows Tab key to move between tab items instead of using Arrow keys. This contradicts the WAI-ARIA Tabs pattern where Tab should move focus from the tab list into the tab panel content.',
    type: 'bug',
    status: 'open',
    priority: 'medium',
    componentId: 'tabs-001',
    labels: ['accessibility', 'android', 'keyboard', 'wai-aria'],
    author: { name: 'Emily Watson', avatar: 'https://i.pravatar.cc/40?img=9' },
    createdAt: '2026-01-23T14:30:00Z',
    updatedAt: '2026-01-25T16:00:00Z',
    comments: [
      {
        id: 'c8',
        author: { name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/40?img=2' },
        content: 'This is a roving tabindex implementation issue. The Android Chrome WebView handles arrow key events differently. Need to add a polyfill for the key navigation.',
        createdAt: '2026-01-25T15:45:00Z'
      }
    ]
  },
  {
    id: 'issue-010',
    title: 'Typography scale doesn\'t include responsive sizing for mobile',
    description: 'The current typography scale uses fixed pixel values that are too large on mobile viewports. Need to introduce responsive modifiers or fluid typography using clamp() for heading levels.',
    type: 'enhancement',
    status: 'open',
    priority: 'medium',
    componentId: 'typo-001',
    labels: ['responsive', 'mobile', 'typography', 'foundations'],
    author: { name: 'Jordan Kim', avatar: 'https://i.pravatar.cc/40?img=3' },
    createdAt: '2026-01-28T09:00:00Z',
    updatedAt: '2026-01-28T09:00:00Z',
    comments: []
  },
  {
    id: 'issue-011',
    title: 'Tooltip doesn\'t dismiss on Escape key in Firefox',
    description: 'When a tooltip is visible and the user presses Escape, the tooltip should dismiss. This works in Chrome and Safari but not in Firefox 121+ due to a keydown event handler conflict.',
    type: 'bug',
    status: 'resolved',
    priority: 'medium',
    componentId: 'tooltip-001',
    labels: ['firefox', 'keyboard', 'a11y'],
    assignee: { name: 'Alex Rivera', avatar: 'https://i.pravatar.cc/40?img=1' },
    author: { name: 'Sophie Kim', avatar: 'https://i.pravatar.cc/40?img=15' },
    createdAt: '2026-01-12T11:00:00Z',
    updatedAt: '2026-01-19T10:00:00Z',
    comments: [
      {
        id: 'c9',
        author: { name: 'Alex Rivera', avatar: 'https://i.pravatar.cc/40?img=1' },
        content: 'Fixed in v1.4.1. The issue was that Firefox fires keydown before keypress for Escape, and our handler was on keypress. Moved to keydown.',
        createdAt: '2026-01-19T10:00:00Z'
      }
    ]
  },
  {
    id: 'issue-012',
    title: 'Avatar group overflow counter should use Tooltip for the hidden names',
    description: 'When an AvatarGroup shows "+3 more", hovering on the overflow indicator should show a tooltip with the names of the hidden avatars for discoverability.',
    type: 'enhancement',
    status: 'closed',
    priority: 'low',
    componentId: 'avatar-001',
    labels: ['enhancement', 'ux', 'tooltip'],
    author: { name: 'David Chen', avatar: 'https://i.pravatar.cc/40?img=12' },
    createdAt: '2026-01-08T10:00:00Z',
    updatedAt: '2026-01-20T14:00:00Z',
    comments: [
      {
        id: 'c10',
        author: { name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/40?img=2' },
        content: 'Implemented in v2.1.0. The overflow indicator now shows a Tooltip listing hidden member names.',
        createdAt: '2026-01-20T14:00:00Z'
      }
    ]
  }
]

export const issueLabels = [
  'a11y',
  'accessibility',
  'android',
  'color-contrast',
  'consistency',
  'cross-platform',
  'dark-mode',
  'deprecation',
  'design-tokens',
  'dx',
  'elevation',
  'enhancement',
  'firefox',
  'focus',
  'foundations',
  'ios',
  'keyboard',
  'layout',
  'migration',
  'mobile',
  'nvda',
  'overflow',
  'portal',
  'positioning',
  'responsive',
  'safari',
  'screen-reader',
  'scroll',
  'theming',
  'tooltip',
  'typography',
  'ux',
  'wai-aria',
  'wcag',
  'windows',
  'z-index'
]
