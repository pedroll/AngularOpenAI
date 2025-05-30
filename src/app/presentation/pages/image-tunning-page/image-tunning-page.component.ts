import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import {
  ChatMessageComponent,
  ChatMessageEditableImageComponent,
  TextMessageBoxComponent,
  TypingLoaderComponent,
  UserMessageComponent,
} from '@components/index';
import { OpenaiService } from '../../services/openai.service';
import { Message } from '@interfaces/message.interface';

@Component({
  selector: 'app-image-tunning-page',
  imports: [
    ReactiveFormsModule,
    ChatMessageComponent,
    TypingLoaderComponent,
    UserMessageComponent,
    TextMessageBoxComponent,
    TypingLoaderComponent,
    ChatMessageEditableImageComponent,
  ],
  templateUrl: './image-tunning-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageTunningPageComponent {
  public messages = signal<Message[]>([
    // for testing purposes
    {
      isGpt: true,
      text: 'Dummy Image',
      imageInfo: {
        ok: true,
        url: 'http://localhost:3000/api/v1/gpt/image-generation/1747907364478',
        alt: 'Dummy Image',
      },
    },
  ]);
  public isLoading = signal(false);
  public originalImage = signal<string | undefined>('');
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
  generateVariation(): void {}

  handleImageChange(newimage: string, originalImage: string): void {
    this.originalImage.set(originalImage);
    // todo: mask
    console.log({ newimage, imageUrl: originalImage });
  }
}
