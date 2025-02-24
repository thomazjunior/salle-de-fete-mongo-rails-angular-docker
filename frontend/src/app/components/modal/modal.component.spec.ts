import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientModalComponent } from './modal.component';



describe('ModalComponent', () => {
  let component: ClientModalComponent;
  let fixture: ComponentFixture<ClientModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
