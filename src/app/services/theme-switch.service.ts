import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeSwitchService {
    private readonly _theme$: BehaviorSubject<string> = new BehaviorSubject<string>('light-mode');
    readonly theme$ = this._theme$.asObservable();

    constructor() {
      const storedTheme = localStorage.getItem('user-theme');
      const initialTheme = storedTheme || 'light-mode';
      this._theme$ = new BehaviorSubject<string>(initialTheme);
    }

    setTheme(theme: string): void {
      try {
        localStorage.setItem('user-theme', theme);
        this._theme$.next(theme);
      } catch (error) {
        console.error(`Failed to set theme: ${error}`);
      }
    }

    getTheme(): BehaviorSubject<string> {
      return this._theme$;
    }

    isDarkMode(): boolean {
      return this._theme$.value === 'dark-mode';
    }

}
