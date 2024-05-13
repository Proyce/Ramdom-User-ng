import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Response } from '../../interfaces/user.interface';
import { NgForOf, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NgForOf, NgIf, RouterLink],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  userResp!: Response;
  private readonly userServ = inject(UserService);

  ngOnInit(): void {
    this.userServ.fetchAllUsers(24).subscribe((res: Response) => {
      this.userResp = res;
    });
  }

  currentPage = 1;
  itemsPerPage = 3;

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  getTotalPages() {
    const totalPages = Math.ceil(this.userResp?.results.length / this.itemsPerPage);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  getCurrentPageData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.userResp?.results.slice(startIndex, endIndex);
  }
}
