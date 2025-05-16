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
  public abortSignal = new AbortController();

  async handleMessage(prompt: string) {
    // stop the previous stream
    this.abortSignal.abort();
    this.abortSignal = new AbortController();

    console.log(prompt);
    this.messages.update(messages => [
      ...messages,
      { text: prompt, isGpt: false },
      { text: '...', isGpt: true },
    ]);

    this.isLoading.set(true);
    const stream = this.openaiService.prosConsDiscusserStream(prompt, this.abortSignal.signal);
    this.isLoading.set(false);

    for await (const chunk of stream) {
      console.log(chunk);
      this.handleStreamResponse(chunk);
    }
  }

  handleStreamResponse(message: string) {
    this.messages().pop();
    this.isLoading.set(false);
    // this.messages.update(messages => [...messages, { text: message, isGpt: true }]);
    const messages = this.messages();
    this.messages.set([...messages, { text: message, isGpt: true }]);
  }
}
