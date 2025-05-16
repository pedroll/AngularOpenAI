import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Message } from '@interfaces/message.interface';
import { OpenaiService } from '../../services/openai.service';
import { ChatMessageComponent } from '@components/chat-bubbles/chat-message/chat-message.component';
import { TextMessageBoxComponent } from '@components/messages-boxes/text-message-box/text-message-box.component';
import { TypingLoaderComponent } from '@components/typing-loader/typing-loader.component';
import { UserMessageComponent } from '@components/chat-bubbles/user-message/user-message.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-pros-cons-stream-page',
  imports: [
    ChatMessageComponent,
    TextMessageBoxComponent,
    TypingLoaderComponent,
    UserMessageComponent,
    ReactiveFormsModule,
    TextMessageBoxComponent,
  ],
  templateUrl: './pros-cons-stream-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProsConsStreamPageComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openaiService = inject(OpenaiService);

  async handleMessage(prompt: string) {
    console.log(prompt);
    this.isLoading.set(true);
    this.messages.update(messages => [...messages, { text: prompt, isGpt: false }]);

    const stream = this.openaiService.prosConsDiscusserStream(prompt);

    for await (const chunk of stream) {
      console.log(chunk);
      this.messages.update(messages => [...messages, { text: chunk, isGpt: true }]);
    }
  }
}
