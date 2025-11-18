import { BLUR_HASH } from "@/constants/Constants";
import { Image } from "expo-image";
import { View } from "../Themed";
interface Props {
  src: string;
}
export default function SongImage({ src }: Props) {
  return (
    <View>
      <Image
        style={{
          width: 100,
          height: 100,
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
