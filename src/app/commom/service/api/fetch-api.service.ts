import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {FRIEND_ENDPOINT, LOGIN_ENDPOINT} from '../../enum/EApiUrl';
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

}
