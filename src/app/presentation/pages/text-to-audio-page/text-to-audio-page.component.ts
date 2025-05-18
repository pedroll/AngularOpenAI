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

  handleMessageWithSelect({ prompt, selectedOption }: TextMessageSelectEvent): void {
    console.log({ prompt, selectedOption });
  }
}
