import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Response, User } from '../../interfaces/user.interface';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';


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
  private readonly userServ = inject(UserService)
  private readonly activatedRoute = inject(ActivatedRoute)

  ngOnInit(): void {
    this.user = <User>(this.activatedRoute.snapshot.data['userResp'].results[0]);
  }
}
