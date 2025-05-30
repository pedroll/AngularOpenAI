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
import { ImageGenerationParameters, ImageInfo } from '@interfaces/index';

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
  public openaiService = inject(OpenaiService);

  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public originalImage = signal<string>('');
  public maskImage = signal<string>('');

  handleMessage(prompt: string): void {
    if (this.isLoading()) return;

    console.log(prompt, this.originalImage(), this.maskImage());
    this.isLoading.set(true);
    this.messages.update(messages => [...messages, { text: prompt, isGpt: false }]);

    const parameters: ImageGenerationParameters = {
      prompt,
      originalImage: this.originalImage(),
      maskImage: this.maskImage(),
    };
    this.openaiService.imageGeneration(parameters).subscribe(response => {
      this.isLoading.set(false);
      this.messages.update(messages => [
        ...messages,
        {
          text: response?.alt ?? 'Image edited',
          isGpt: true,
          imageInfo: response as ImageInfo,
        },
      ]);
      console.log(response);
    });
  }

  generateVariation(): void {
    if (!this.originalImage() || this.isLoading()) return;
    this.isLoading.set(true);
    this.openaiService.imageVariation(this.originalImage()!).subscribe(response => {
      this.isLoading.set(false);
      if (!response) return;
      this.messages.update(messages => [
        ...messages,
        { text: 'Image variation generated', isGpt: true, imageInfo: response },
      ]);
      console.log(response);
    });
  }

  handleImageChange(newimage: string, image: string): void {
    this.originalImage.set(image);
    this.maskImage.set(newimage);
    console.log({ newimage, imageUrl: image });
  }
}
