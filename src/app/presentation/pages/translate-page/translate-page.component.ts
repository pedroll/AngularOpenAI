import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  ChatMessageComponent,
  TextMessageBoxSelectComponent,
  TextMessageSelectEvent,
  TypingLoaderComponent,
  UserMessageComponent,
} from '@components/index';
import { Message } from '@interfaces/message.interface';
import { OpenaiService } from '../../services/openai.service';

@Component({
  selector: 'app-translate-page',
  imports: [
    TypingLoaderComponent,
    UserMessageComponent,
    TextMessageBoxSelectComponent,
    ChatMessageComponent,
  ],
  templateUrl: './translate-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TranslatePageComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openaiService = inject(OpenaiService);

  handleMessageWithSelect({ prompt, selectedOption }: TextMessageSelectEvent): void {
    console.log(prompt);
    this.isLoading.set(true);
    this.messages.update(messages => [...messages, { text: prompt as string, isGpt: false }]);

    this.openaiService.translate(prompt as string, selectedOption).subscribe(response => {
      this.isLoading.set(false);
      this.messages.update(messages => [...messages, { text: response.message, isGpt: true }]);
    });
  }
}
