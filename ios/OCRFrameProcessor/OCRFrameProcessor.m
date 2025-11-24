#import <VisionCamera/FrameProcessorPlugin.h>
#import <VisionCamera/FrameProcessorPluginRegistry.h>

#if __has_include("ddrmd/ddrmd-Swift.h")
#import "ddrmd/ddrmd-Swift.h"
#else
#import "ddrmd-Swift.h"
#endif

VISION_EXPORT_SWIFT_FRAME_PROCESSOR(OCRFrameProcessorPlugin, OCR)