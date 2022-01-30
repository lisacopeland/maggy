import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { GithubUserService } from '../github-user.service';
import { githubUsersErrorAction, loadGithubUsersAction, setGithubUsersAction } from './github.actions';

@Injectable()
export class GithubUsersEffects {
    concurrentRequests = 5;

    loadGithubUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadGithubUsersAction),
            mergeMap((action) =>
                this.service.query(action.search.userName).pipe(
                    map(response => setGithubUsersAction({ payload: response })),
                    catchError(error => of(githubUsersErrorAction({ payload: error })))
                )
            )
        )
    );

    constructor(
        public service: GithubUserService,
        public actions$: Actions
    ) { }
}