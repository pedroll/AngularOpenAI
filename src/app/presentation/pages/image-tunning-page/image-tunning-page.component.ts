import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import {
  ChatMessageComponent,
  TextMessageBoxComponent,
  TypingLoaderComponent,
  UserMessageComponent,
} from '@components/index';
import { OpenaiService } from '../../services/openai.service';
import { Message } from '@interfaces/message.interface';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-image-tunning-page',
  imports: [
    ReactiveFormsModule,
    ChatMessageComponent,
    TypingLoaderComponent,
    UserMessageComponent,
    TextMessageBoxComponent,
    TypingLoaderComponent,
    NgOptimizedImage,
  ],
  templateUrl: './image-tunning-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageTunningPageComponent {
  public messages = signal<Message[]>([]);
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
}
