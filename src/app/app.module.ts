import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserTableComponent } from './user-table/user-table.component';
import { GithubUsersEffects } from './+state/github.effects';
import { githubUsersReducer } from './+state/github.reducer';

@NgModule({
  declarations: [
    AppComponent,
    UserTableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule, 
    StoreModule.forRoot({ githubUsers: githubUsersReducer }, {}),
    EffectsModule.forRoot([GithubUsersEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
