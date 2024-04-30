import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokeListComponent } from './joke-list.component';

describe('JokeListComponent', () => {
  let component: JokeListComponent;
  let fixture: ComponentFixture<JokeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JokeListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JokeListComponent);
    component = fixture.componentInstance;

    component.jokes = [
      { value: 'Chuck Norris can divide by zero.', isFavourite: false },
    ];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ul > li', () => {
    it('should render joke', () => {
      // Assert
      const nativeElement = fixture.nativeElement as HTMLElement;
      expect(nativeElement.querySelector('li')?.textContent).toContain(
        'Chuck Norris can divide by zero.'
      );
    });
  });
});
