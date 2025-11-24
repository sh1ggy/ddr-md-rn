import { Text, View } from "@/components/Themed";
import { OCR } from "@/frame-processors/OCRPlugin";
import Entypo from "@expo/vector-icons/Entypo";
import { useRef, useState } from "react";
import {
  LogBox,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useFrameProcessor,
} from "react-native-vision-camera";
import { useSharedValue, Worklets } from "react-native-worklets-core";

export default function CameraScreen() {
  const [ocrState, setOcrState] = useState<string[]>();

  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice("back");
  const camera = useRef<Camera>(null);

  const updateOcrText = Worklets.createRunOnJS((text: string[]) => {
    setOcrState(text);
  });

  const frameProcessor = useFrameProcessor((frame) => {
    "worklet";
    const ocr = OCR(frame);
    if (ocr && ocr.recognized.texts.length !== 0) {
      // console.log(ocr.recognized.texts);
      updateOcrText(ocr.recognized.texts);
    }
  }, []);

  if (!hasPermission) return <Text>No permissions</Text>;
  if (device == null) return <Text>No camera device</Text>;
  return (
    <View style={styles.container}>
      <View
        style={{
          position: "absolute",
          bottom: 48,
          height: 500,
          padding: 4,
          marginHorizontal: 20,
          backgroundColor: "#000000CC",
          left: 50,
          right: 50,
          zIndex: 1,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "transparent",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, color: "white", fontWeight: 900 }}>
            OCR
          </Text>
          <TouchableOpacity
            onPress={() => {
              console.log(ocrState);
            }}
            style={{ marginLeft: "auto" }}
          >
            <Entypo color="white" name="clipboard" size={20} />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <Text style={{ textAlign: "left" }}>
            {ocrState && (
              <Text style={{ color: "white" }}>
                {ocrState.map((block: string, i: number) => (
                  <Text key={`${i}:${block}`} style={{ color: "white" }}>
                    {block}
                    {"\n"}
                  </Text>
                ))}
              </Text>
            )}
          </Text>
        </ScrollView>
      </View>
      <Camera
        ref={camera}
        photo
        frameProcessor={frameProcessor}
        device={device}
        isActive={true}
        enableFpsGraph
        enableZoomGesture
        photoQualityBalance="speed"
        style={styles.container}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
