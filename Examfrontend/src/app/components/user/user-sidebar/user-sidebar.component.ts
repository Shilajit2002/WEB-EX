import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css'],
})
export class UserSidebarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  //  Background Color & Color Variable
  home: String = '';
  homecolor: String = '';

  subject: String = '';
  subjectcolor: String = '';

  PYQ: String = '';
  PYQcolor: String = '';

  //  For Home
  public changeHomeButton() {
    //  Set home background color white & color black
    //  Else background color none & color white

    this.home = 'white';
    this.subject = 'none';
    this.PYQ = 'none';

    this.homecolor = 'black';
    this.subjectcolor = 'white';
    this.PYQcolor = 'white';
  }

  //  For View Subject
  public changeSubjectButton() {
    //  Set view subject background color white & color black
    //  Else background color none & color white

    this.subject = 'white';
    this.home = 'none';
    this.PYQ = 'none';

    this.homecolor = 'white';
    this.subjectcolor = 'black';
    this.PYQcolor = 'white';
  }

  //  For View PYQ
  public changePYQButton() {
    //  Set view PYQ background color white & color black
    //  Else background color none & color white

    this.PYQ = 'white';
    this.subject = 'none';
    this.home = 'none';

    this.homecolor = 'white';
    this.subjectcolor = 'white';
    this.PYQcolor = 'black';
  }
}
