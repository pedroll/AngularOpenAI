import { environment } from '../../../../environments/environment';
import { AudioToTextResponse } from '@interfaces/index';

export const audioToTextUseCase = async (audio: File, prompt?: string) => {
  try {
    console.log(audio);
    console.log(prompt);
    const formdata = new FormData();
    if (prompt) formdata.append('prompt', prompt);
    formdata.append('audio', audio);
    console.log(formdata);
    const response = await fetch(`${environment.backendApi}/audio-to-text`, {
      method: 'POST',

      body: formdata,
    });

    if (!response.ok) throw new Error('Text cant be generated.');
    console.log(response);
    const data = (await response.json()) as AudioToTextResponse;

    return data;
  } catch {
    return;
  }
};
