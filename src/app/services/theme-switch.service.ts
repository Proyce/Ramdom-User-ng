import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeSwitchService {
    readonly _theme$: BehaviorSubject<string> = new BehaviorSubject<string>('light-mode');
    public readonly theme$ = this._theme$.asObservable();

    constructor() {
      this.getTheme();
    }

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
        document.getElementById('table')!.classList.add('table-dark');
      } else {
        document.body.classList.remove('dark-mode');
        document.getElementById('table')!.classList.remove('table-dark');
      }
    }

    isDarkMode(): boolean {
      return this._theme$.value === 'dark-mode';
    }

}