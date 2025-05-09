import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChatMessageComponent } from '../../components/chat-bubbles/chat-message/chat-message.component';
import { UserMessageComponent } from '../../components/chat-bubbles/user-message/user-message.component';

@Component({
  selector: 'app-orthography-page',
  imports: [ChatMessageComponent, UserMessageComponent],
  templateUrl: './orthography-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrthographyPageComponent {}
