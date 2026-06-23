import {GitHubUser} from '../Interface/GitHubUsers';
import { Repository } from '../Interface/Repository';
import { RepositoryPayload } from '../Interface/RepositoryOayload';

const GITHUB_API_URL = 'https://api.github.com';
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

interface GithubRepoOwner {
  login: string;
  avatar_url: string;
}

interface GithubRepo {
  name: string;
  owner: GithubRepoOwner;
  description: string | null;
  language: string | null;
}

export const getUserRepos = async (): Promise<GithubRepo[]> => {
  if (!GITHUB_TOKEN) {
    console.warn('VITE_GITHUB_TOKEN no está definido en .env');
    return [];
  }

  try {
    const response = await fetch(`${GITHUB_API_URL}/user/repos?per_page=100`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json'
      }
    });

    if (!response.ok) {
      throw new Error(`Error obtenido repositorios: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return [];
  }
};


export const createRepository = async (repository: RepositoryPayload): Promise<Repository | null> => {
  if (!GITHUB_TOKEN) {
    console.warn('VITE_GITHUB_TOKEN no está definido en .env');
    return null;
  }

  try {
    const response = await fetch(`${GITHUB_API_URL}/user/repos`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: repository.name,
        description: repository.description,
        private: false
      })
    });

    if (!response.ok) {
      throw new Error(`Error creando repositorio: ${response.statusText}`);
    }

    const repoData = await response.json();
    return {
      name: repoData.name,
      owner: repoData.owner?.login ?? '',
      avatarUrl: repoData.owner?.avatar_url ?? '',
      description: repoData.description ?? repository.description,
      language: repoData.language ?? 'N/A'
    };
  } catch (error) {
    console.error('Error creando repositorio:', error);
    return null;
  }
};

export const getUserProfile = async (): Promise<GitHubUser | null> => {
    try {
        const response = await fetch(`${GITHUB_API_URL}/user`, {
            headers: {
                Authorization: `Bearer ${GITHUB_TOKEN}`,
                Accept: 'application/vnd.github+json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error obteniendo perfil: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return null;
    }
};