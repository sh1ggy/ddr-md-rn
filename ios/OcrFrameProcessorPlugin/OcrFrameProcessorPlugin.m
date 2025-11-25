#import <VisionCamera/FrameProcessorPlugin.h>
#import <VisionCamera/FrameProcessorPluginRegistry.h>

#if __has_include("ddrmd/ddrmd-Swift.h")
#import "ddrmd/ddrmd-Swift.h"
#else
#import "ddrmd-Swift.h"
#endif

VISION_EXPORT_SWIFT_FRAME_PROCESSOR(OcrFrameProcessorPlugin, ocr)

// @interface OcrFrameProcessorPlugin (FrameProcessorPluginLoader)
// @end

// @implementation VisionCameraImageLabeler (FrameProcessorPluginLoader)
// + (void) load {
//   [FrameProcessorPluginRegistry addFrameProcessorPlugin:@"imageLabeler"
//     withInitializer:^FrameProcessorPlugin*(VisionCameraProxyHolder* proxy, NSDictionary* options) {
//     return [[VisionCameraImageLabeler alloc] initWithProxy:proxy withOptions:options];
//   }];
// }
// @end
