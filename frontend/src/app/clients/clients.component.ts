import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

// Define the Client interface to specify the structure of the client data
interface Client {
  id: number;
  name: string;
  email: string;
  // Add other properties that you expect in the client object
}

@Component({
  selector: 'app-clients',
  standalone: true, // Mark the component as standalone
  imports: [CommonModule, NgFor], // Ensure ngFor is available in this component
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
  // Define the type of clients array to be an array of Client objects
  clients: Client[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Use the new Observer pattern for subscribe
    this.apiService.getClients().subscribe({
      next: (data: Client[]) => {
        console.log(data)
        this.clients = data; // Assign the received data to the clients array
      },
      error: (error) => {
        console.error('Error fetching clients:', error); // Handle error
      },
      complete: () => {
        console.log('Client data loading complete'); // Handle completion
      },
    });
  }
}
