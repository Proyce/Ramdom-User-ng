import { Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { UserdetailComponent } from './components/userdetail/userdetail.component';
import { userResolver } from './services/userdetail.resolver';

export const routes: Routes = [
  { path: 'users', component: UsersComponent, resolve: {userResp: userResolver} },
  { path: 'user/:id', component: UserdetailComponent, resolve: {userResp: userResolver} },
  { path: '**', redirectTo: 'users' },
];
