import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ChatMessageComponent,
  TextMessageBoxSelectComponent,
  TextMessageFileEvent,
  TextMessageSelectEvent,
  TypingLoaderComponent,
  UserMessageComponent,
} from '@components/index';

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
  handleMessage(prompt: string): void {
    console.log(prompt);
  }

  handleMessageWithFile({ prompt, file }: TextMessageFileEvent): void {
    console.log({ prompt, file });
  }

  handleMessageWithSelect({ prompt, selectedOption }: TextMessageSelectEvent): void {
    console.log({ prompt, selectedOption });
  }
}
