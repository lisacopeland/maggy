import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GithubUser } from './github-user.api';
import { map } from 'rxjs/operators';

export interface GitHubUserResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GithubUser[];
}

@Injectable({
  providedIn: 'root'
})
export class GithubUserService {

  constructor(private http: HttpClient) { }
  baseUrl = `https://api.github.com/search/users`;
  query(search: string = ''
  ): Observable<GitHubUserResponse> {
    let params = new HttpParams();
    params = params.append('q', search);
    return this.http.get<GitHubUserResponse>(this.baseUrl, { params }).pipe(
      map((res) => {
        return res;
      })
    );
  }

}
