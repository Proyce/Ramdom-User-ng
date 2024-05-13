import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Response } from '../../interfaces/user.interface';
import { tap } from 'rxjs';
import { NgForOf, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NgForOf, NgIf, RouterLink],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  userResp!: Response
  private readonly userServ = inject(UserService)

ngOnInit(): void {
  this.userServ.fetchAllUsers(10).subscribe((res: Response) => {
    console.log('Res', res);
    this.userResp = res;
  });
}
}
