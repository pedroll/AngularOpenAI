import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';
import type { ImageGeneratedResponse } from '../../../../interfaces/index';

@Component({
  selector: 'app-chat-message',
  imports: [MarkdownComponent],
  templateUrl: './chat-message.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessageComponent {
  @Input({ required: true }) text!: string;
  @Input() audioUrl?: string;
  @Input() imageInfo?: ImageGeneratedResponse;
}
