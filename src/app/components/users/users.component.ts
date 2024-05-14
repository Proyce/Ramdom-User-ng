import { Component, EventEmitter, OnDestroy, OnInit, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Response } from '../../interfaces/user.interface';
import { NgForOf, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ThemeSwitchService } from '../../services/theme-switch.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NgForOf, NgIf, RouterLink, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit, OnDestroy {
  userResp!: Response;
  userSub!: Subscription;
  isDarkMode!: boolean;
  private readonly userServ = inject(UserService);
  private readonly themeServ = inject(ThemeSwitchService);

  ngOnInit(): void {
    this.themeServ.getTheme();
    this.isDarkMode = this.themeServ.isDarkMode();
    this.userSub = this.userServ.fetchAllUsers(28).subscribe((res: Response) => {
      this.userResp = res;
    });
  }

  toggleTheme(): void {
    const theme = this.themeServ._theme$.value === 'light-mode' ? 'dark-mode' : 'light-mode';
    this.themeServ.setTheme(theme);
    this.themeServ.applyTheme(theme);
  }

  currentPage = 1;
  itemsPerPage = 3;

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  getTotalPages() {
    if (!this.userResp || !this.userResp.results || this.userResp.results.length === 0) {
      return [];
    }
    const totalPages = Math.ceil(this.userResp.results.length / this.itemsPerPage);
    if (totalPages < 0 || !Number.isInteger(totalPages)) {
      return [];
    }
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  getCurrentPageData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.userResp?.results.slice(startIndex, endIndex);
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe()
  }
}
