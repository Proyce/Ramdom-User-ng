import { Component, OnInit, inject } from '@angular/core';
import { Response, User } from '../../interfaces/user.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, Location } from '@angular/common';


@Component({
  selector: 'app-userdetail',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './userdetail.component.html',
  styleUrl: './userdetail.component.scss'
})
export class UserdetailComponent implements OnInit {
  user!: User
  userResp!: Response
  private readonly router = inject(Router);
  private readonly location = inject(Location);
  private readonly activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.user = <User>(this.activatedRoute.snapshot.data['userResp'].results[0]);
  }

  goBack(): void {
    this.location.back();
  }
}
