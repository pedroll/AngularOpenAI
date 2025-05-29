export interface ApiImageGenerationResponse {
  url: string;
  revisedPrompt: string;
}

export interface ImageGenerationParameters {
  prompt: string;
  originalImage?: string;
  maskImage?: string;
}

export interface Image {
  ok: boolean;
  url: string;
  alt: string;
}

export type ImageGeneratedResponse = Image | void;
