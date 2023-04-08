import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';

import { _isNumberValue } from '@angular/cdk/coercion';
import { Router } from '@angular/router';

// SweetAlert Import
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  //  For Password Hide Component
  hide: any;

  //  Constructor For userService (For Adding User)
  //  Constructor For Matsnackbar for showing alert
  //  Constructor For Router
  constructor(
    private userService: UserService,
    private snack: MatSnackBar,
    private router: Router
  ) {}

  //  Create a object user and set the values null
  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    profile: '',
  };

  ngOnInit(): void {}

  //  Form Submit Function
  formSubmit() {
    // Declare Characters
    const Capital = /[A-Z]/g;
    const Small = /[a-z]/g;
    const Num = /[0-9]/g;
    const Special = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;

    // console.log(this.user);

    // If all fields are empty
    if (
      (this.user.username == '' || this.user.username == null) &&
      (this.user.password == '' || this.user.password == null) &&
      (this.user.firstName == '' || this.user.firstName == null) &&
      (this.user.lastName == '' || this.user.lastName == null) &&
      (this.user.email == '' || this.user.email == null) &&
      (this.user.phone == '' || this.user.phone == null)
    ) {
      this.snack.open('All fields are required !!', 'ok', {
        duration: 3000,
      });
      return;
    }

    // Check the username is empty or not
    else if (this.user.username == '' || this.user.username == null) {
      // Alert show for required username, click ok its gone..Otherwise it will automaticly gone after 3s
      this.snack.open('Username is required !!', 'ok', {
        // Duration of snack bar
        duration: 3000,
        // Position of Snack bar
        // verticalPosition:'top',
        // Default is bottom
      });
      return;
    }

    // Check the username is valid or not
    else if (
      !this.user.username.match(Small) ||
      !this.user.username.match(Num) ||
      this.user.username.match(Capital) ||
      this.user.username.match(Special) ||
      this.user.username.length < 5
    ) {
      this.snack.open(
        'Username must contain a-z , 0-9 , at least 5 characters !!',
        'ok',
        {
          duration: 4000,
        }
      );
      return;
    }

    // Check the password is empty or not
    else if (this.user.password == '' || this.user.password == null) {
      this.snack.open('Password is required !!', 'ok', {
        duration: 3000,
      });
      return;
    }

    // Check the password is valid or not
    else if (
      !this.user.password.match(Capital) ||
      !this.user.password.match(Small) ||
      !this.user.password.match(Num) ||
      !this.user.password.match(Special) ||
      this.user.password.length < 5
    ) {
      this.snack.open(
        'Password must contain A-Z,a-z,0-9,special characters,at least 5 characters !!',
        'ok',
        {
          duration: 4000,
        }
      );
      return;
    }

    // Check the firstname is empty or not
    else if (this.user.firstName == '' || this.user.firstName == null) {
      this.snack.open('FirstName is required !!', 'ok', {
        duration: 3000,
      });
      return;
    }

    // Check the firstname is correct or not
    else if (
      this.user.firstName[0].toUpperCase() != this.user.firstName[0] ||
      !this.user.firstName.match(Small) ||
      this.user.firstName.match(Num) ||
      this.user.firstName.match(Special)
    ) {
      this.snack.open('First Letter sould be capital for Firstname!!', 'ok', {
        duration: 3000,
      });
      return;
    }

    // Check the lastname is empty or not
    else if (this.user.lastName == '' || this.user.lastName == null) {
      this.snack.open('LastName is required !!', 'ok', {
        duration: 3000,
      });
      return;
    }

    // Check the lastname is correct or not
    else if (
      this.user.lastName[0].toUpperCase() != this.user.lastName[0] ||
      !this.user.lastName.match(Small) ||
      this.user.lastName.match(Num) ||
      this.user.lastName.match(Special)
    ) {
      this.snack.open('First Letter sould be capital for Lastname!!', 'ok', {
        duration: 3000,
      });
      return;
    }

    // Check the email is empty or not
    else if (this.user.email == '' || this.user.email == null) {
      this.snack.open('Email is required !!', 'ok', {
        duration: 3000,
      });
      return;
    }

    // Check the email is valid or not
    else if (
      !this.user.email.match('.com') ||
      !this.user.email.match('@gmail')
    ) {
      this.snack.open('Enter Valid Email Id !!', 'ok', {
        duration: 3000,
      });
      return;
    }

    // Check the phoneno is empty or not
    else if (this.user.phone == '' || this.user.phone == null) {
      this.snack.open('Phone Number is required !!', 'ok', {
        duration: 3000,
      });
      return;
    }

    // Check the phoneno is valid or not
    else if (this.user.phone.length < 12) {
      this.snack.open('Enter Valid PhoneNo. !!', 'ok', {
        duration: 3000,
      });
      return;
    }

    // AddUser: UserService
    this.userService.addUser(this.user).subscribe(
      (data: any) => {
        // For Success
        // console.log(data);
        // alert('Success');
        // Sweetalert
        Swal.fire({
          icon: 'success',
          title: `🎉 Congrats, ${data.firstName} !`,
          text: 'You have successfully Registered in WebEx',
          footer: 'User Id : ' + data.id,
          confirmButtonText: 'Ok',
        }).then((result) => {
          //  After Clicking Ok It will Redirect Login Page
          if (result.isConfirmed) {
            //  After Registration redirect login page
            // window.location.href='/login';
            this.router.navigate(['login']);
          }
          //  if not cliking ok also it will redirect Login Page
          else {
            this.router.navigate(['login']);
          }
        });
      },

      // For Error
      (error) => {
        if (error.username == null) {
          this.snack.open('This user is already Registered', 'ok', {
            duration: 3000,
          });
        }
        // For Another Error
        // console.log(error);
        // alert('Something went wrong');
        else {
          this.snack.open('Something Went Wrong', 'ok', {
            duration: 3000,
          });
        }
      }
    );
  }
}
