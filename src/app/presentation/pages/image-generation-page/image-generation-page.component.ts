import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
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
  selector: 'app-image-generation-page',
  imports: [
    ReactiveFormsModule,
    ChatMessageComponent,
    TypingLoaderComponent,
    UserMessageComponent,
    TextMessageBoxComponent,
    TypingLoaderComponent,
  ],
  templateUrl: './image-generation-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageGenerationPageComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openaiService = inject(OpenaiService);

  handleMessage(prompt: string): void {
    console.log(prompt);
    this.isLoading.set(true);
    this.messages.update(messages => [...messages, { text: prompt, isGpt: false }]);

    this.openaiService.imageGeneration({ prompt }).subscribe(response => {
      this.isLoading.set(false);
      this.messages.update(messages => [
        ...messages,
        { text: response!.alt, isGpt: true, imageInfo: response },
      ]);
      console.log(response);
    });
  }

  // handleMessageWithFile({ prompt, file }: TextMessageFileEvent): void {
  //   console.log({ prompt, file });
  // }
  //
  // handleMessageWithSelect({ prompt, selectedOption }: TextMessageSelectEvent): void {
  //   console.log({ prompt, selectedOption });
  // }
}
