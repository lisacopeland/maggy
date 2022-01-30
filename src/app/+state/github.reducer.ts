import {
    createFeatureSelector,
    createReducer,
    createSelector,
    on,
} from '@ngrx/store';

import { GithubUser, mapToGithubUsers } from '../github-user.api';
import { loadGithubUsersAction, setGithubUsersAction, githubUsersErrorAction } from './github.actions';

export interface GithubUsersState {
    githubUsers: GithubUser[];
    errorId: number;
    errorString: string;
    count: number;
}

const initialState: GithubUsersState = {
    githubUsers: [],
    count: 0,
    errorId: -1,
    errorString: ''
};

export const GITHUB_USERS_FEATURE_KEY = 'githubusers';

export const githubUsersReducer = createReducer(
    initialState,
    on(loadGithubUsersAction, (state, action) => {
        const newState = {
            ...state,
            githubUsers: [],
            count: 0,
            errorId: -1,
            errorString: ''
        };
        return newState;
    }),
    on(setGithubUsersAction, (state, action) => {
        const newState = { ...state, githubUsers: action.payload.items, count: action.payload.items.length };
        return newState;
    }),
    on(githubUsersErrorAction, (state, action) => {
        const newState = { ...state, githubUsers: [], count: 0, errorId: action.id, errorString: action.error };
        return newState;
    })
);

export const getGithubUsersState = createFeatureSelector<GithubUsersState>('githubusers');

export const selectAll = createSelector(
    getGithubUsersState,
    (state: GithubUsersState) => state
);

export const selectAllGithubUsers = createSelector(selectAll, (state) =>
    mapToGithubUsers(state.githubUsers));

export const selectGithubUsersCount = createSelector(selectAll, (state) => state.count);