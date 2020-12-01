import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ListUserComponent } from './page/list-user/list-user.component';
import { UserModifComponent } from './page/user-modif/user-modif.component';

export const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path:'membre',
        component: ListUserComponent
    },
    {
        path:'membre/:id',
        component: UserModifComponent
    }
]