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

  public languages = signal([
    { id: 'alemán', text: 'Alemán' },
    { id: 'árabe', text: 'Árabe' },
    { id: 'bengalí', text: 'Bengalí' },
    { id: 'francés', text: 'Francés' },
    { id: 'hindi', text: 'Hindi' },
    { id: 'inglés', text: 'Inglés' },
    { id: 'japonés', text: 'Japonés' },
    { id: 'mandarín', text: 'Mandarín' },
    { id: 'portugués', text: 'Portugués' },
    { id: 'ruso', text: 'Ruso' },
  ]);

  handleMessageWithSelect({ prompt, selectedOption }: TextMessageSelectEvent): void {
    console.log(prompt);
    const messageText = `Traduce el siguiente texto al idioma ${selectedOption}`;
    this.isLoading.set(true);
    this.messages.update(messages => [...messages, { text: messageText, isGpt: false }]);

    this.openaiService.translate(prompt as string, selectedOption).subscribe(response => {
      this.isLoading.set(false);
      this.messages.update(messages => [...messages, { text: response.message, isGpt: true }]);
    });
  }
}
