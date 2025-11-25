import { Frame, VisionCameraProxy } from 'react-native-vision-camera';

const plugin = VisionCameraProxy.initFrameProcessorPlugin('ocr', {})

interface OCRResult {
  count: number;
  recognized: {
    texts: string[];
    count: number;
  };
}

export function ocr(frame: Frame): OCRResult {
  'worklet'
  if (plugin == null) {
    throw new Error("Failed to load Frame Processor Plugin!")
  }
  return plugin.call(frame) as unknown as OCRResult
}
