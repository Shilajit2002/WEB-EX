import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  // Add User
  public addUser(user: any) {
    // Return the user details from backend server which is baseurl
    return this.http.post(`${baseUrl}/user/`,user);
  }
}
