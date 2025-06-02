import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import {
  ChatMessageComponent,
  TextMessageBoxComponent,
  TypingLoaderComponent,
  UserMessageComponent,
} from '@components/index';
import { Message } from '@interfaces/message.interface';
import { OpenaiService } from '../../services/openai.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-assistant-page',
  imports: [
    ReactiveFormsModule,
    ChatMessageComponent,
    TypingLoaderComponent,
    UserMessageComponent,
    TextMessageBoxComponent,
  ],
  templateUrl: './assistant-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssistantPageComponent implements OnInit {
  public openaiService = inject(OpenaiService);

  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public threadId = signal<string>('');

  ngOnInit(): void {
    this.openaiService.createThread().subscribe(threadId => {
      this.threadId.set(threadId as string);
    });
  }

  handleMessage(question: string): void {
    console.log(question);
    this.isLoading.set(true);
    this.messages.update(messages => [...messages, { text: question, isGpt: false }]);

    this.openaiService.postQuestion(this.threadId(), question).subscribe(replies => {
      this.isLoading.set(false);

      for (const reply of replies) {
        for (const message of reply.content) {
          this.messages.update(messages => [
            ...messages,
            { text: message, isGpt: reply.role === 'assistant' },
          ]);
        }
      }
    });
  }
}
