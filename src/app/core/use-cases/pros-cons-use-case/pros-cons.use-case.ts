import { environment } from '../../../../environments/environment';
import type { ProsConsResponse } from '@interfaces/index';

export const prosConsUseCase = async (prompt: string) => {
  try {
    const response = await fetch(`${environment.backendApi}/pros-cons-discusser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) throw new Error('No se pudo realizar la comparación.');

    const data = (await response.json()) as ProsConsResponse;

    return {
      ok: true,
      ...data,
    };
  } catch {
    return {
      ok: false,
      role: '',
      content: 'No se pudo realizar la comparación.',
    };
  }
};
