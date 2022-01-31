import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { select, Store } from '@ngrx/store';
import { debounceTime, tap } from 'rxjs/operators';
import { loadGithubUsersAction } from '../+state/github.actions';
import { selectAllGithubUsers, selectGithubUsersCount, selectGithubUsersError } from '../+state/github.reducer';
import { GithubUser } from '../github-user.api';
import { MatSnackBar } from '@angular/material/snack-bar';
import { merge, Subscription } from 'rxjs';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('paginator') paginator: MatPaginator;
  githubUsers: GithubUser[];
  currentTotal = 0;
  hasData = false;
  columns: string[] = ['avatar', 'login', 'score', 'type', 'url'];
  dataSource: MatTableDataSource<GithubUser>;
  searchControl = new FormControl();
  private subscription: Subscription = new Subscription();

  constructor(public store: Store, private snackBar: MatSnackBar) {
    this.store
      .pipe(
        select(selectAllGithubUsers)
      )
      .subscribe((users) => {
        if (users && users.length) {
          this.githubUsers = users;
          this.dataSource = new MatTableDataSource(this.githubUsers);
          this.hasData = true;
        } else {
          this.hasData = false;
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
        if (error !== null) {
          this.githubUsers = [];
          this.currentTotal = 0;
          this.snackBar.open(error.message);
        }
      });        
  }

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(750),
    ).subscribe(() => {
      this.paginator.pageIndex = 0;
      this.loadData();
    });
  }

  ngAfterViewInit() {
    this.subscription.add(merge(this.paginator.page).pipe(
      tap(() => this.loadData())
    ).subscribe());
  }

  loadData() {
    this.store.dispatch(loadGithubUsersAction({ payload: { userName: this.searchControl.value, pageNumber: this.paginator.pageIndex, pageSize: this.paginator.pageSize } }));  
  }

  onRowClick(row: GithubUser) {
    window.open(row.html_url, "_blank");
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}


