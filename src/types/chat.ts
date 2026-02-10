// Chat Message Types
export type ChatRole = 'user' | 'assistant'

export interface ChatAction {
  type: 'navigate' | 'filter' | 'trigger'
  label: string
  payload: string
}

export interface ChatMessageData {
  /** Key-value pairs for structured data display */
  items?: { label: string; value: string | number; status?: 'success' | 'warning' | 'danger' | 'info' }[]
  /** List items */
  list?: { text: string; badge?: string; badgeColor?: 'success' | 'warning' | 'danger' | 'info' | 'accent' }[]
}

export interface ChatMessage {
  id: string
  role: ChatRole
  content: string
  timestamp: Date
  actions?: ChatAction[]
  data?: ChatMessageData
}

export interface ChatTrigger {
  command: string
  description: string
  icon: string
  example?: string
}

export interface ChatSuggestion {
  id: string
  label: string
  description: string
  icon: string
  trigger: string
}

export interface ChatConversation {
  id: string
  title: string
  preview: string
  timestamp: Date
  messageCount: number
}
