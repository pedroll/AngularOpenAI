import { environment } from '../../../../environments/environment';

export const textToAudioUseCase = async (prompt: string, voice: string) => {
  try {
    const response = await fetch(`${environment.backendApi}/text-to-audio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        voice,
      }),
    });

    if (!response.ok) throw new Error('Audio cant be generated.');

    const audioFile = await response.blob();
    const audioUrl = URL.createObjectURL(audioFile);

    return {
      ok: true,
      message: prompt,
      audioUrl,
    };
  } catch {
    return {
      ok: false,
      message: 'Audio cant be generated.',
      audioUrl: '',
    };
  }
};
