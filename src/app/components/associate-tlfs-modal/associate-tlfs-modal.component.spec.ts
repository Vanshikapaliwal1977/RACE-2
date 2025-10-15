import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateTlfsModalComponent } from './associate-tlfs-modal.component';

describe('AssociateTlfsModalComponent', () => {
  let component: AssociateTlfsModalComponent;
  let fixture: ComponentFixture<AssociateTlfsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssociateTlfsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociateTlfsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
