import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formData: any = {};
  errors: any = [];

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    
  }

  register(): void {
    this.errors = [];
    this.auth.register(this.formData)
      .subscribe(() => {
        this.router.navigate(['/login'], { queryParams: { registered: 'success' } });
      },
        (errorResponse) => {
          // console.log(errorResponse.error,'error');
          // if(errorResponse.error === "Email already exists error"){
          //   alert('Adress mail existe déjà')
          // }
          this.errors.push(errorResponse.error.error);
        });
  }
}