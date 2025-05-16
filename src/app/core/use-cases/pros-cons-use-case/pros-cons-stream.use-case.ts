import { environment } from '../../../../environments/environment';

export const prosConsStreamUseCase = async (prompt: string) => {
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
    const done = false;

    while (!done) {
      const { value, done } = await reader.read();
      text += decoder.decode(value);
      console.log(text);

      // Aquí puedes hacer lo que quieras con el chunk de datos

      // Por ejemplo, si quieres actualizar el estado de tu componente con el chunk de datos
      // this.setState(prevState => ({
      //   data: prevState.data + chunk
      // }));
      return;
    }
  } catch {
    return;
  }
};
