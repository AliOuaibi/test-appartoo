import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from "../common/user";
import * as moment from 'moment';

const jwt = new JwtHelperService();


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private uriseg = 'http://localhost:4242/api';
  private decodedToken;

  constructor(private http: HttpClient) { }

  public register(userData: any): Observable<any> {
    const URI = this.uriseg + '/register';
    return this.http.post(URI, userData);
  }

  public login(userData: any): Observable<any> {
    const URI = this.uriseg + '/login';
    return this.http.post(URI, userData).pipe(map(token => {  
      console.log(token,'token');
      console.log(token,'token');

      return this.saveToken(token);
    }));
  }

  private saveToken(token: any): any {
    this.decodedToken = jwt.decodeToken(token);
    localStorage.setItem('auth_tkn', token);
    localStorage.setItem('auth_meta', JSON.stringify(this.decodedToken));
    return token;
  }

  list(): Observable<User[]> {
    const URI = this.uriseg + '/users';
    return this.http.get(URI).pipe(
      map((res: any)=> {
        // console.log(res,'dataaa');
        
        return res.data || []
      }) 
    );
  }

  show(id: string): Observable<User> {
    const URI = this.uriseg + '/user/' + id;
    return this.http.get(URI).pipe(
      map((res: any)=> {
        // console.log(res.data,'dataaa-show');
        return res.data || []
      }) 
    );
  }

  public update(userData: any, id: string): Observable<any> {
    const URI = this.uriseg + '/user/' + id;
    return this.http.put(URI, userData);
  }
}