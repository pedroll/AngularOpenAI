import { environment } from '../../../../environments/environment';

/**
 *
 * @param prompt
 */
export async function* prosConsStreamUseCase(prompt: string) {
  try {
    const response = await fetch(`${environment.backendApi}/pros-cons-discusser-stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) throw new Error('No se pudo realizar la comparación.');

    const reader = response.body?.getReader();
    if (!reader) {
      console.log('No se pudo obtener el lector de la respuesta.');
      throw new Error('No se pudo obtener el lector de la respuesta.');
    }

    const decoder = new TextDecoder();
    let text = '';

    while (true) {
      const { value, done } = await reader.read();
      console.log({ text });

      if (done) {
        break;
      }
      const decodeChunk = decoder.decode(value, { stream: true });
      text += decodeChunk;
      console.log({ text: text || decodeChunk }); // utiliza decodeChunk si text es undefined

      yield text;
    }
    return text;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
