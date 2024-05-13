import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
// import { Observable, filter, of, take } from 'rxjs';
import { Response, User } from '../interfaces/user.interface';
import { UserService } from './user.service';

  export const userResolver: ResolveFn<Object> = (
    route: ActivatedRouteSnapshot
  ) => {
    return inject(UserService).fetchSingleUser(route.paramMap.get('uuid')!);
  };
