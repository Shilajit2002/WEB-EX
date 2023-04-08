import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-category',
  templateUrl: './load-category.component.html',
  styleUrls: ['./load-category.component.css'],
})
export class LoadCategoryComponent implements OnInit {
  //  Set Category default value
  categories = [
    {
      cid: null,
      title: '',
      description: '',
    },
  ];

  //  Constructor for CategoryService
  constructor(private _category: CategoryService) {}

  ngOnInit(): void {
    //  Load all the Categories
    this._category.categories().subscribe(
      //  For Data
      (data: any) => {
        //  Get Category Data from the Backend
        this.categories = data;
        // console.log(this.categories);
      },
      //  For Error
      (error) => {
        // console.log(error);
        Swal.fire('Error !!', 'Error in Loading Subject', 'error');
      }
    );
  }
}
