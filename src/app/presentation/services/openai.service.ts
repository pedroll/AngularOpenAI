import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { orthographyUseCase, prosConsStreamUseCase, prosConsUseCase } from '@use-cases/index';
import { OrthographyResponse, ProsConsResponse, TranslateResponse } from '@interfaces/index';
import { translateTextUseCase } from '@use-cases/translate-use-case/translate-text.use-case';

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
}
