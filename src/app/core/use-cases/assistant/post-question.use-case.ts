import { environment } from '../../../../environments/environment';
import { UserQuerstionResponse } from '@interfaces/user-querstion-response.interface';

export const postQuestionUseCase = async (threadId: string, question: string) => {
  try {
    const response = await fetch(`${environment.assistantBackendApi}/user-question`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ threadId, question }),
    });

    if (!response.ok) throw new Error('Cant create thread.');

    const replies = (await response.json()) as UserQuerstionResponse[];
    console.log(replies);

    return replies;
  } catch {
    throw new Error('Cant post user question');
  }
};
