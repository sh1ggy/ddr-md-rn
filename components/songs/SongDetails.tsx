import { Text, View } from "@/components/Themed";
import { DetailedSong } from "@/lib/types";
import SongImage from "./SongImage";

interface Props {
  songDetails: DetailedSong;
}
export default function SongDetails({ songDetails }: Props) {
  return (
    <View>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <SongImage src="https://3icecream.com/img/banners/f/ld6P1lbb0bPO9doqbbPOoPb8qoDo8id0.jpg" />
        {/* Version */}
        <View style={{ gap: 5 }}>
          <Text style={{ fontSize: 20 }}>
            <Text style={{ fontWeight: "bold" }}>Version: </Text>
            <Text style={{ fontStyle: "italic", color: "greyF" }}>
              {songDetails.version}
            </Text>
          </Text>

          <Text>
            <Text style={{ fontWeight: "bold" }}>Version: </Text>
            <Text>{songDetails.version}</Text>
          </Text>
        </View>
      </View>
      <Text>{JSON.stringify(songDetails)}</Text>
    </View>
  );
}
