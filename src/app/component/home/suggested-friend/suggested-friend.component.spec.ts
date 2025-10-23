import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedFriendComponent } from './suggested-friend.component';

describe('SuggestedFriendComponent', () => {
  let component: SuggestedFriendComponent;
  let fixture: ComponentFixture<SuggestedFriendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuggestedFriendComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestedFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
