import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from "../../common/user";


@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
  providers:[AuthService]
})
export class ListUserComponent implements OnInit {
  users: any

  constructor(private userService: AuthService) { }

  ngOnInit(): void {
    this.userService.list().subscribe((res: any) => {
      this.users = res 
    })
  }
 
}
