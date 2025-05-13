import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  ChatMessageComponent,
  TextMessageBoxSelectComponent,
  TextMessageSelectEvent,
  TypingLoaderComponent,
  UserMessageComponent,
} from '@components/index';
import { Message } from '@interfaces/index';
import { OpenaiService } from '../../services/openai.service';

@Component({
  selector: 'app-orthography-page',
  imports: [
    ChatMessageComponent,
    UserMessageComponent,
    TypingLoaderComponent,
    // TextMessageBoxComponent,
    TextMessageBoxSelectComponent,
  ],
  templateUrl: './orthography-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrthographyPageComponent {
  public messages = signal<Message[]>([{ text: 'Sample message', isGpt: false }]);
  public isLoading = signal(false);
  public openaiService = inject(OpenaiService);

  // handleMessage(prompt: string): void {
  //   console.log(prompt);
  // }
  //
  // handleMessageWithFile({ prompt, file }: TextMessageFileEvent): void {
  //   console.log({ prompt, file });
  // }

  handleMessageWithSelect({ prompt, selectedOption }: TextMessageSelectEvent): void {
    console.log({ prompt, selectedOption });
  }
}
