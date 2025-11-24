import type { Frame } from "react-native-vision-camera";
import { VisionCameraProxy } from "react-native-vision-camera";

const plugin = VisionCameraProxy.initFrameProcessorPlugin("OCR", {});

interface Result {
  count: number;
  recognized: {
    texts: string[];
    count: number;
  };
}

export function OCR(frame: Frame): Result {
  "worklet";
  if (plugin == null)
    throw new Error('Failed to load Frame Processor Plugin "OCR"!');
  return plugin.call(frame, {}) as unknown as Result;
}
