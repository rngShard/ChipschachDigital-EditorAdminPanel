import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  email: string;
  password: string;

  ngOnInit() {
    this.authService.userAvailable().subscribe(data => {
      console.log(data);
      if  (data.count === 0) {
        this.authService.register('Ralf Schreiber', 'mail@schach-fuer-kids.de', 'sfk-admin_4711', 'sfk-admin_4711').subscribe(usrData => {
          console.log('No users found; registered new user: ', usrData);
          console.log('Username: mail@schach-fuer-kids.de');
          console.log('Password: sfk-admin_4711');
        });
      }
    });
  }

  login(): void {
    this.authService.login(this.email, this.password)
    .subscribe(data => {
      this.router.navigate(['/admin']);
    })
  }

}
