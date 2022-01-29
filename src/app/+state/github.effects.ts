import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { GithubUserService } from '../github-user.service';
import { loadGithubUsersAction, setGithubUsersAction } from './github.actions';

@Injectable()
export class GithubUsersEffects {
    concurrentRequests = 5;

    loadGithubUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadGithubUsersAction),
            mergeMap((action) => {
                return this.service.query(action.search.userName).pipe(
                    map((response) => {
                        return setGithubUsersAction({ payload: response });
                    })
                );
            }, this.concurrentRequests)
        )
    );

    constructor(
        public service: GithubUserService,
        public actions$: Actions
    ) { }
}