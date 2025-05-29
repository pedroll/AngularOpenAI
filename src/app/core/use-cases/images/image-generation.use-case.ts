import { environment } from '../../../../environments/environment';
import type { ApiImageGenerationResponse } from '@interfaces/index';
import { ImageGeneratedResponse, ImageGenerationParameters } from '@interfaces/index';

export const imageGenerationUseCase = async (
  parameters: ImageGenerationParameters
): Promise<ImageGeneratedResponse> => {
  try {
    const { prompt, originalImage, maskImage } = parameters;

    const response = await fetch(`${environment.backendApi}/image-generation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        originalImage,
        maskImage,
      }),
    });

    if (!response.ok) throw new Error('No se pudo realizar la corrección.');

    const data = (await response.json()) as ApiImageGenerationResponse;

    return {
      ok: true,
      url: data.url,
      alt: data.revisedPrompt,
    };
  } catch {
    return;
  }
};
