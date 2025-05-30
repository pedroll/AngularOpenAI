import {
  ImageGeneratedResponse,
  ImageVariationResponse,
  OrthographyResponse,
} from '@interfaces/index';

export interface Message {
  text: string;
  isGpt: boolean;
  info?: OrthographyResponse;
  audioUrl?: string;
  imageInfo?: ImageGeneratedResponse | ImageVariationResponse;
}
