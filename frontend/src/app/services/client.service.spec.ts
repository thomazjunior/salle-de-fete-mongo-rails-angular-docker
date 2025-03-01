import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environment';
import { Client } from '../models/client.model';
import { AuthService } from '../security/auth.service';
import { ClientService } from './client.service';

describe('ClientService', () => {
  let service: ClientService;
  let httpMock: HttpTestingController;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  const apiUrl = `${environment.apiBaseUrl}/clients`;

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['getToken']);
    
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClientService, { provide: AuthService, useValue: authSpy }],
    });

    service = TestBed.inject(ClientService);
    httpMock = TestBed.inject(HttpTestingController);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    authServiceSpy.getToken.and.returnValue('mockToken');
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all clients', () => {
    const mockClients: Client[] = [{ name: 'John Doe', email: 'john@example.com', phone_number: '1234567890', address: '123 Street' }];
    
    service.getClients().subscribe((clients) => {
      expect(clients.length).toBe(1);
      expect(clients).toEqual(mockClients);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockClients);
  });

  it('should fetch a client by ID', () => {
    const mockClient: Client = { name: 'Jane Doe', email: 'jane@example.com', phone_number: '0987654321', address: '456 Avenue' };
    
    service.getClientById('1').subscribe((client) => {
      expect(client).toEqual(mockClient);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockClient);
  });

  it('should add a new client', () => {
    const newClient: Client = { name: 'Alice', email: 'alice@example.com', phone_number: '1112223333', address: '789 Boulevard' };
    
    service.addClient(newClient).subscribe((client) => {
      expect(client).toEqual(newClient);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(newClient);
  });

  it('should update a client', () => {
    const updatedClient: Partial<Client> = { name: 'Alice Updated' };
    
      service.updateClient('1', updatedClient).subscribe((client) => {
        //@ts-ignore
      expect(client).toEqual(updatedClient);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedClient);
  });

  it('should delete a client', () => {
    service.deleteClient('1').subscribe((response) => {
      expect(response).toBeUndefined();
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should handle errors gracefully', () => {
    service.getClients().subscribe(
      () => fail('Expected an error'),
      (error) => {
        expect(error).toBeTruthy();
      }
    );

    const req = httpMock.expectOne(apiUrl);
    req.flush('Error', { status: 500, statusText: 'Server Error' });
  });
});
