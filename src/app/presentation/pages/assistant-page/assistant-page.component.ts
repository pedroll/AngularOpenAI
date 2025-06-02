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

    this.openaiService.checkOrthography(question).subscribe(response => {
      this.isLoading.set(false);
      this.messages.update(messages => [
        ...messages,
        { text: response.message, isGpt: true, info: response },
      ]);
    });
  }

  // handleMessageWithFile({ question, file }: TextMessageFileEvent): void {
  //   console.log({ question, file });
  // }
  //
  // handleMessageWithSelect({ question, selectedOption }: TextMessageSelectEvent): void {
  //   console.log({ question, selectedOption });
  // }
}
