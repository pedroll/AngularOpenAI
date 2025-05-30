export interface ApiImageGenerationResponse {
  url: string;
  revisedPrompt: string;
}

export interface ImageGenerationParameters {
  prompt: string;
  originalImage?: string;
  maskImage?: string;
}

export interface ImageInfo {
  ok: boolean;
  url: string;
  alt: string;
}

export type ImageGeneratedResponse = ImageInfo | void;

// image variation
export interface ImageVariationParameters {
  imageUrl: string;
}

export interface ApiImageVariationResponse {
  url: string;
  openaiUrl: string;
}

export type ImageVariationResponse = ImageInfo | void;
