import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-user-modif',
  templateUrl: './user-modif.component.html',
  styleUrls: ['./user-modif.component.scss'],
  providers:[AuthService]

})
export class UserModifComponent implements OnInit {
  name: any[]
  agee: any[]
  nourrituree: any[]
  famillee: any[]
  formData: any = {};
  errors: any = [];

  constructor(private userService: AuthService, private activatedRoute: ActivatedRoute, private router: Router) { }
  
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id
    // console.log(id,'params');

    this.userService.show(id).subscribe((res: any) => {
      this.agee = res.age
      this.name = res.name
      this.famillee = res.famille
      this.nourrituree = res.nourriture

      // console.log(res,'datta-detail');
      // console.log(this.agee, 'useeeer');
    })
  }

  update(): void {
    const id = this.activatedRoute.snapshot.params.id
    this.errors = [];
    this.userService.update(this.formData, id)
      .subscribe(() => {
        this.router.navigate(['/'], { queryParams: { registered: 'success' } });
      },
      (errorResponse) => {          
        this.errors.push(errorResponse.error.error);
      });
  }
}
