// GitHub API Response Types

export interface GitHubRepoInfo {
  id: number
  name: string
  full_name: string
  description: string
  stargazers_count: number
  forks_count: number
  open_issues_count: number
  watchers_count: number
  updated_at: string
  pushed_at: string
  default_branch: string
  license: {
    key: string
    name: string
  } | null
}

export interface GitHubContent {
  name: string
  path: string
  sha: string
  size: number
  url: string
  html_url: string
  git_url: string
  download_url: string | null
  type: 'file' | 'dir'
}

export interface GitHubIssue {
  id: number
  number: number
  title: string
  state: 'open' | 'closed'
  created_at: string
  updated_at: string
  labels: GitHubLabel[]
  user: GitHubUser
  body: string | null
  comments: number
}

export interface GitHubLabel {
  id: number
  name: string
  color: string
  description: string | null
}

export interface GitHubUser {
  login: string
  id: number
  avatar_url: string
  html_url: string
}

export interface GitHubRelease {
  id: number
  tag_name: string
  name: string
  body: string | null
  draft: boolean
  prerelease: boolean
  created_at: string
  published_at: string
  author: GitHubUser
}

// npm Registry API Response Types

export interface NpmPackageInfo {
  _id: string
  _rev: string
  name: string
  description: string
  'dist-tags': {
    latest: string
    next?: string
    beta?: string
    [key: string]: string | undefined
  }
  versions: Record<string, NpmVersionInfo>
  time: Record<string, string>
  maintainers: NpmMaintainer[]
  repository?: {
    type: string
    url: string
  }
  homepage?: string
  keywords?: string[]
  license?: string
}

export interface NpmVersionInfo {
  name: string
  version: string
  description?: string
  main?: string
  dependencies?: Record<string, string>
  peerDependencies?: Record<string, string>
  devDependencies?: Record<string, string>
}

export interface NpmMaintainer {
  name: string
  email?: string
}

export interface NpmDownloadPoint {
  downloads: number
  start: string
  end: string
  package: string
}

export interface NpmDownloadRange {
  downloads: NpmDailyDownload[]
  start: string
  end: string
  package: string
}

export interface NpmDailyDownload {
  downloads: number
  day: string
}

// Cache types
export interface CacheEntry<T> {
  data: T
  timestamp: number
  expiresAt: number
}
