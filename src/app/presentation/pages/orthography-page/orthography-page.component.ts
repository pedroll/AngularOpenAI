import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ChatMessageComponent,
  TextMessageBoxFileComponent,
  TextMessageEvent,
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
    TextMessageBoxFileComponent,
  ],
  templateUrl: './orthography-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrthographyPageComponent {
  handleMessage(prompt: string): void {
    console.log(prompt);
  }

  handleMessageWithFile({ prompt, file }: TextMessageEvent): void {
    console.log({ prompt, file });
  }
}
