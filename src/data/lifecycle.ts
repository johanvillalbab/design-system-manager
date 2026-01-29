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
        notes: 'Initial design completed with 4 variants'
      },
      {
        id: 'stage-2',
        type: 'review',
        status: 'completed',
        assignee: { name: 'Design Team', avatar: 'https://i.pravatar.cc/40?img=70' },
        startedAt: '2025-08-16T00:00:00Z',
        completedAt: '2025-08-20T00:00:00Z',
        artifacts: [],
        notes: 'Design review passed with minor feedback'
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
        notes: 'Implemented for Web, iOS, and Android'
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
        notes: '100% test coverage achieved'
      },
      {
        id: 'stage-5',
        type: 'release',
        status: 'completed',
        startedAt: '2025-09-16T00:00:00Z',
        completedAt: '2025-09-16T00:00:00Z',
        artifacts: [],
        notes: 'Released as v3.0.0'
      }
    ]
  },
  'card-001': {
    componentId: 'card-001',
    stages: [
      {
        id: 'stage-1',
        type: 'design',
        status: 'completed',
        assignee: { name: 'Jordan Kim', avatar: 'https://i.pravatar.cc/40?img=3' },
        startedAt: '2025-10-01T00:00:00Z',
        completedAt: '2025-10-10T00:00:00Z',
        artifacts: [
          { type: 'figma', url: 'https://figma.com/file/card', label: 'Card Design' }
        ],
        notes: 'Card with multiple layout options'
      },
      {
        id: 'stage-2',
        type: 'review',
        status: 'completed',
        startedAt: '2025-10-11T00:00:00Z',
        completedAt: '2025-10-13T00:00:00Z',
        artifacts: [],
        notes: 'Approved'
      },
      {
        id: 'stage-3',
        type: 'development',
        status: 'completed',
        assignee: { name: 'Alex Rivera', avatar: 'https://i.pravatar.cc/40?img=1' },
        startedAt: '2025-10-14T00:00:00Z',
        completedAt: '2025-11-01T00:00:00Z',
        artifacts: [
          { type: 'code', url: '#', label: 'Source Code' }
        ],
        notes: 'Web implementation complete'
      },
      {
        id: 'stage-4',
        type: 'testing',
        status: 'in_progress',
        assignee: { name: 'QA Team', avatar: 'https://i.pravatar.cc/40?img=65' },
        startedAt: '2025-11-02T00:00:00Z',
        artifacts: [],
        notes: 'Accessibility testing in progress'
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
  'inp-001': {
    componentId: 'inp-001',
    stages: [
      {
        id: 'stage-1',
        type: 'design',
        status: 'completed',
        completedAt: '2025-07-15T00:00:00Z',
        artifacts: [{ type: 'figma', url: '#', label: 'Input Field Design' }],
        notes: 'Design complete'
      },
      {
        id: 'stage-2',
        type: 'review',
        status: 'completed',
        completedAt: '2025-07-18T00:00:00Z',
        artifacts: [],
        notes: 'Approved'
      },
      {
        id: 'stage-3',
        type: 'development',
        status: 'completed',
        completedAt: '2025-08-01T00:00:00Z',
        artifacts: [{ type: 'code', url: '#', label: 'Source' }],
        notes: 'Complete'
      },
      {
        id: 'stage-4',
        type: 'testing',
        status: 'completed',
        completedAt: '2025-08-05T00:00:00Z',
        artifacts: [],
        notes: 'Passed'
      },
      {
        id: 'stage-5',
        type: 'release',
        status: 'completed',
        completedAt: '2025-08-06T00:00:00Z',
        artifacts: [],
        notes: 'v2.0.0'
      }
    ]
  }
}

export const mockAIMetadata: Record<string, AIMetadata> = {
  'btn-001': {
    summary: 'A versatile button component supporting multiple variants, sizes, and states for primary user actions.',
    keywords: ['button', 'action', 'primary', 'cta', 'click', 'submit', 'form'],
    useCases: [
      'Form submission',
      'Primary call-to-action',
      'Dialog confirmation',
      'Navigation trigger',
      'Toolbar actions'
    ],
    relatedComponents: ['inp-001', 'form-001', 'modal-001'],
    codePatterns: [
      '<Button variant="primary" onClick={handleSubmit}>Submit</Button>',
      '<Button variant="ghost" icon={<Icon />} />',
      '<Button loading disabled>Processing...</Button>'
    ],
    constraints: [
      'Only one primary button per section',
      'Always provide onClick handler',
      'Icon-only buttons require aria-label',
      'Avoid using for navigation (use Link instead)'
    ]
  },
  'card-001': {
    summary: 'A container component for grouping related content with optional header, body, and footer sections.',
    keywords: ['card', 'container', 'panel', 'box', 'content', 'layout'],
    useCases: [
      'Content grouping',
      'Dashboard widgets',
      'List items',
      'Product cards',
      'Profile cards'
    ],
    relatedComponents: ['btn-001', 'badge-001'],
    codePatterns: [
      '<Card><CardHeader>Title</CardHeader><CardBody>Content</CardBody></Card>',
      '<Card variant="elevated" padding="lg" />'
    ],
    constraints: [
      'Avoid nesting cards',
      'Keep content scannable',
      'Use consistent padding across cards in a group'
    ]
  },
  'inp-001': {
    summary: 'A form input component supporting various types, validation states, and accessibility features.',
    keywords: ['input', 'field', 'form', 'text', 'validation', 'label'],
    useCases: [
      'Form fields',
      'Search bars',
      'Data entry',
      'Filters',
      'User input'
    ],
    relatedComponents: ['btn-001', 'form-001'],
    codePatterns: [
      '<Input label="Email" type="email" required />',
      '<Input error="Invalid email" helperText="Enter your work email" />'
    ],
    constraints: [
      'Always provide a label',
      'Show validation state clearly',
      'Link error messages with aria-describedby'
    ]
  }
}

export function getLifecycle(componentId: string): ComponentLifecycle | null {
  return mockLifecycles[componentId] || null
}

export function getAIMetadata(componentId: string): AIMetadata | null {
  return mockAIMetadata[componentId] || null
}
