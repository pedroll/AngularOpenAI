import { Injectable } from '@angular/core';
import { from, Observable, of, tap } from 'rxjs';
import {
  audioToTextUseCase,
  imageGenerationUseCase,
  imageVariationUseCase,
  orthographyUseCase,
  prosConsStreamUseCase,
  prosConsUseCase,
  textToAudioUseCase,
  translateTextUseCase,
} from '@use-cases/index';
import {
  ImageGenerationParameters,
  OrthographyResponse,
  ProsConsResponse,
  TranslateResponse,
} from '@interfaces/index';
import { createThreadUseCase } from '@use-cases/assistant/create-thread.use-case';
import { postQuestionUseCase } from '@use-cases/assistant/post-question.use-case';

@Injectable({
  providedIn: 'root',
})
export class OpenaiService {
  checkOrthography(prompt: string): Observable<OrthographyResponse> {
    // transform promise into observable
    return from(orthographyUseCase(prompt));
  }

  prosConsDiscusser(prompt: string): Observable<ProsConsResponse> {
    // transform promise into observable
    return from(prosConsUseCase(prompt));
  }

  prosConsDiscusserStream(prompt: string, abortSignal: AbortSignal) {
    return prosConsStreamUseCase(prompt, abortSignal);
  }

  translate(prompt: string, lang: string): Observable<TranslateResponse> {
    return from(translateTextUseCase(prompt, lang));
  }

  textToAudio(prompt: string, voice: string) {
    return from(textToAudioUseCase(prompt, voice));
  }

  audioTotext(audio: File, prompt?: string) {
    console.log(audio);
    return from(audioToTextUseCase(audio, prompt));
  }

  imageGeneration(imageGenerationParameters: ImageGenerationParameters) {
    return from(imageGenerationUseCase(imageGenerationParameters));
  }

  imageVariation(imageUrl: string) {
    return from(imageVariationUseCase({ imageUrl }));
  }

  createThread() {
    if (localStorage.getItem('threadId')) return of(localStorage.getItem('threadId'));

    return from(createThreadUseCase()).pipe(
      tap(threadId => localStorage.setItem('threadId', threadId))
    );
  }

  postQuestion(threadId: string, question: string) {
    return from(postQuestionUseCase(threadId, question));
  }
}
