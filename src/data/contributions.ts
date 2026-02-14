import type { Branch, Contribution } from '@/types'

export const mockBranches: Branch[] = [
  {
    id: 'branch-main',
    name: 'main',
    componentId: 'btn-001',
    basedOn: '3.2.1',
    author: { name: 'Design Systems Team', avatar: 'https://i.pravatar.cc/40?img=70' },
    createdAt: '2025-01-01T00:00:00Z',
    isDefault: true
  },
  {
    id: 'branch-001',
    name: 'feat/button-loading-state',
    componentId: 'btn-001',
    basedOn: '3.2.1',
    author: { name: 'Marcus Johnson', avatar: 'https://i.pravatar.cc/40?img=8' },
    createdAt: '2026-01-20T10:00:00Z',
    isDefault: false
  },
  {
    id: 'branch-002',
    name: 'fix/textfield-aria-describedby',
    componentId: 'textfield-001',
    basedOn: '2.9.0',
    author: { name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/40?img=2' },
    createdAt: '2026-01-25T14:00:00Z',
    isDefault: false
  },
  {
    id: 'branch-003',
    name: 'feat/dark-mode-elevation-tokens',
    componentId: 'token-001',
    basedOn: '4.2.0',
    author: { name: 'Jordan Kim', avatar: 'https://i.pravatar.cc/40?img=3' },
    createdAt: '2026-01-30T09:00:00Z',
    isDefault: false
  },
  {
    id: 'branch-004',
    name: 'fix/lozenge-contrast-moved',
    componentId: 'lozenge-001',
    basedOn: '1.6.0',
    author: { name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/40?img=2' },
    createdAt: '2026-02-02T11:00:00Z',
    isDefault: false
  },
  {
    id: 'branch-005',
    name: 'feat/modal-scrollbar-compensation',
    componentId: 'modal-001',
    basedOn: '2.0.0',
    author: { name: 'Marcus Johnson', avatar: 'https://i.pravatar.cc/40?img=8' },
    createdAt: '2026-02-01T08:00:00Z',
    isDefault: false
  }
]

export const mockContributions: Contribution[] = [
  {
    id: 'contrib-001',
    title: 'Add loading spinner overlay to Button',
    description: 'Adds an isLoading prop to the Button component that overlays a spinner and prevents interaction. The spinner uses the same color as the button text for each appearance variant. Includes animated transition between states.',
    branchId: 'branch-001',
    componentId: 'btn-001',
    status: 'approved',
    author: { name: 'Marcus Johnson', avatar: 'https://i.pravatar.cc/40?img=8' },
    changes: [
      {
        field: 'props',
        before: 'No loading state support',
        after: 'Added isLoading: boolean prop with spinner overlay',
        description: 'New loading state that prevents double-submission'
      },
      {
        field: 'styles',
        before: 'Static opacity for disabled',
        after: 'Added spinner animation + pointer-events:none during loading',
        description: 'Visual loading feedback with interaction lock'
      },
      {
        field: 'accessibility',
        before: 'No loading announcement',
        after: 'aria-busy="true" and aria-live="polite" announce "Loading, please wait"',
        description: 'Screen reader support for loading state'
      }
    ],
    reviews: [
      {
        id: 'review-001',
        author: { name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/40?img=2' },
        status: 'approved',
        comment: 'Excellent implementation. The aria-live announcement is a nice touch. Approved!',
        createdAt: '2026-01-28T15:00:00Z'
      },
      {
        id: 'review-001b',
        author: { name: 'Alex Rivera', avatar: 'https://i.pravatar.cc/40?img=1' },
        status: 'approved',
        comment: 'Tested on iOS and Android. Spinner renders correctly on all appearance variants.',
        createdAt: '2026-01-29T10:30:00Z'
      }
    ],
    createdAt: '2026-01-20T10:30:00Z',
    updatedAt: '2026-01-29T10:30:00Z'
  },
  {
    id: 'contrib-002',
    title: 'Fix NVDA screen reader error announcement in Textfield',
    description: 'Fixes the issue where NVDA doesn\'t announce Textfield error messages. The root cause was conditional rendering of the error container — NVDA misses the aria-describedby association when the target element doesn\'t exist at mount time. This PR renders the error container always (empty by default) and toggles content.',
    branchId: 'branch-002',
    componentId: 'textfield-001',
    status: 'pending_review',
    author: { name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/40?img=2' },
    changes: [
      {
        field: 'structure',
        before: 'Error message conditionally rendered with v-if',
        after: 'Error container always in DOM, content toggled with v-show',
        description: 'Ensures aria-describedby target exists at mount time'
      },
      {
        field: 'accessibility',
        before: 'NVDA does not announce error messages',
        after: 'All screen readers (NVDA, JAWS, VoiceOver) announce errors consistently',
        description: 'Fixed a11y issue for NVDA users'
      }
    ],
    reviews: [
      {
        id: 'review-002',
        author: { name: 'Lisa Park', avatar: 'https://i.pravatar.cc/40?img=5' },
        status: 'commented',
        comment: 'Tested with NVDA 2024.4 on Windows 11 — errors are now announced correctly. One question: does the always-present container affect visual layout when there\'s no error?',
        createdAt: '2026-01-30T11:00:00Z'
      }
    ],
    createdAt: '2026-01-25T14:30:00Z',
    updatedAt: '2026-01-30T11:00:00Z'
  },
  {
    id: 'contrib-003',
    title: 'Add dark mode elevation tokens',
    description: 'Introduces dark-mode-specific shadow and elevation tokens. In dark mode, traditional box-shadows are invisible, so this PR uses a combination of border + subtle lighter box-shadow to create visual depth without relying on darkening against a dark background.',
    branchId: 'branch-003',
    componentId: 'token-001',
    status: 'pending_review',
    author: { name: 'Jordan Kim', avatar: 'https://i.pravatar.cc/40?img=3' },
    changes: [
      {
        field: 'tokens',
        before: 'Single set of elevation tokens (light mode only)',
        after: '6 new dark-mode elevation tokens using border + subtle shadow',
        description: 'Elevation visible on dark backgrounds'
      },
      {
        field: 'docs',
        before: 'No dark mode elevation guidance',
        after: 'Added usage guide comparing light vs dark elevation strategies',
        description: 'Documentation for dark mode elevation patterns'
      }
    ],
    reviews: [
      {
        id: 'review-003',
        author: { name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/40?img=2' },
        status: 'commented',
        comment: 'The border approach looks clean. Can you add elevation.shadow.overlay for modal backdrops too?',
        createdAt: '2026-02-04T14:00:00Z'
      }
    ],
    createdAt: '2026-01-30T09:30:00Z',
    updatedAt: '2026-02-04T14:00:00Z'
  },
  {
    id: 'contrib-004',
    title: 'Fix Lozenge "moved" appearance contrast ratio',
    description: 'The yellow "moved" appearance on Lozenge had a 3.8:1 contrast ratio (below WCAG AA 4.5:1). This PR darkens the text color from #7A6400 to #5E4D00 to achieve 5.2:1 contrast. Applied to both bold and subtle variants.',
    branchId: 'branch-004',
    componentId: 'lozenge-001',
    status: 'approved',
    author: { name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/40?img=2' },
    changes: [
      {
        field: 'styles',
        before: 'moved text color: #7A6400 (3.8:1 contrast ratio)',
        after: 'moved text color: #5E4D00 (5.2:1 contrast ratio)',
        description: 'WCAG AA compliance for moved appearance'
      },
      {
        field: 'tests',
        before: 'No contrast ratio tests',
        after: 'Added automated contrast ratio checks in visual regression suite',
        description: 'Prevent future contrast regressions'
      }
    ],
    reviews: [
      {
        id: 'review-004',
        author: { name: 'Lisa Park', avatar: 'https://i.pravatar.cc/40?img=5' },
        status: 'approved',
        comment: 'Verified with axe-core and manual testing. All appearances now pass WCAG AA. The automated contrast tests are a great addition.',
        createdAt: '2026-02-05T10:00:00Z'
      }
    ],
    createdAt: '2026-02-02T11:30:00Z',
    updatedAt: '2026-02-05T10:00:00Z'
  },
  {
    id: 'contrib-005',
    title: 'Fix Modal scrollbar layout shift on Windows',
    description: 'When a Modal opens, hiding the page scrollbar on Windows causes a ~17px layout shift because Windows shows persistent scrollbars. This PR implements `scrollbar-gutter: stable` for modern browsers and a JS fallback that compensates with padding-right on the body element.',
    branchId: 'branch-005',
    componentId: 'modal-001',
    status: 'pending_review',
    author: { name: 'Marcus Johnson', avatar: 'https://i.pravatar.cc/40?img=8' },
    changes: [
      {
        field: 'styles',
        before: 'Body overflow: hidden on modal open (causes layout shift)',
        after: 'scrollbar-gutter: stable + JS padding-right fallback',
        description: 'Eliminated layout shift when modal opens on Windows'
      },
      {
        field: 'tests',
        before: 'No cross-browser scrollbar tests',
        after: 'Added Playwright tests for scrollbar handling on Windows/macOS',
        description: 'Visual regression tests for scrollbar behavior'
      }
    ],
    reviews: [],
    createdAt: '2026-02-01T08:30:00Z',
    updatedAt: '2026-02-01T08:30:00Z'
  },
  {
    id: 'contrib-006',
    title: 'Add responsive typography using clamp()',
    description: 'Replaces fixed pixel values in the typography scale with fluid typography using CSS clamp(). Heading levels scale down gracefully on mobile viewports without media query breakpoints.',
    branchId: 'branch-main',
    componentId: 'typo-001',
    status: 'merged',
    author: { name: 'Jordan Kim', avatar: 'https://i.pravatar.cc/40?img=3' },
    changes: [
      {
        field: 'tokens',
        before: 'h1: 32px, h2: 28px, h3: 24px (fixed)',
        after: 'h1: clamp(24px, 2vw + 16px, 32px), h2: clamp(20px, 1.5vw + 14px, 28px)',
        description: 'Fluid typography for all heading levels'
      },
      {
        field: 'docs',
        before: 'Fixed size documentation',
        after: 'Updated docs with responsive sizing examples and viewport breakpoints',
        description: 'Documentation for fluid typography behavior'
      }
    ],
    reviews: [
      {
        id: 'review-005',
        author: { name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/40?img=2' },
        status: 'approved',
        comment: 'Beautiful implementation. The clamp() approach eliminates the need for media queries entirely. Tested on viewport widths from 320px to 1440px.',
        createdAt: '2026-01-12T10:00:00Z'
      }
    ],
    createdAt: '2026-01-08T11:00:00Z',
    updatedAt: '2026-01-14T09:00:00Z'
  },
  {
    id: 'contrib-007',
    title: 'Deprecate Dropdown Menu with migration guide',
    description: 'Marks the Dropdown Menu component as deprecated with console warnings in development mode. Includes a comprehensive migration guide showing how to replace Dropdown Menu usage with the new Popup + Menu composition pattern.',
    branchId: 'branch-main',
    componentId: 'dropdown-001',
    status: 'rejected',
    author: { name: 'Alex Rivera', avatar: 'https://i.pravatar.cc/40?img=1' },
    changes: [
      {
        field: 'docs',
        before: 'No deprecation notice',
        after: 'Added deprecation banner, console warning, and migration guide',
        description: 'Deprecation documentation and developer warnings'
      }
    ],
    reviews: [
      {
        id: 'review-006',
        author: { name: 'Marcus Johnson', avatar: 'https://i.pravatar.cc/40?img=8' },
        status: 'changes_requested',
        comment: 'The migration guide is solid, but we need to coordinate the deprecation timeline with the Jira and Confluence teams first. They still have 28 instances of Dropdown Menu in production. Let\'s set a deprecation date of v4.0 instead of immediate.',
        createdAt: '2026-02-06T14:00:00Z'
      }
    ],
    createdAt: '2026-02-03T10:00:00Z',
    updatedAt: '2026-02-06T14:00:00Z'
  }
]
