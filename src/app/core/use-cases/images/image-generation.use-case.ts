import { environment } from '../../../../environments/environment';
import type { ImageGenerationResponse } from '@interfaces/index';

export interface ImageGenerationParameters {
  prompt: string;
  originalImage: string;
  maskImage: string;
}

interface Image {
  ok: boolean;
  url: string;
  alt: string;
}

type ImageGenerated = Image | void;
export const imageGenerationUseCase = async (
  parameters: ImageGenerationParameters
): Promise<ImageGenerated> => {
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

    const data = (await response.json()) as ImageGenerationResponse;

    return {
      ok: true,
      url: data.url,
      alt: data.revisedPrompt,
    };
  } catch {
    return;
  }
};
