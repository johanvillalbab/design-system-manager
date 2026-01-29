import type { Branch, Contribution } from '@/types'

export const mockBranches: Branch[] = [
  {
    id: 'branch-main',
    name: 'main',
    componentId: 'btn-001',
    basedOn: '3.2.1',
    author: { name: 'Design System Team', avatar: 'https://i.pravatar.cc/40?img=70' },
    createdAt: '2025-01-01T00:00:00Z',
    isDefault: true
  },
  {
    id: 'branch-001',
    name: 'feat/icon-button-variant',
    componentId: 'btn-001',
    basedOn: '3.2.1',
    author: { name: 'Alex Rivera', avatar: 'https://i.pravatar.cc/40?img=1' },
    createdAt: '2026-01-20T10:00:00Z',
    isDefault: false
  },
  {
    id: 'branch-002',
    name: 'fix/input-focus-ring',
    componentId: 'inp-001',
    basedOn: '2.4.0',
    author: { name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/40?img=2' },
    createdAt: '2026-01-22T14:00:00Z',
    isDefault: false
  },
  {
    id: 'branch-003',
    name: 'feat/card-skeleton',
    componentId: 'card-001',
    basedOn: '1.8.0',
    author: { name: 'Jordan Kim', avatar: 'https://i.pravatar.cc/40?img=3' },
    createdAt: '2026-01-18T09:00:00Z',
    isDefault: false
  }
]

export const mockContributions: Contribution[] = [
  {
    id: 'contrib-001',
    title: 'Add icon-only button variant',
    description: 'This PR adds a new icon-only variant for the Button component. Useful for toolbar actions and compact UIs. Includes proper accessibility with aria-label requirement.',
    branchId: 'branch-001',
    componentId: 'btn-001',
    status: 'pending_review',
    author: { name: 'Alex Rivera', avatar: 'https://i.pravatar.cc/40?img=1' },
    changes: [
      {
        field: 'variants',
        before: '4 variants: primary, secondary, ghost, danger',
        after: '5 variants: primary, secondary, ghost, danger, icon-only',
        description: 'Added new icon-only variant for compact buttons'
      },
      {
        field: 'props',
        before: 'No aria-label prop',
        after: 'Added optional aria-label prop (required for icon-only)',
        description: 'Accessibility support for icon-only buttons'
      }
    ],
    reviews: [
      {
        id: 'review-001',
        author: { name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/40?img=2' },
        status: 'commented',
        comment: 'Looks good! Can you add an example showing the icon-only variant in a toolbar context?',
        createdAt: '2026-01-22T11:00:00Z'
      }
    ],
    createdAt: '2026-01-20T10:30:00Z',
    updatedAt: '2026-01-22T11:00:00Z'
  },
  {
    id: 'contrib-002',
    title: 'Fix focus ring visibility in dark mode',
    description: 'The focus ring on Input fields was barely visible in dark mode. This PR adjusts the ring color and opacity for better accessibility compliance.',
    branchId: 'branch-002',
    componentId: 'inp-001',
    status: 'approved',
    author: { name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/40?img=2' },
    changes: [
      {
        field: 'styles',
        before: 'focus:ring-accent-500/20',
        after: 'focus:ring-accent-500/40 dark:focus:ring-accent-400/50',
        description: 'Increased focus ring opacity for dark mode'
      }
    ],
    reviews: [
      {
        id: 'review-002',
        author: { name: 'Marcus Johnson', avatar: 'https://i.pravatar.cc/40?img=8' },
        status: 'approved',
        comment: 'Great fix! Tested on both themes and it looks perfect now.',
        createdAt: '2026-01-23T15:00:00Z'
      }
    ],
    createdAt: '2026-01-22T14:30:00Z',
    updatedAt: '2026-01-23T15:00:00Z'
  },
  {
    id: 'contrib-003',
    title: 'Add skeleton loading state to Card',
    description: 'Implements a skeleton loading variant for Card component. Uses CSS animations for the shimmer effect. No external dependencies added.',
    branchId: 'branch-003',
    componentId: 'card-001',
    status: 'pending_review',
    author: { name: 'Jordan Kim', avatar: 'https://i.pravatar.cc/40?img=3' },
    changes: [
      {
        field: 'variants',
        before: 'Standard card only',
        after: 'Standard + skeleton loading variant',
        description: 'New skeleton variant for loading states'
      },
      {
        field: 'props',
        before: 'No loading prop',
        after: 'Added isLoading: boolean prop',
        description: 'Toggle skeleton state'
      },
      {
        field: 'styles',
        before: 'No animation',
        after: 'Added shimmer keyframe animation',
        description: 'CSS shimmer effect for skeleton'
      }
    ],
    reviews: [],
    createdAt: '2026-01-18T09:30:00Z',
    updatedAt: '2026-01-18T09:30:00Z'
  },
  {
    id: 'contrib-004',
    title: 'Update typography scale documentation',
    description: 'Updated the Typography component docs to include real-world examples and added a visual type scale chart.',
    branchId: 'branch-main',
    componentId: 'typo-001',
    status: 'merged',
    author: { name: 'Lisa Park', avatar: 'https://i.pravatar.cc/40?img=5' },
    changes: [
      {
        field: 'docs',
        before: 'Basic token list',
        after: 'Full documentation with examples and visual scale',
        description: 'Enhanced typography documentation'
      }
    ],
    reviews: [
      {
        id: 'review-003',
        author: { name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/40?img=2' },
        status: 'approved',
        comment: 'The visual scale chart is really helpful. Great work!',
        createdAt: '2026-01-15T10:00:00Z'
      }
    ],
    createdAt: '2026-01-12T11:00:00Z',
    updatedAt: '2026-01-16T09:00:00Z'
  },
  {
    id: 'contrib-005',
    title: 'Deprecate legacy color tokens',
    description: 'This PR marks the old color tokens as deprecated and adds migration notes. The legacy tokens will be removed in v4.0.',
    branchId: 'branch-main',
    componentId: 'color-001',
    status: 'rejected',
    author: { name: 'David Chen', avatar: 'https://i.pravatar.cc/40?img=12' },
    changes: [
      {
        field: 'docs',
        before: 'No deprecation notice',
        after: 'Added deprecation warnings and migration guide',
        description: 'Deprecation documentation'
      }
    ],
    reviews: [
      {
        id: 'review-004',
        author: { name: 'Marcus Johnson', avatar: 'https://i.pravatar.cc/40?img=8' },
        status: 'changes_requested',
        comment: 'We need to coordinate this with the Mobile App team first. They\'re still using the legacy tokens heavily.',
        createdAt: '2026-01-19T14:00:00Z'
      }
    ],
    createdAt: '2026-01-17T10:00:00Z',
    updatedAt: '2026-01-19T14:00:00Z'
  }
]
