import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidekiqService {
  private apiUrl = 'http://localhost:3000'; // Change to match your Rails API

  constructor(private http: HttpClient) {}

  getSidekiqStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/sidekiq-stats`);
  }

  triggerBirthdayJob(): Observable<any> {
    return this.http.post(`${this.apiUrl}/trigger-birthday-job`, {});
  }
}
