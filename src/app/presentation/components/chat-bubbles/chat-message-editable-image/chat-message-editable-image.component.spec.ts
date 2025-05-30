import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMessageEditableImageComponent } from './chat-message-editable-image.component';

describe('ChatMessageEditableImageComponent', () => {
  let component: ChatMessageEditableImageComponent;
  let fixture: ComponentFixture<ChatMessageEditableImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatMessageEditableImageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatMessageEditableImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
