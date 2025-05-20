import { environment } from '../../../../environments/environment';
import { AudioToTextResponse } from '@interfaces/index';

export const audioToTextUseCase = async (audio: string, prompt?: string) => {
  try {
    const formdata = new FormData();
    if (prompt) formdata.append('prompt', prompt);
    formdata.append('audio', audio);

    const response = await fetch(`${environment.backendApi}/audio-to-text`, {
      method: 'POST',

      body: formdata,
    });

    if (!response.ok) throw new Error('Text cant be generated.');
    console.log(response);
    const data = (await response.json()) as AudioToTextResponse;
    return {
      ok: true,
      message: prompt,
      info: data,
    };
  } catch {
    return {
      ok: false,
      message: 'text cant be generated.',
    };
  }
};
