import CoreImage
import MLKitTextRecognition
import MLKitVision
import VisionCamera

@objc(OcrFrameProcessorPlugin)
public class OcrFrameProcessorPlugin: FrameProcessorPlugin {
  public override init(proxy: VisionCameraProxyHolder, options: [AnyHashable: Any]! = [:]) {
    super.init(proxy: proxy, options: options)
  }

  public override func callback(_ frame: Frame, withArguments arguments: [AnyHashable: Any]?)
    -> Any?
  {
    // Convert to VisionImage
    let visionImage = VisionImage(buffer: frame.buffer)
    visionImage.orientation = frame.orientation  // fully qualified

    // Create a text recognizer
    let options = TextRecognizerOptions()
    let textRecognizer = TextRecognizer.textRecognizer(options: options)

    var recognizedTexts: [String] = []

    let semaphore = DispatchSemaphore(value: 0)

    textRecognizer.process(visionImage) { result, error in
      defer { semaphore.signal() }

      guard error == nil, let result = result else {
        print("MLKit error: \(error?.localizedDescription ?? "unknown")")
        return
      }

      for block in result.blocks {
        for line in block.lines {
          recognizedTexts.append(line.text)
        }
      }
    }

    // Wait synchronously (VisionCamera frame processor is synchronous)
    semaphore.wait()

    return [
      "count": recognizedTexts.count,
      "recognized": [
        "texts": recognizedTexts,
        "count": recognizedTexts.count,
      ],
    ]
  }
}

// MARK: - Orientation helper
extension Frame {
  var cameraOrientation: UIImage.Orientation {
    // If you need to handle front/back mirroring:
    if self.isMirrored {
      switch self.orientation {
      case .up: return .upMirrored
      case .down: return .downMirrored
      case .left: return .leftMirrored
      case .right: return .rightMirrored
      @unknown default: return .up
      }
    } else {
      return self.orientation
    }
  }
}
