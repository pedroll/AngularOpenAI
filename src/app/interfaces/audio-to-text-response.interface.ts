// YApi QuickType插件生成，具体参考文档:https://plugins.jetbrains.com/plugin/18847-yapi-quicktype/documentation

export interface AudioToTextResponse {
  duration: number;
  task: string;
  language: string;
  text: string;
  segments: Segment[];
}

export interface Segment {
  start: number;
  temperature: number;
  avg_logprob: number;
  no_speech_prob: number;
  end: number;
  tokens: number[];
  id: number;
  text: string;
  seek: number;
  compression_ratio: number;
}
