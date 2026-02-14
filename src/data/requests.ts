import type { ComponentRequest } from '@/types'

export const mockRequests: ComponentRequest[] = [
  {
    id: 'req-001',
    title: 'Date Picker',
    description: 'A calendar-based date picker component for selecting single dates and date ranges. Should support min/max dates, disabled dates, locale formatting, and keyboard navigation.',
    userStory: 'As a user, I want to pick a date from a visual calendar so that I can accurately select dates without manual input errors',
    status: 'in_development',
    priority: 'critical',
    votes: 47,
    votedBy: ['user1', 'user2', 'user3', 'user9', 'user10'],
    createdAt: '2025-11-08',
    updatedAt: '2026-01-28',
    author: {
      name: 'Emily Watson',
      avatar: 'https://i.pravatar.cc/40?img=9'
    },
    attachments: ['date-picker-spec.fig', 'calendar-interaction.mp4'],
    similarComponents: ['textfield-001', 'modal-001', 'select-001'],
    affectedProjects: 9,
    comments: []
  },
  {
    id: 'req-002',
    title: 'Data Table',
    description: 'An advanced table component with column sorting, row selection, pagination, resizable columns, and inline editing. Should support both client-side and server-side data handling.',
    userStory: 'As a user, I want to sort, filter, and paginate tabular data so that I can efficiently find and manage information in large datasets',
    status: 'ready',
    priority: 'critical',
    votes: 56,
    votedBy: ['user1', 'user2', 'user4', 'user5', 'user11', 'user12'],
    createdAt: '2025-10-15',
    updatedAt: '2026-02-03',
    author: {
      name: 'David Chen',
      avatar: 'https://i.pravatar.cc/40?img=12'
    },
    attachments: ['dynamic-table-spec.pdf', 'table-mockup.fig'],
    similarComponents: ['checkbox-001', 'lozenge-001', 'avatar-001'],
    affectedProjects: 14,
    comments: []
  },
  {
    id: 'req-003',
    title: 'File Upload',
    description: 'Drag-and-drop file upload zone with file type validation, size limits, progress indicators, preview thumbnails, and multi-file support.',
    userStory: 'As a user, I want to drag files to upload them so that the process is fast and intuitive without needing to navigate file dialogs',
    status: 'under_review',
    priority: 'high',
    votes: 34,
    votedBy: ['user1', 'user6', 'user7', 'user8'],
    createdAt: '2025-12-20',
    updatedAt: '2026-01-22',
    author: {
      name: 'Sophie Kim',
      avatar: 'https://i.pravatar.cc/40?img=15'
    },
    attachments: ['dropzone-ref.png'],
    similarComponents: ['btn-001', 'progress-001', 'banner-001'],
    affectedProjects: 7,
    comments: []
  },
  {
    id: 'req-004',
    title: 'Breadcrumbs',
    description: 'A wayfinding component that displays the current page location within a navigational hierarchy. Supports truncation for deep paths, custom separators, and overflow menu for long breadcrumb trails.',
    userStory: 'As a user, I want to see my current location in the site hierarchy so that I can navigate back to parent sections easily',
    status: 'in_development',
    priority: 'high',
    votes: 28,
    votedBy: ['user3', 'user5', 'user13'],
    createdAt: '2025-12-01',
    updatedAt: '2026-01-30',
    author: {
      name: 'Marcus Johnson',
      avatar: 'https://i.pravatar.cc/40?img=8'
    },
    attachments: ['breadcrumb-spec.fig'],
    similarComponents: ['tabs-001', 'nav-001'],
    affectedProjects: 11,
    comments: []
  },
  {
    id: 'req-005',
    title: 'Side Navigation',
    description: 'A vertical navigation component for application sidebars with expandable sections, nested items, active state indicators, and collapse/expand functionality.',
    userStory: 'As a user, I want a persistent side navigation that clearly shows my current location so that I can move between sections efficiently',
    status: 'submitted',
    priority: 'high',
    votes: 38,
    votedBy: ['user2', 'user4', 'user14', 'user15'],
    createdAt: '2026-01-10',
    updatedAt: '2026-01-10',
    author: {
      name: 'Jordan Kim',
      avatar: 'https://i.pravatar.cc/40?img=3'
    },
    attachments: ['sidenav-patterns.fig', 'nav-audit.pdf'],
    similarComponents: ['nav-001', 'tabs-001'],
    affectedProjects: 8,
    comments: []
  },
  {
    id: 'req-006',
    title: 'Progress Tracker',
    description: 'A multi-step progress indicator that shows the current step in a workflow. Supports linear and branching paths, completed/active/pending states, and optional step descriptions.',
    userStory: 'As a user, I want to see my progress through a multi-step process so that I know how many steps remain and can navigate between completed steps',
    status: 'under_review',
    priority: 'medium',
    votes: 19,
    votedBy: ['user6', 'user13'],
    createdAt: '2026-01-05',
    updatedAt: '2026-01-19',
    author: {
      name: 'Alex Rivera',
      avatar: 'https://i.pravatar.cc/40?img=1'
    },
    attachments: ['stepper-reference.fig'],
    similarComponents: ['tabs-001', 'progress-001'],
    affectedProjects: 5,
    comments: []
  },
  {
    id: 'req-007',
    title: 'Tree View',
    description: 'A hierarchical tree component for displaying nested data structures. Supports expand/collapse, drag-and-drop reordering, checkbox selection, and lazy loading of children.',
    userStory: 'As a user, I want to browse a hierarchical file or category structure so that I can find and manage nested items visually',
    status: 'submitted',
    priority: 'medium',
    votes: 15,
    votedBy: ['user7', 'user8'],
    createdAt: '2026-01-18',
    updatedAt: '2026-01-18',
    author: {
      name: 'Lisa Park',
      avatar: 'https://i.pravatar.cc/40?img=5'
    },
    attachments: [],
    similarComponents: ['checkbox-001', 'nav-001'],
    affectedProjects: 4,
    comments: []
  },
  {
    id: 'req-008',
    title: 'Notification Feed',
    description: 'A centralized notification panel that aggregates and displays system, user, and app notifications with read/unread states, grouping, and dismiss actions.',
    userStory: 'As a user, I want a centralized place to see all my notifications so that I don\'t miss important updates across products',
    status: 'submitted',
    priority: 'low',
    votes: 11,
    votedBy: ['user9'],
    createdAt: '2026-02-01',
    updatedAt: '2026-02-01',
    author: {
      name: 'Anna Lee',
      avatar: 'https://i.pravatar.cc/40?img=20'
    },
    attachments: ['notification-patterns.png'],
    similarComponents: ['badge-001', 'avatar-001', 'banner-001'],
    affectedProjects: 6,
    comments: []
  }
]

export const requestStats = {
  total: mockRequests.length,
  submitted: mockRequests.filter(r => r.status === 'submitted').length,
  underReview: mockRequests.filter(r => r.status === 'under_review').length,
  inDevelopment: mockRequests.filter(r => r.status === 'in_development').length,
  ready: mockRequests.filter(r => r.status === 'ready').length
}
