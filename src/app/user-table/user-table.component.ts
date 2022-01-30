import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { select, Store } from '@ngrx/store';
import { debounceTime, switchMap } from 'rxjs/operators';
import { loadGithubUsersAction } from '../+state/github.actions';
import { selectAllGithubUsers, selectGithubUsersCount, selectGithubUsersError } from '../+state/github.reducer';
import { GithubUser } from '../github-user.api';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;
  githubUsers: GithubUser[];
  currentTotal = 0;
  columns: string[] = ['id', 'login', 'score', 'type', 'url'];
  dataSource: MatTableDataSource<GithubUser>;
  searchControl = new FormControl();

  constructor(public store: Store, private _snackBar: MatSnackBar) {
    this.store
      .pipe(
        select(selectAllGithubUsers)
      )
      .subscribe((users) => {
        if (users && users.length) {
          this.githubUsers = users;
          this.dataSource = new MatTableDataSource(this.githubUsers);
          this.dataSource.paginator = this.paginator;
        }
      });

    this.store
      .pipe(
        select(selectGithubUsersCount)
      )
      .subscribe((count) => {
        this.currentTotal = count;
      });  

    this.store
      .pipe(
        select(selectGithubUsersError)
      )
      .subscribe((error) => {
        this.githubUsers = [];
        this.currentTotal = 0;
        this._snackBar.open(error.message);
      });        
  }

  ngOnInit(): void {
    this.store.dispatch(loadGithubUsersAction({ search: { userName: 'lisa'}}));
    this.searchControl.valueChanges.pipe(
      debounceTime(500),
    ).subscribe(searchValue => {
      this.store.dispatch(loadGithubUsersAction({ search: { userName: searchValue }}));  
    });
  }

  onRowClick(row: GithubUser) {
    window.open(row.html_url, "_blank");
  }

}


