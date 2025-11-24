import { VisionCameraProxy, Frame } from "react-native-vision-camera";

type BoundingFrame = {
  x: number;
  y: number;
  width: number;
  height: number;
  boundingCenterX: number;
  boundingCenterY: number;
};
type Point = { x: number; y: number };

type TextElement = {
  text: string;
  frame: BoundingFrame;
  cornerPoints: Point[];
};

type TextLine = {
  text: string;
  elements: TextElement[];
  frame: BoundingFrame;
  recognizedLanguages: string[];
  cornerPoints: Point[];
};

export type TextBlock = {
  text: string;
  lines: TextLine[];
  frame: BoundingFrame;
  recognizedLanguages: string[];
  cornerPoints: Point[];
};

type Text = {
  text: string;
  blocks: TextBlock[];
};

export type OCRFrame = {
  result: Text;
};

const plugin = VisionCameraProxy.initFrameProcessorPlugin("ocr", {});

export function ocr(frame: Frame): OCRFrame {
  "worklet";
  if (plugin == null) {
    throw new Error("Failed to load Frame Processor Plugin!");
  }
  return plugin.call(frame, {}) as unknown as OCRFrame;
}
