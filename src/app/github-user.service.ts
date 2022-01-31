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
  query(search: string = '', page = 0, pageSize = 10
  ): Observable<GitHubUserResponse> {
    let params = new HttpParams();
    params = params.append('q', search);
    params = params.append('page', page.toString());
    params = params.append('per_page', pageSize.toString());

    return this.http.get<GitHubUserResponse>(this.baseUrl, { params }).pipe(
      map((res) => {
        return res;
      })
    );
  }

}
