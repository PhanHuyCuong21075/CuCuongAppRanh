import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {FRIEND_ENDPOINT, LOGIN_ENDPOINT, POST_ENDPOINT, ROLE_ENDPOINT} from '../../enum/EApiUrl';
import {environment} from '../../../../environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class FetchApiService {

  private baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) {
  }

  get(strUrl: string, param?: any): Observable<any> {
    return this.http.get(strUrl, {
      params: param,
      responseType: "json",
    });
  }

  post(strUrl: string, paramBody?: any, param?: any): Observable<any> {
    return this.http.post(strUrl, paramBody, {
      params: param,
      responseType: "json",
    });
  }

  put(strUrl: string, paramBody?: any, param?: any): Observable<any> {
    return this.http.put(strUrl, paramBody, {
      params: param,
      responseType: "json",
    });
  }

  delete(strUrl: string, param?: any): Observable<any> {
    return this.http.delete(strUrl, {
      params: param,
      responseType: "json",
    });
  }

  uploadFile(strUrl: string, params: any): Observable<any> {
    return this.http.post(strUrl, params);
  }


  doLogin(params: any): Observable<any> {
    const url = `${this.baseUrl}${LOGIN_ENDPOINT.LOGIN}`;
    return this.http.post(url, params, {responseType: 'json'});
  }
  getRoles() {
    return this.http.get(`${this.baseUrl}${ROLE_ENDPOINT.GET_ROLES}`);
  }

  doRegister(params: any): Observable<any> {
    const url = `${this.baseUrl}${LOGIN_ENDPOINT.REGISTER}`;
    return this.http.post(url, params, {responseType: 'json'});
  }


  getFriends(username: string): Observable<any> {
    const url = `${this.baseUrl}${FRIEND_ENDPOINT.GET_FRIENDS}/${username}`;
    return this.http.get(url, { responseType: 'json' });
  }

  getSuggestedFriends(username: string): Observable<any> {
    const url = `${this.baseUrl}${FRIEND_ENDPOINT.SUGGEST_FRIENDS}/${username}`;
    return this.http.get(url, { responseType: 'json' });
  }

  createPost(params: any): Observable<any> {
    const url = `${this.baseUrl}${POST_ENDPOINT.CREATE}`;
    return this.http.post(url, params, {responseType: 'json'});
  }

  getPosts(username: string): Observable<any> {
    const url = `${this.baseUrl}${POST_ENDPOINT.GET_ALL}`;
    const body = { username: username };
    return this.http.post(url, body, { responseType: 'json' });
  }

  deletePost(id: number): Observable<any> {
    const url = `${this.baseUrl}${POST_ENDPOINT.DELETE}/${id}`;
    return this.http.delete(url, { responseType: 'json' });
  }

  updatePost(id: number, postData: any): Observable<any> {
    const url = `${this.baseUrl}${POST_ENDPOINT.UPDATE}/${id}`;
    return this.http.put(url, postData, { responseType: 'json' });
  }

}
