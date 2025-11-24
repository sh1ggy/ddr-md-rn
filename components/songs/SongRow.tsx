import { Text, View } from "@/components/Themed";
import { ICON_SIZE } from "@/lib/Constants";
import { Difficulty, Song } from "@/lib/types";
import { mode } from "@/stores/global";
import Entypo from "@expo/vector-icons/Entypo";
import { useRouter } from "expo-router";
import { useAtom } from "jotai";
import { StyleSheet, TouchableOpacity } from "react-native";
import SongDifficulties from "./SongDifficulties";
import SongImage from "./SongImage";

interface Props {
  song: Song;
}
export default function SongRow({ song }: Props) {
  const router = useRouter();
  const [appMode] = useAtom(mode);
  const { id, name } = song;
  const difficulty: Difficulty = appMode === "singles" ? song.sp : song.dp!; // todo !!!

  function goToDetails() {
    router.push({
      pathname: "/(tabs)/songs/[id]",
      params: {
        id: id,
        name: name,
      },
    });
  }
  return (
    <TouchableOpacity onPress={goToDetails} style={styles.container}>
      <SongImage
        src="https://3icecream.com/img/banners/f/ld6P1lbb0bPO9doqbbPOoPb8qoDo8id0.jpg"
        dimensions={{
          width: 50,
          height: 50,
        }}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.songTitle}>{song.title}</Text>
        <SongDifficulties difficulty={difficulty} />
      </View>
      <Entypo
        name="chevron-right"
        size={ICON_SIZE}
        color="white"
        style={{ marginLeft: "auto" }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    gap: 20,
    alignItems: "center",
    // backgroundColor: "red",
  },
  titleContainer: {
    // backgroundColor: "blue"
  },
  songTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  songSubtitle: {
    fontSize: 16,
    fontStyle: "italic",
    color: "grey",
  },
});
