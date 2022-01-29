import { createAction, props } from '@ngrx/store';
import { GitHubUserResponse } from '../github-user.service';

export const loadGithubUsersAction = createAction(
    'GithubUsers: Load All',
    props<{ search: { userName: string} }>()
);
export const setGithubUsersAction = createAction(
    'GithubUsers: Set All',
    props<{ payload: GitHubUserResponse }>()
);
export const githubUsersErrorAction = createAction(
    'GithubUsers: Error',
    props<{ id: number; error: string }>()
);