import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from "./User";

const jwt = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private uriseg = 'http://localhost:4242/api';
  currentUser = {};

  constructor(private http: HttpClient, public router: Router) { }

  public register(userData: any): Observable<any> {
    const URI = this.uriseg + '/register';
    return this.http.post(URI, userData);
  }

  public login(user: User) {
    const URI = this.uriseg + '/login';
    // console.log(user,'test');
    return this.http.post(URI, user, {responseType: 'text'})
    .subscribe((res: any) => {
      // console.log(res,'logiiin');
      localStorage.setItem('auth-token', res)
      this.getUserProfile(res).subscribe((res) => {
        // console.log(res._id,'teeeeeest');
        this.currentUser = res;
        this.router.navigate(['profil/' + res._id]);
      })
    })
  }

  logout() {
    if (localStorage.removeItem('auth-token') == null) {
      this.router.navigate(['/login']);
    }
  }

  getAccessToken() {
    return localStorage.getItem('auth-token');
  }

  isLoggedIn(): boolean {
    let authToken = localStorage.getItem('auth-token');
    return (authToken !== null) ? true : false;
  }
  
  addFriend(a) {
    const URI = this.uriseg + '/addFriend';
    console.log(a,'requete addFriend');
    
    return this.http.post(URI, a, {responseType: 'text'})
    .subscribe((res: any) => {
      console.log(res,'logiiin');
      // this.getUserProfile(res).subscribe((res) => {
        // console.log(res._id,'teeeeeest');
        this.currentUser = res;
      // })
    })
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

  showFriend(id: string): Observable<User> {
    const URI = this.uriseg + '/friend/' + id;
    return this.http.get(URI).pipe(
      map((res: any)=> {
        console.log(res.data,'dataaa-show');
        return res.data || []
      }) 
    );
  }

  getUserProfile(id): Observable<any> {
    const URI = this.uriseg + '/user/';
    const URITOKEN = this.uriseg + '/post'
    return this.http.get(URITOKEN, {
      headers: new HttpHeaders({ 
        'auth-token': id
      })}).pipe(
      map((res: any)=> {
        // console.log(res,'testtoken');
        return res || []
      }) 
    );
  }

  goProfile(){
    let res = localStorage.getItem('auth-token')
    return this.getUserProfile(res).subscribe((res) => {
      // console.log(res._id,'teeeeeest');
      this.currentUser = res;
      this.router.navigate(['profil/' + res._id]);
    })
  }

  public update(userData: any, id: string): Observable<any> {
    const URI = this.uriseg + '/user/' + id;
    return this.http.put(URI, userData);
  }
}