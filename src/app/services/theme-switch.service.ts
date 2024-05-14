import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeSwitchService {
    readonly _theme$: BehaviorSubject<string> = new BehaviorSubject<string>('light-mode');
    public readonly theme$ = this._theme$.asObservable();

    setTheme(theme: string): void {
      try {
        localStorage.setItem('user-theme', theme);
        this._theme$.next(theme);
      } catch (error) {
        console.error(`Failed to set theme: ${error}`);
      }
    }

    getTheme(): void {
      try {
        const theme = localStorage.getItem('user-theme') ?? 'light-mode';
        this._theme$.next(theme);
      } catch (error) {
        console.error(`Failed to get theme: ${error}`);
      }
    }

    applyTheme(theme: string): void {
      if (theme === 'dark-mode') {
        document.body.classList.add('dark-mode');
        document.querySelectorAll('.cardRef').forEach(card => {
          card.classList.remove('bg-light');
          card.classList.add('bg-secondary');
        });
      } else {
        document.body.classList.remove('dark-mode');
        document.querySelectorAll('.cardRef').forEach(card => {
          card.classList.remove('bg-secondary');
          card.classList.add('bg-light');
        });
      }
    }

    isDarkMode(): boolean {
      return this._theme$.value === 'dark-mode';
    }

}
