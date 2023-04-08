import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css'],
})
export class UpdateCategoryComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _cat: CategoryService,
    private _snack: MatSnackBar,
    private router: Router
  ) {}

  //  Set the default value
  cid = 0;
  category: any;

  ngOnInit(): void {
    this.cid = this._route.snapshot.params['cid'];

    //  get the Category Data
    this._cat.getCategory(this.cid).subscribe(
      //  For Data
      (data: any) => {
        this.category = data;
      },
      //  For Error
      (error: any) => {
        // console.log(error);
        Swal.fire('Error !!', 'Error in Loading Data', 'error');
      }
    );
  }

  //  Update Subject function
  public updateSubject() {
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

    //  Validate Data
    this._cat.updateCategory(this.category).subscribe(
      // For Data
      (data: any) => {
        //  Success Alert
        Swal.fire({
          icon: 'success',
          title: 'Subject is Updated',
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
        Swal.fire('Error!!', 'Error While Updating Subject', 'error');
      }
    );
  }
}
