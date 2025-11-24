import AVFoundation
import CoreImage
import Foundation
import Vision
import VisionCamera

@objc(OCRFrameProcessorPlugin)
public class OCRFrameProcessorPlugin: FrameProcessorPlugin {
  public override init(proxy: VisionCameraProxyHolder, options: [AnyHashable: Any]! = [:]) {
    super.init(proxy: proxy, options: options)

    print(
      "OCRFrameProcessorPlugin initialized with options: \(String(describing: options))")
  }

  public override func callback(_ frame: Frame, withArguments arguments: [AnyHashable: Any]?)
    -> Any?
  {
    // Appropriate conversions from the Frame object to be able to be OCR'd
    guard let imageBuffer = CMSampleBufferGetImageBuffer(frame.buffer) else {
      print("no CVPixelBuffer from CMSampleBuffer")
      return nil
    }

    let ciImage = CIImage(cvPixelBuffer: imageBuffer)
    let context = CIContext(options: nil)
    guard let cgImage = context.createCGImage(ciImage, from: ciImage.extent) else {
      print("CiImage > CGImage failure")
      return nil
    }

    var recognized: [String: Any] = [:]
    let request = VNRecognizeTextRequest { request, error in
      recognized = recognizeTextHandler(request: request, error: error)
    }
    let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
    // actually get the observations from the image buffer being checked
    try? handler.perform([request])

    return [
      "recognized": recognized,
      "count": recognized.count,
    ]
  }
}

func recognizeTextHandler(request: VNRequest, error: Error?) -> [String: Any] {
  guard let observations = request.results as? [VNRecognizedTextObservation] else {
    return [:]
  }
  let strings: [String] = observations.compactMap { obs in
    obs.topCandidates(1).first?.string
  }
  return [
    "texts": strings,
    "count": strings.count,
  ]
}
