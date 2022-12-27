import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit {
  //  Category Object
  category = {
    title: '',
    description: '',
  };

  //  Constructor for Matsnack bar & category service & Router
  constructor(
    private _category: CategoryService,
    private _snack: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  //  AddSubject function
  addSubject() {
    //  Check title & description both are empty or not
    if (
      (this.category.title.trim() == '' ||
        this.category.title == null ||
        this.category.title == '') &&
      (this.category.description.trim() == '' ||
        this.category.description == null ||
        this.category.description == '')
    ) {
      //  Show alert
      this._snack.open('All fields are Required !!', 'ok', {
        duration: 3000,
      });
      return;
    }

    //  Check the title is empty or not
    else if (
      this.category.title.trim() == '' ||
      this.category.title == null ||
      this.category.title == ''
    ) {
      //  Show alert
      this._snack.open('Title Required !!', 'ok', {
        duration: 3000,
      });
      return;
    }

    //  Check the description is empty or not
    else if (
      this.category.description.trim() == '' ||
      this.category.description == null ||
      this.category.description == ''
    ) {
      //  Show alert
      this._snack.open('Description Required !!', 'ok', {
        duration: 3000,
      });
      return;
    }

    //  If the all things are done then Add a Category
    this._category.addCategory(this.category).subscribe(
      // For Data
      (data: any) => {
        //  Success Alert
        Swal.fire({
          icon: 'success',
          title: 'Subject is Added',
          confirmButtonText: 'Ok',
        }).then((result) => {
          //  After Clicking Ok It will Redirect View Category Page
          if (result.isConfirmed) {
            this.router.navigate(['admin/categories']);
          }
          //  If Not Clicking Ok also it will Redirect View Category Page
          else {
            this.router.navigate(['admin/categories']);
          }
        });
      },
      //  For error
      (error) => {
        // console.log(error);
        // Show Error Message
        Swal.fire('Error!!', 'Error While Adding Subject', 'error');
      }
    );
  }
}
