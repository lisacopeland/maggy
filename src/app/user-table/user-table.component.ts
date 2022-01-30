import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { loadGithubUsersAction } from '../+state/github.actions';
import { selectAllGithubUsers } from '../+state/github.reducer';
import { GithubUser } from '../github-user.api';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {

  githubUsers: GithubUser[];
  constructor(public store: Store) {
    this.store
      .pipe(
        select(selectAllGithubUsers)
      )
      .subscribe((users) => {
        console.log('got users : ', users);
        this.githubUsers = users;
      });
  }

  ngOnInit(): void {
    this.store.dispatch(loadGithubUsersAction({ search: { userName: 'lisa'}}));
  }

}


