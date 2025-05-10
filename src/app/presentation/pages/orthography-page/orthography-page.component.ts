import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ChatMessageComponent,
  TextMessageBoxComponent,
  TypingLoaderComponent,
  UserMessageComponent,
} from '@components/index';

@Component({
  selector: 'app-orthography-page',
  imports: [
    ChatMessageComponent,
    UserMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
  ],
  templateUrl: './orthography-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrthographyPageComponent {}
