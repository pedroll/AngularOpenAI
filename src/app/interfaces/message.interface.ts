import { OrthographyResponse } from '@interfaces/orthography-response.interface';

export interface Message {
  text: string;
  isGpt: boolean;
  info?: OrthographyResponse;
}
