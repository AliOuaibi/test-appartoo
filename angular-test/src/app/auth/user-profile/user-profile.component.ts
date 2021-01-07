import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  private uriseg = 'http://localhost:4242/api';
  currentUser = {};
  name: any[]
  agee: any[]
  nourrituree: any[]
  famillee: any[]
  formData: any = {};
  errors: any = [];
  id: any[]
  Id: any[]
  length : any
  mess : any
  Name: any
  users : any[]
  nameList: Array<{name: string}> = []; 


  constructor(private http: HttpClient, private userService: AuthService, private activatedRoute: ActivatedRoute, private router: Router) { }
  
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id
    // console.log(id,'params');

    this.userService.show(id).subscribe((res: any) => {
      this.agee = res.age
      this.name = res.name
      this.famillee = res.famille
      this.nourrituree = res.nourriture
    })

    this.userService.showFriend(id).subscribe((res: any) => {
      // console.log(res.length,'datta-detail');
      var length = res.length
      this.length = res.length
      const friend = res
      for (let i = 0; i < length; i++) {
        // console.log(friend[i],'for friend');
        this.userService.friendShow(friend[i]).subscribe((res: any) => {
          this.users = res 
          this.Id = res._id
          this.Name = res.name
          this.nameList.push({name: this.Name})
          // console.log(this.nameList,'users friend');
        })  
      }
      // console.log(friend,'id friend');
      // console.log(this.length,'taiiiille');
    })
  }
  
  taille(){
    var taille = this.length
    // console.log(taille,'taiiiille');
    if (taille == undefined) {
      this.mess = "Pas d'amis 😢"
      return this.mess
    }
  }

  deleteFriend(friend) {
    const URI = this.uriseg + '/deleteFriend';
    friend = this.Id
    let id = localStorage.getItem('auth-token')
    return this.userService.getUserProfile(id).subscribe((res) => {
      var sup = { requester: res._id,
                  recipient: friend
                }
      // console.log(sup, 'teeest');

      return this.http.post(URI, sup, {responseType: 'text'}).subscribe((res: any) => {
        // console.log(res,'delete');
        this.currentUser = res;
        alert('Ami(e) supprimé !')
        location.reload()
      })
    })  
  }

  
  update(): void {
    const id = this.activatedRoute.snapshot.params.id
    this.errors = [];
    this.userService.update(this.formData, id)
      .subscribe(() => {
        alert('Modification du profil')
        this.router.navigate(['/'], { queryParams: { registered: 'success' } });
      },
      (errorResponse) => {          
        this.errors.push(errorResponse.error.error);
      });
  }

}
