import { environment } from '../../../../environments/environment';
import type { ApiImageVariationResponse, ImageVariationResponse } from '@interfaces/index';
import { ImageVariationParameters } from '@interfaces/index';

export const imageVariationUseCase = async (
  parameters: ImageVariationParameters
): Promise<ImageVariationResponse> => {
  try {
    const { imageUrl } = parameters;

    const response = await fetch(`${environment.backendApi}/image-variation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        baseImage: imageUrl,
      }),
    });

    if (!response.ok) throw new Error('Cant generate image variation');

    const data = (await response.json()) as ApiImageVariationResponse;

    return {
      ok: true,
      url: data.url,
      alt: data.openaiUrl,
    };
  } catch {
    return;
  }
};
