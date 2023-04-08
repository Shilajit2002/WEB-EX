import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  //  Variables
  isLoggedIn = false;
  user = null;

  //  Constructor for LoginSerivce
  //  Constructor for Router
  constructor(public login: LoginService, public router: Router) {}

  ngOnInit(): void {
    //  Set the value if user is logged in
    this.isLoggedIn = this.login.isLoggedIn();
    //  Set the value of user
    this.user = this.login.getUser();

    //  Set the login status if user is logged in the will show logout button and user name
    this.login.loginStatusSubject.asObservable().subscribe((data) => {
      this.isLoggedIn = this.login.isLoggedIn();
      this.user = this.login.getUser();
    });
  }

  //  Logout Method
  public logout() {
    //  Logout the user
    this.login.logout();

    // this.isLoggedIn = false;
    // this.user = null;

    //  Reload the Window
    window.location.reload();
  }

  //  Dashboard Method
  public dashboard() {
    //  If the user is admin the if User click on its name then it will redirect ADMIN
    if (this.login.getUserRole() == 'ADMIN') {
      this.router.navigate(['admin']);
    }
    //  Otherwise Normal User page
    else if (this.login.getUserRole() == 'NORMAL') {
      this.router.navigate(['user-dashboard']);
    }
  }

  //  Profile Method
  public profiledash() {
    //  If the user is admin the if User click on its name then it will redirect ADMIN
    if (this.login.getUserRole() == 'ADMIN') {
      this.router.navigate(['admin/profile']);
    }
    //  Otherwise Normal User page
    else if (this.login.getUserRole() == 'NORMAL') {
      this.router.navigate(['user-dashboard/profile']);
    }
  }
}
