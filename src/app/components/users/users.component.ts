import {
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { UserService } from '../../services/user.service';
import { Response, User } from '../../interfaces/user.interface';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ThemeSwitchService } from '../../services/theme-switch.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NgForOf, NgIf, RouterLink, FormsModule, NgClass],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit, OnDestroy {
  userResp!: Response;
  userSub!: Subscription;
  darkModeEnabled = false;
  themeClass!: string;
  private readonly userServ = inject(UserService);
  private readonly themeServ = inject(ThemeSwitchService);

  ngOnInit(): void {
    this.themeServ.getTheme().subscribe(theme => {
      this.applyTheme(theme);
    });
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userSub = this.userServ
      .fetchAllUsers(28)
      .subscribe((res: Response) => {
        this.userResp = res;
      });
      this.applyTheme(this.themeServ.isDarkMode() ? 'dark-mode' : 'light-mode');
  }

  toggleTheme(): void {
    this.darkModeEnabled = !this.darkModeEnabled;
    const theme = this.darkModeEnabled ? 'dark-mode' : 'light-mode';
    this.themeServ.setTheme(theme);
    this.applyTheme(theme);
  }

  currentPage = 1;
  itemsPerPage = 3;

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.themeServ.getTheme().subscribe(theme => {
      this.applyTheme(theme);
    });
  }

  applyTheme(theme: string): void {
    const body = document.body;
    const cards = document.querySelectorAll('.cardRef');

    if (theme === 'dark-mode') {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }

    cards.forEach(card => {
      if (theme === 'dark-mode') {
        card.classList.remove('bg-light');
        card.classList.add('bg-secondary');
      } else {
        card.classList.remove('bg-secondary');
        card.classList.add('bg-light');
      }
    });
  }

  isDarkMode(): boolean {
    return this.darkModeEnabled;
  }

  getTotalPages(): number[] {
    if (!this.userResp || !this.userResp.results || this.userResp.results.length === 0) {
      return [];
    }
    const totalPages = Math.ceil(this.userResp.results.length / this.itemsPerPage);
    if (totalPages < 0 || !Number.isInteger(totalPages)) {
      return [];
    }
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  getCurrentPageData(): User[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.userResp?.results.slice(startIndex, endIndex) || [];
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
