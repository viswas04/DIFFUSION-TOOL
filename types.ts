export type AspectRatio = "1:1" | "16:9" | "9:16" | "4:3" | "3:4";
export type ImageQuality = '480p' | '720p' | '1080p' | '1440p' | '2160p';

export interface ImageMetadata {
  size: string;
  resolution: string;
  ratio: AspectRatio;
}