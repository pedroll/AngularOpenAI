import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessageComponent } from '@components/chat-bubbles/chat-message/chat-message.component';
import { TypingLoaderComponent } from '@components/typing-loader/typing-loader.component';
import { UserMessageComponent } from '@components/chat-bubbles/user-message/user-message.component';
import { Message } from '@interfaces/message.interface';
import { OpenaiService } from '../../services/openai.service';
import { ReactiveFormsModule } from '@angular/forms';
import {
  TextMessageBoxFileComponent,
  TextMessageFileEvent,
} from '@components/messages-boxes/text-message-box-file/text-message-box-file.component';

@Component({
  selector: 'app-audio-to-text-page',
  imports: [
    ChatMessageComponent,
    TypingLoaderComponent,
    UserMessageComponent,
    ReactiveFormsModule,
    ChatMessageComponent,
    TypingLoaderComponent,
    UserMessageComponent,
    TextMessageBoxFileComponent,
  ],
  templateUrl: './audio-to-text-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AudioToTextPageComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openaiService = inject(OpenaiService);

  handleMessageWithFile({ prompt, file }: TextMessageFileEvent): void {
    console.log({ prompt, file });
  }
}
