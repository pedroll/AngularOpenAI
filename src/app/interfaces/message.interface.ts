// src/app/interfaces/message.interface.ts
import { ImageInfo, OrthographyResponse } from '@interfaces/index';

export interface Message {
  text: string;
  isGpt: boolean;
  info?: OrthographyResponse;
  audioUrl?: string;
  imageInfo?: ImageInfo;
}
