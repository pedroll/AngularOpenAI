import { ReactiveFormsModule } from '@angular/forms';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { OpenaiService } from '../../services/openai.service';

import {
  ChatMessageComponent,
  TextMessageBoxSelectComponent,
  TextMessageSelectEvent,
  TypingLoaderComponent,
  UserMessageComponent,
} from '@components/index';

import { Message } from '@interfaces/message.interface';

@Component({
  selector: 'app-text-to-audio-page',
  imports: [
    ChatMessageComponent,
    ReactiveFormsModule,
    TextMessageBoxSelectComponent,
    TypingLoaderComponent,
    UserMessageComponent,
  ],
  templateUrl: './text-to-audio-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextToAudioPageComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openaiService = inject(OpenaiService);
  public voices = signal([
    { id: 'nova', text: 'Nova' },
    { id: 'alloy', text: 'Alloy' },
    { id: 'echo', text: 'Echo' },
    { id: 'fable', text: 'Fable' },
    { id: 'onyx', text: 'Onyx' },
    { id: 'shimmer', text: 'Shimmer' },
    { id: 'ash', text: 'Ash' },
    { id: 'ballad', text: 'Ballad' },
    { id: 'coral', text: 'Coral' },
    { id: 'sage', text: 'Sage' },
    { id: 'verse', text: 'Verse' },
  ]);

  handleMessageWithSelect({ prompt, selectedOption }: TextMessageSelectEvent): void {
    console.log({ prompt, selectedOption });
    this.isLoading.set(true);
    const messageText = `${selectedOption} - ${prompt}`;
    this.messages.update(messages => [...messages, { text: messageText, isGpt: false }]);

    this.openaiService.textToAudio(prompt, selectedOption).subscribe(response => {
      this.isLoading.set(false);
      this.messages.update(messages => [
        ...messages,
        {
          text: response.message,
          isGpt: true,
          audioUrl: response.audioUrl,
        },
      ]);
    });
  }
}
