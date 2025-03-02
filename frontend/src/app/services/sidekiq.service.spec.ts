import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SidekiqService } from './sidekiq.service';

// 🐐 Décrire le bloc principal des tests pour le service SidekiqService
describe('SidekiqService', () => {
  let service: SidekiqService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3000';

  // 🐐 Initialisation du module de test avant chaque test
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Module pour simuler les requêtes HTTP
      providers: [SidekiqService]
    });
    service = TestBed.inject(SidekiqService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // 🐐 Nettoyage après chaque test
  afterEach(() => {
    httpMock.verify(); // Vérifie qu'aucune requête en attente ne reste ouverte
  });

  // 🐐 Tester la récupération des statistiques Sidekiq
  it('devrait récupérer les statistiques de Sidekiq', () => {
    const mockStats = { processed: 100, failed: 2 }; // Données factices pour le test

    service.getSidekiqStats().subscribe(stats => {
      expect(stats).toEqual(mockStats); // Vérifie que les données reçues sont correctes
    });

    // Simuler la requête HTTP
    const req = httpMock.expectOne(`${apiUrl}/sidekiq-stats`);
    expect(req.request.method).toBe('GET'); // Vérifier la méthode HTTP utilisée
    req.flush(mockStats); // Retourner les données factices
  });

  // 🐐 Tester le déclenchement du job anniversaire
  it("devrait déclencher le job d'anniversaire", () => {
    const mockResponse = { success: true }; // Réponse factice

    service.triggerBirthdayJob().subscribe(response => {
      expect(response).toEqual(mockResponse); // Vérifie la réponse
    });

    // Simuler la requête HTTP
    const req = httpMock.expectOne(`${apiUrl}/trigger-birthday-job`);
    expect(req.request.method).toBe('POST'); // Vérifier la méthode HTTP utilisée
    req.flush(mockResponse); // Retourner la réponse factice
  });
});
