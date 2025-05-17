import { OrthographyResponse } from '@interfaces/index';

export interface Message {
  text: string;
  isGpt: boolean;
  info?: OrthographyResponse;
}
