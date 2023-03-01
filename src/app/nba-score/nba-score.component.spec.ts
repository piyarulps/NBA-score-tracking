import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbaScoreComponent } from './nba-score.component';

describe('NbaScoreComponent', () => {
  let component: NbaScoreComponent;
  let fixture: ComponentFixture<NbaScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NbaScoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NbaScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
