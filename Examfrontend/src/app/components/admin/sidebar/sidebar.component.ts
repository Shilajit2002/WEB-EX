import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  //  Background Color & Color Variable
  home: String = '';
  homecolor: String = '';

  subject: String = '';
  subjectcolor: String = '';

  addSubject: String = '';
  addSubjectcolor: String = '';

  paper: String = '';
  papercolor: String = '';

  addPaper: String = '';
  addPapercolor: String = '';

  //  For Home
  public changeHomeButton() {
    //  Set home background color white & color black
    //  Else background color none & color white

    this.home = 'white';
    this.subject = 'none';
    this.addSubject = 'none';
    this.paper = 'none';
    this.addPaper = 'none';

    this.homecolor = 'black';
    this.subjectcolor = 'white';
    this.addSubjectcolor = 'white';
    this.papercolor = 'white';
    this.addPapercolor = 'white';
  }

  //  For View Subject
  public changeSubjectButton() {
    //  Set view subject background color white & color black
    //  Else background color none & color white

    this.subject = 'white';
    this.home = 'none';
    this.addSubject = 'none';
    this.paper = 'none';
    this.addPaper = 'none';

    this.homecolor = 'white';
    this.subjectcolor = 'black';
    this.addSubjectcolor = 'white';
    this.papercolor = 'white';
    this.addPapercolor = 'white';
  }

  //  For Add Subject
  public changeaddSubButton() {
    //  Set add subject background color white & color black
    //  Else background color none & color white

    this.addSubject = 'white';
    this.subject = 'none';
    this.home = 'none';
    this.paper = 'none';
    this.addPaper = 'none';

    this.homecolor = 'white';
    this.subjectcolor = 'white';
    this.addSubjectcolor = 'black';
    this.papercolor = 'white';
    this.addPapercolor = 'white';
  }

  //  For View Paper
  public changePaperButton() {
    //  Set paper background color white & color black
    //  Else background color none & color white

    this.paper = 'white';
    this.subject = 'none';
    this.addSubject = 'none';
    this.home = 'none';
    this.addPaper = 'none';

    this.homecolor = 'white';
    this.subjectcolor = 'white';
    this.addSubjectcolor = 'white';
    this.papercolor = 'black';
    this.addPapercolor = 'white';
  }

  //  For Add Paper
  public changeaddPaperButton() {
    //  Set add paper background color white & color black
    //  Else background color none & color white

    this.addPaper = 'white';
    this.subject = 'none';
    this.addSubject = 'none';
    this.paper = 'none';
    this.home = 'none';

    this.homecolor = 'white';
    this.subjectcolor = 'white';
    this.addSubjectcolor = 'white';
    this.papercolor = 'white';
    this.addPapercolor = 'black';
  }

  //  For View PYQPaper
  public changePYQPaperButton() {
    //  Set PYQpaper background color white & color black
    //  Else background color none & color white

    this.paper = 'none';
    this.subject = 'none';
    this.addSubject = 'none';
    this.home = 'none';
    this.addPaper = 'none';

    this.homecolor = 'white';
    this.subjectcolor = 'white';
    this.addSubjectcolor = 'white';
    this.papercolor = 'white';
    this.addPapercolor = 'white';
  }

  //  For Add PYQPaper
  public changePYQaddPaperButton() {
    //  Set add paper background color white & color black
    //  Else background color none & color white

    this.addPaper = 'none';
    this.subject = 'none';
    this.addSubject = 'none';
    this.paper = 'none';
    this.home = 'none';

    this.homecolor = 'white';
    this.subjectcolor = 'white';
    this.addSubjectcolor = 'white';
    this.papercolor = 'white';
    this.addPapercolor = 'white';
  }
}
