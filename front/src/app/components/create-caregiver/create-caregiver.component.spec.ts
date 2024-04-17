import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateCaregiverComponent} from './create-caregiver.component';
import {provideMockStore} from "@ngrx/store/testing";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";

describe('CreateCaregiverComponent', () => {
  let component: CreateCaregiverComponent;
  let fixture: ComponentFixture<CreateCaregiverComponent>;

  beforeEach(async () => {
    let initialState = {
      token:null
    }
    await TestBed.configureTestingModule({
      imports: [CreateCaregiverComponent, BrowserAnimationsModule],
      providers: [
        provideMockStore({ initialState }),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCaregiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
