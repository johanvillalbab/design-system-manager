import type { 
  GitHubRepoInfo, 
  GitHubContent, 
  GitHubIssue, 
  GitHubRelease 
} from '@/types/api'
import { cache } from './cache'

const BASE_URL = 'https://api.github.com'
const REPO_OWNER = 'ant-design'
const REPO_NAME = 'ant-design'

const CACHE_TTL = 10 * 60 * 1000 // 10 minutes

// Components that should be excluded (internal/utility folders)
const EXCLUDED_COMPONENTS = [
  '__tests__',
  '_util',
  'locale',
  'style',
  'theme',
  'version',
  'config-provider',
  'app'
]

async function fetchGitHub<T>(endpoint: string, cacheKey: string): Promise<T> {
  // Check cache first
  const cached = cache.get<T>(cacheKey)
  if (cached) {
    return cached
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })

  if (!response.ok) {
    if (response.status === 403) {
      throw new Error('GitHub API rate limit exceeded. Please try again later.')
    }
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
  }

  const data = await response.json() as T
  
  // Cache the response
  cache.set(cacheKey, data, CACHE_TTL)
  
  return data
}

export const githubService = {
  /**
   * Get repository information (stars, issues count, etc.)
   */
  async getRepoInfo(): Promise<GitHubRepoInfo> {
    return fetchGitHub<GitHubRepoInfo>(
      `/repos/${REPO_OWNER}/${REPO_NAME}`,
      'github_repo_info'
    )
  },

  /**
   * Get list of components from the /components directory
   */
  async getComponentsList(): Promise<GitHubContent[]> {
    const contents = await fetchGitHub<GitHubContent[]>(
      `/repos/${REPO_OWNER}/${REPO_NAME}/contents/components`,
      'github_components_list'
    )

    // Filter to only directories and exclude internal folders
    return contents.filter(
      item => item.type === 'dir' && !EXCLUDED_COMPONENTS.includes(item.name)
    )
  },

  /**
   * Get open issues for the repository
   */
  async getOpenIssues(perPage: number = 30): Promise<GitHubIssue[]> {
    return fetchGitHub<GitHubIssue[]>(
      `/repos/${REPO_OWNER}/${REPO_NAME}/issues?state=open&per_page=${perPage}`,
      `github_issues_${perPage}`
    )
  },

  /**
   * Get bug issues (for audit page)
   */
  async getBugIssues(perPage: number = 30): Promise<GitHubIssue[]> {
    return fetchGitHub<GitHubIssue[]>(
      `/repos/${REPO_OWNER}/${REPO_NAME}/issues?state=open&labels=bug&per_page=${perPage}`,
      `github_bugs_${perPage}`
    )
  },

  /**
   * Get feature request issues (for requests page)
   */
  async getFeatureRequests(perPage: number = 30): Promise<GitHubIssue[]> {
    return fetchGitHub<GitHubIssue[]>(
      `/repos/${REPO_OWNER}/${REPO_NAME}/issues?state=open&labels=Feature%20Request&per_page=${perPage}`,
      `github_features_${perPage}`
    )
  },

  /**
   * Get issues by specific labels
   */
  async getIssuesByLabels(labels: string[], perPage: number = 30): Promise<GitHubIssue[]> {
    const labelsParam = labels.map(l => encodeURIComponent(l)).join(',')
    return fetchGitHub<GitHubIssue[]>(
      `/repos/${REPO_OWNER}/${REPO_NAME}/issues?state=open&labels=${labelsParam}&per_page=${perPage}`,
      `github_issues_labels_${labels.join('_')}_${perPage}`
    )
  },

  /**
   * Get closed issues (for resolved metrics)
   */
  async getClosedIssues(perPage: number = 30): Promise<GitHubIssue[]> {
    return fetchGitHub<GitHubIssue[]>(
      `/repos/${REPO_OWNER}/${REPO_NAME}/issues?state=closed&per_page=${perPage}&sort=updated&direction=desc`,
      `github_closed_${perPage}`
    )
  },

  /**
   * Get all issue labels from repository
   */
  async getLabels(): Promise<Array<{ name: string; color: string; description: string | null }>> {
    return fetchGitHub<Array<{ name: string; color: string; description: string | null }>>(
      `/repos/${REPO_OWNER}/${REPO_NAME}/labels?per_page=100`,
      'github_labels'
    )
  },

  /**
   * Get recent releases
   */
  async getReleases(perPage: number = 10): Promise<GitHubRelease[]> {
    return fetchGitHub<GitHubRelease[]>(
      `/repos/${REPO_OWNER}/${REPO_NAME}/releases?per_page=${perPage}`,
      `github_releases_${perPage}`
    )
  },

  /**
   * Get component details (README content) - optional for future use
   */
  async getComponentReadme(componentName: string): Promise<string | null> {
    try {
      const response = await fetch(
        `${BASE_URL}/repos/${REPO_OWNER}/${REPO_NAME}/contents/components/${componentName}/index.en-US.md`,
        {
          headers: {
            'Accept': 'application/vnd.github.raw+json',
            'X-GitHub-Api-Version': '2022-11-28'
          }
        }
      )

      if (!response.ok) return null
      return await response.text()
    } catch {
      return null
    }
  },

  /**
   * Clear the GitHub cache
   */
  clearCache(): void {
    cache.remove('github_repo_info')
    cache.remove('github_components_list')
    cache.remove('github_issues_30')
    cache.remove('github_releases_10')
    cache.remove('github_bugs_30')
    cache.remove('github_features_30')
    cache.remove('github_closed_30')
    cache.remove('github_labels')
  }
}
