import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Response, User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl: string = 'https://randomuser.me/api';

  private readonly http = inject(HttpClient);

  fetchAllUsers(size: number = 10): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/?results=${size}`).pipe(
      map(this.formatResponse)
    )
  }

  fetchSingleUser(id: string): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/?id=${id}`).pipe(
      map(this.formatResponse));
  }

  private formatResponse(response: Response): Response {
    return {
      info: { ...response.info },
      results: response.results.map((user: any) => (<User>{
        uuid: user.login.uuid,
        firstName: user.name.first,
        lastName: user.name.last,
        email: user.email,
        username: user.login.username,
        gender: user.gender,
        address: `${user.location.street.number} ${user.location.street.name} ${user.location.city}, ${user.location.country}`,
        dateOfBirth: user.dob.date,
        phone: user.phone,
        imageUrl: user.picture.medium
      }))
    };
  }

  constructor() { }
}
