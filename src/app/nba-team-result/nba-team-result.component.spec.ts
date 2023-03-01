import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbaTeamResultComponent } from './nba-team-result.component';

describe('NbaTeamResultComponent', () => {
  let component: NbaTeamResultComponent;
  let fixture: ComponentFixture<NbaTeamResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NbaTeamResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NbaTeamResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
