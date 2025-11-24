import { Text, View } from "@/components/Themed";
import { DetailedSong, Difficulty } from "@/lib/types";
import { mode } from "@/stores/global";
import { useAtom } from "jotai";
import SongDifficulties from "./SongDifficulties";
import SongImage from "./SongImage";

interface Props {
  songDetails: DetailedSong;
}
export default function SongDetails({ songDetails }: Props) {
  const [appMode] = useAtom(mode);
  const { version, songLength } = songDetails;
  const songLengthMinutes: number = songLength / 60;
  const difficulty: Difficulty =
    appMode === "singles" ? songDetails.sp : songDetails.dp!; // TODO: address the !

  return (
    <View>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <SongImage
          src="https://3icecream.com/img/banners/f/ld6P1lbb0bPO9doqbbPOoPb8qoDo8id0.jpg"
          dimensions={{
            width: 100,
            height: 100,
          }}
        />
        {/* Version */}
        <View style={{ gap: 5 }}>
          <Text style={{ fontSize: 20 }}>
            <Text style={{ fontWeight: "bold" }}>Length: </Text>
            <Text style={{ fontStyle: "italic", color: "grey" }}>
              {`${songLengthMinutes} min`}
            </Text>
          </Text>
          {/* Length */}
          <Text style={{ fontSize: 16 }}>
            <Text style={{ fontWeight: "bold" }}>Version: </Text>
            <Text style={{ fontStyle: "italic", color: "grey" }}>
              {version}
            </Text>
          </Text>
          {/* Difficulties */}
          <SongDifficulties difficulty={difficulty} />
        </View>
      </View>
      <Text>{JSON.stringify(songDetails)}</Text>
    </View>
  );
}
