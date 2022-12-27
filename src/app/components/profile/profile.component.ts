import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})

export class ProfileComponent implements OnInit {

  user=null;
  hide:boolean;

  url:any;
	msg = "";
  icon=document.getElementById('picicon');
	
  constructor(public login:LoginService,public snack:MatSnackBar) {
    this.hide=false;
   }

  ngOnInit(): void {

    this.user=this.login.getUser();
    if(this.login.getUserRole() == "ADMIN"){
      this.url="../../../assets/ProfilePicAdmin.png"
    }
    else{
      this.url="../../../assets/ProfilePicUser.jpg"
    }
  }

  
	//selectFile(event) { //Angular 8
	selectFile(event: any) { //Angular 11, for stricter type
		var mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) {
			this.snack.open('Only Images are supported !!', 'ok', {
        duration: 3000,
      });
			return;
		}
		
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (event:any) => {
			this.msg = "";
      this.url=event.target.result;
		}

	}
}
