import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class UserApiService {
  #http = inject(HttpClient);

  getUsers(): Observable<User[]> {
    return this.#http.get<User[]>('http://localhost:3000/users');
  }

  getWelcome(): Observable<{ message: string }> {
    return this.#http.get<{ message: string }>('http://localhost:3000/');
  }
}
