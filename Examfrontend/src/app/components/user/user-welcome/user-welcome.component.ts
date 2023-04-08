import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-user-welcome',
  templateUrl: './user-welcome.component.html',
  styleUrls: ['./user-welcome.component.css']
})
export class UserWelcomeComponent implements OnInit {

  constructor(public login:LoginService) { }

  ngOnInit(): void {
  }

}
