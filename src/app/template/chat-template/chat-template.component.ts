import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  ChatMessageComponent,
  TextMessageBoxComponent,
  TypingLoaderComponent,
  UserMessageComponent,
} from '@components/index';
import { Message } from '@interfaces/message.interface';
import { OpenaiService } from '../../presentation/services/openai.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-template',
  imports: [
    ReactiveFormsModule,
    ChatMessageComponent,
    TypingLoaderComponent,
    UserMessageComponent,
    TextMessageBoxComponent,
  ],
  standalone: true,
  templateUrl: './chat-template.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatTemplateComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openaiService = inject(OpenaiService);

  handleMessage(prompt: string): void {
    console.log(prompt);
  }

  // handleMessage(prompt: string): void {
  //   console.log(prompt);
  //   this.isLoading.set(true);
  //   this.messages.update(messages => [...messages, { text: prompt, isGpt: false }]);
  //
  //   this.openaiService.checkOrthography(prompt).subscribe(response => {
  //     this.isLoading.set(false);
  //     this.messages.update(messages => [
  //       ...messages,
  //       { text: response.message, isGpt: true, info: response },
  //     ]);
  //   });
  // }
  // handleMessageWithFile({ prompt, file }: TextMessageFileEvent): void {
  //   console.log({ prompt, file });
  // }
  //
  // handleMessageWithSelect({ prompt, selectedOption }: TextMessageSelectEvent): void {
  //   console.log({ prompt, selectedOption });
  // }
}
