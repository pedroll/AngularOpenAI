import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ChatMessageComponent,
  TextMessageBoxComponent,
  TypingLoaderComponent,
  UserMessageComponent,
} from '@components/index';
import { Message } from '@interfaces/message.interface';
import { OpenaiService } from '../../services/openai.service';

@Component({
  selector: 'app-pros-cons-page',
  imports: [
    ChatMessageComponent,
    TextMessageBoxComponent,
    TypingLoaderComponent,
    UserMessageComponent,
    ReactiveFormsModule,
    TextMessageBoxComponent,
  ],
  templateUrl: './pros-cons-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProsConsPageComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openaiService = inject(OpenaiService);

  handleMessage(prompt: string): void {
    console.log(prompt);
    this.isLoading.set(true);
    this.messages.update(messages => [...messages, { text: prompt, isGpt: false }]);

    this.openaiService.prosConsDiscusser(prompt).subscribe(response => {
      this.isLoading.set(false);
      this.messages.update(messages => [...messages, { text: response.content, isGpt: true }]);
    });
  }
}
