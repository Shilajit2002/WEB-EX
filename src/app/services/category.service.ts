import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  //  HTTP Client Constructor
  constructor(private _http: HttpClient) {}

  //  Load all the categories
  public categories() {
    return this._http.get(`${baseUrl}/category/`);
  }

  //  Add new category
  public addCategory(category: any) {
    return this._http.post(`${baseUrl}/category/`, category);
  }

  //  Delete category
  public deleteCategory(cid: any) {
    return this._http.delete(`${baseUrl}/category/${cid}`);
  }

  //  Get the Single Category
  public getCategory(cid: any) {
    return this._http.get(`${baseUrl}/category/${cid}`);
  }

  //  Update Category
  public updateCategory(category: any) {
    return this._http.put(`${baseUrl}/category/`, category);
  }
}
