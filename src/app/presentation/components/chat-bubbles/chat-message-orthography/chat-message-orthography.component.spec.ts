import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMessageOrthographyComponent } from './chat-message-orthography.component';

describe('ChatMessageOrthographyComponent', () => {
  let component: ChatMessageOrthographyComponent;
  let fixture: ComponentFixture<ChatMessageOrthographyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatMessageOrthographyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatMessageOrthographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
