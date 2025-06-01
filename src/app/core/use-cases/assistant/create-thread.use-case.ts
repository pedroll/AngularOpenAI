import { environment } from '../../../../environments/environment';

export const createThreadUseCase = async () => {
  try {
    const response = await fetch(`${environment.assistantBackendApi}/create-thread`, {
      method: 'POST',
    });

    if (!response.ok) throw new Error('Cant create thread.');

    const { id } = (await response.json()) as { id: string };

    return id;
  } catch {
    throw new Error('Cant create thread.');
  }
};
