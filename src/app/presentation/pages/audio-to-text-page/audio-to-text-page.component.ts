import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { OpenaiService } from '../../services/openai.service';
import {
  ChatMessageComponent,
  TextMessageBoxFileComponent,
  TextMessageFileEvent,
  TypingLoaderComponent,
  UserMessageComponent,
} from '@components/index';
import { AudioToTextResponse, Message } from '@interfaces/index';

@Component({
  selector: 'app-audio-to-text-page',
  imports: [
    ChatMessageComponent,
    TypingLoaderComponent,
    UserMessageComponent,
    ReactiveFormsModule,
    ChatMessageComponent,
    TypingLoaderComponent,
    UserMessageComponent,
    TextMessageBoxFileComponent,
  ],
  templateUrl: './audio-to-text-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AudioToTextPageComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openaiService = inject(OpenaiService);

  handleMessageWithFile({ prompt, file }: TextMessageFileEvent): void {
    console.log({ prompt, file });

    this.isLoading.set(true);
    const messageText = prompt ?? file.name ?? 'Audio transcription';
    this.messages.update(messages => [...messages, { text: messageText, isGpt: false }]);

    this.openaiService
      .audioTotext(file, prompt as string)
      .subscribe(response => this.handlerResponse(response));
  }

  handlerResponse(response: AudioToTextResponse | undefined): void {
    console.log({ response });
    this.isLoading.set(false);
    if (!response) return;

    const responseText = `## Transcription:\n__Duration__ ${Math.round(response.duration)} seconds.\n## Text:\n${response.text}
    `;

    this.messages.update(messages => [
      ...messages,
      {
        text: responseText,
        isGpt: true,
      },
    ]);

    for (const segment of response.segments) {
      const segmentText = `## __Segment__:\n* __Start__ ${Math.round(segment.start)} seconds.\n* __End__ ${Math.round(segment.end)} seconds.\n* __Text__ ${segment.text}`;

      this.messages.update(messages => [
        ...messages,
        {
          text: segmentText,
          isGpt: true,
        },
      ]);
    }
  }
}
