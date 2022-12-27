import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  //  For Password Hide Component
  hide: any;

  //  Create a object login and set the values null for accesing token
  loginData = {
    username: '',
    password: '',
  };

  //  Constructor For LoginService (For Login User)
  //  Constructor For Matsnackbar for showing alert
  //  Constructor For Router
  constructor(
    private snack: MatSnackBar,
    private login: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  //  Form Submit Function
  formSubmit() {
    // console.log('Login Button Clicked');

    //  If all fields are empty
    if (
      (this.loginData.username == '' || this.loginData.username == null) &&
      (this.loginData.password == '' || this.loginData.password == null)
    ) {
      this.snack.open('All fields are required !!', 'ok', {
        duration: 3000,
      });
      return;
    }

    // Check the username is empty or not
    else if (this.loginData.username == '' || this.loginData.username == null) {
      this.snack.open('Username is Required !!', 'ok', {
        duration: 3000,
      });
      return;
    }

    // Check the password is empty or not
    else if (this.loginData.password == '' || this.loginData.password == null) {
      this.snack.open('Password is Required !!', 'ok', {
        duration: 3000,
      });
      return;
    }

    // Request to Server to generate token
    this.login.generateToken(this.loginData).subscribe(
      (data: any) => {
        //  For Success
        // alert('Success');
        // console.log(data);

        //  After Login
        this.login.loginUser(data.token);

        this.login.getCurrentUser().subscribe((user: any) => {
          this.login.setUser(user);
          // console.log(user);

          // Redirect the Admin Dashboard if User is Admin
          if (this.login.getUserRole() == 'ADMIN') {
            //  Admin DashBoard
            // window.location.href='/admin';
            this.router.navigate(['admin']);
            this.login.loginStatusSubject.next(true);
          }
          // Otherwise Redirect User Dahsboard if User is Normal
          else if (this.login.getUserRole() == 'NORMAL') {
            //  Normal User Dashboard
            // window.location.href='/user-dashboard';
            this.router.navigate(['user-dashboard']);
            this.login.loginStatusSubject.next(true);
          }
          //  Else Logout and Reload
          else {
            this.login.logout();
            location.reload();
          }
        });
      },

      //  For error
      (error) => {
        //  If the user is not registered then will show error

        // console.log('Error !');
        // console.log(error);

        this.snack.open('This user does not exist', 'ok', {
          duration: 3000,
        });
      }
    );
  }
}
