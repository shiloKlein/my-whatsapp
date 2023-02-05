import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupFilterComponent } from './group-filter.component';

describe('GroupFilterComponent', () => {
  let component: GroupFilterComponent;
  let fixture: ComponentFixture<GroupFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
