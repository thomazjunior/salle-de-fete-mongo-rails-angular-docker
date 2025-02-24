import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-sidekiq-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './sidekiq-dashboard.component.html',
  styleUrls: ['./sidekiq-dashboard.component.scss']
})
export class SidekiqDashboardComponent implements OnInit {
  stats: any = {};

  constructor(private socket: Socket, private http: HttpClient) {}

  ngOnInit() {
    // Subscribe to Sidekiq real-time updates
    this.socket.fromEvent('sidekiq_stats').subscribe((data: any) => {
      this.stats = data;
    });

    // Fetch initial stats
    this.fetchStats();
  }

  fetchStats() {
    this.http.get('http://localhost:3000/sidekiq-stats').subscribe(
      (data) => (this.stats = data),
      (error) => console.error('Error fetching Sidekiq stats', error)
    );
  }

  triggerJob() {
    this.http.post('http://localhost:3000/trigger-birthday-job', {}).subscribe(() => {
      alert('🎉 Birthday job triggered!');
      this.fetchStats();
    });
  }
}
