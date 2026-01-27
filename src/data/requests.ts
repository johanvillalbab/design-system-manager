import type { ComponentRequest } from '@/types'

export const mockRequests: ComponentRequest[] = [
  {
    id: 'req-001',
    title: 'Date Range Picker',
    description: 'A component for selecting date ranges with presets and calendar UI',
    userStory: 'As a user, I want to select a date range so that I can filter reports by time period',
    status: 'in_development',
    priority: 'high',
    votes: 24,
    votedBy: ['user1', 'user2', 'user3'],
    createdAt: '2025-12-15',
    updatedAt: '2026-01-18',
    author: {
      name: 'Emily Watson',
      avatar: 'https://i.pravatar.cc/40?img=5'
    },
    attachments: ['mockup1.png', 'mockup2.png'],
    similarComponents: ['inp-001', 'modal-001'],
    affectedProjects: 5,
    comments: []
  },
  {
    id: 'req-002',
    title: 'Stepper Component',
    description: 'Multi-step progress indicator with clickable steps',
    userStory: 'As a user, I want to see my progress in a multi-step form so that I know how much is left',
    status: 'under_review',
    priority: 'medium',
    votes: 18,
    votedBy: ['user4', 'user5'],
    createdAt: '2026-01-05',
    updatedAt: '2026-01-19',
    author: {
      name: 'Marcus Chen',
      avatar: 'https://i.pravatar.cc/40?img=8'
    },
    attachments: ['stepper-ref.fig'],
    similarComponents: ['tab-001', 'nav-001'],
    affectedProjects: 3,
    comments: []
  },
  {
    id: 'req-003',
    title: 'File Upload Dropzone',
    description: 'Drag and drop file upload with preview and progress',
    userStory: 'As a user, I want to drag files to upload so that the process is faster and more intuitive',
    status: 'submitted',
    priority: 'high',
    votes: 31,
    votedBy: ['user1', 'user6', 'user7', 'user8'],
    createdAt: '2026-01-10',
    updatedAt: '2026-01-10',
    author: {
      name: 'Sophie Kim',
      avatar: 'https://i.pravatar.cc/40?img=9'
    },
    attachments: ['dropzone-example.png'],
    similarComponents: ['btn-001', 'card-001'],
    affectedProjects: 8,
    comments: []
  },
  {
    id: 'req-004',
    title: 'Data Table with Sorting',
    description: 'Advanced table component with sorting, filtering, and pagination',
    userStory: 'As a user, I want to sort and filter table data so that I can find information quickly',
    status: 'ready',
    priority: 'critical',
    votes: 42,
    votedBy: ['user1', 'user2', 'user9', 'user10', 'user11'],
    createdAt: '2025-11-20',
    updatedAt: '2026-01-20',
    author: {
      name: 'David Park',
      avatar: 'https://i.pravatar.cc/40?img=12'
    },
    attachments: ['table-specs.pdf', 'table-mockup.fig'],
    similarComponents: ['card-001'],
    affectedProjects: 12,
    comments: []
  },
  {
    id: 'req-005',
    title: 'Skeleton Loader',
    description: 'Animated placeholder for loading states',
    userStory: 'As a user, I want to see loading placeholders so that I know content is being loaded',
    status: 'submitted',
    priority: 'low',
    votes: 8,
    votedBy: ['user3'],
    createdAt: '2026-01-18',
    updatedAt: '2026-01-18',
    author: {
      name: 'Lisa Johnson',
      avatar: 'https://i.pravatar.cc/40?img=15'
    },
    attachments: [],
    similarComponents: ['card-001', 'empty-001'],
    affectedProjects: 2,
    comments: []
  },
  {
    id: 'req-006',
    title: 'Rich Text Editor',
    description: 'WYSIWYG editor with formatting toolbar',
    userStory: 'As a user, I want to format text with bold, italic, and lists so that I can create rich content',
    status: 'under_review',
    priority: 'medium',
    votes: 15,
    votedBy: ['user12', 'user13'],
    createdAt: '2026-01-02',
    updatedAt: '2026-01-15',
    author: {
      name: 'James Wilson',
      avatar: 'https://i.pravatar.cc/40?img=18'
    },
    attachments: ['editor-ref.png'],
    similarComponents: ['inp-001'],
    affectedProjects: 4,
    comments: []
  },
  {
    id: 'req-007',
    title: 'Accordion Component',
    description: 'Collapsible sections for FAQ and settings',
    userStory: 'As a user, I want to expand and collapse sections so that I can focus on relevant content',
    status: 'in_development',
    priority: 'medium',
    votes: 12,
    votedBy: ['user14', 'user15'],
    createdAt: '2025-12-28',
    updatedAt: '2026-01-17',
    author: {
      name: 'Anna Lee',
      avatar: 'https://i.pravatar.cc/40?img=20'
    },
    attachments: [],
    similarComponents: ['tab-001', 'card-001'],
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
