import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { orthographyUseCase, prosConsStreamUseCase, prosConsUseCase } from '@use-cases/index';
import { OrthographyResponse, ProsConsResponse } from '@interfaces/index';

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
}
