import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  ChatMessageComponent,
  ChatMessageOrthographyComponent,
  TextMessageBoxComponent,
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
    TextMessageBoxComponent,
    ChatMessageOrthographyComponent,
  ],
  templateUrl: './orthography-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrthographyPageComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openaiService = inject(OpenaiService);

  handleMessage(prompt: string): void {
    console.log(prompt);
    this.isLoading.set(true);
    this.messages.update(messages => [...messages, { text: prompt, isGpt: false }]);

    this.openaiService.checkOrthography(prompt).subscribe(response => {
      this.isLoading.set(false);
      this.messages.update(messages => [
        ...messages,
        { text: response.message, isGpt: true, info: response },
      ]);
    });
  }
}
