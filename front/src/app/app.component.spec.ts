import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {provideMockStore} from "@ngrx/store/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('AppComponent', () => {
  let title = "PetPals";
  beforeEach(async () => {
    let initialState = {
      token:null
    }
    await TestBed.configureTestingModule({
      imports: [AppComponent, BrowserAnimationsModule],
      providers: [
        provideMockStore({ initialState }),
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'front' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual(title);
  });
  
  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(`Hello, ${title}`);
  });
});
