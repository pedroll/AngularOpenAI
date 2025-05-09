import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ChatMessageComponent,
  TypingLoaderComponent,
  UserMessageComponent,
} from '@components/index';

@Component({
  selector: 'app-orthography-page',
  imports: [ChatMessageComponent, UserMessageComponent, TypingLoaderComponent],
  templateUrl: './orthography-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrthographyPageComponent {}
