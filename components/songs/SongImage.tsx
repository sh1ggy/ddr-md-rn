import { BLUR_HASH } from "@/constants/Constants";
import { Image } from "expo-image";
import { View } from "../Themed";
interface Props {
  src: string;
  dimensions: { width: number; height: number };
}
export default function SongImage({ src, dimensions }: Props) {
  const {width, height} = dimensions;
  return (
    <View>
      <Image
        style={{
          width: width,
          height: height,
          backgroundColor: "#0553",
        }}
        source={src}
        placeholder={BLUR_HASH}
        contentFit="cover"
        transition={1000}
      />
    </View>
  );
}
