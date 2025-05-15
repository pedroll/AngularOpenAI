import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-chat-message-orthography',
  imports: [],
  templateUrl: './chat-message-orthography.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessageOrthographyComponent {
  @Input({ required: true }) userScore!: number;
  @Input({ required: true }) text!: string;
  @Input() errors: string[] = [];
}
