import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { orthographyUseCase } from '@use-cases/index';
import { OrthographyResponse } from '@interfaces/orthography-response.interface';

@Injectable({
  providedIn: 'root',
})
export class OpenaiService {
  constructor() {
    // todo: openAI
  }

  checkOrthography(prompt: string): Observable<OrthographyResponse> {
    // transform promise into observable
    return from(orthographyUseCase(prompt));
  }
}
