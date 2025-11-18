import SONG_DETAILS from "@/assets/ACE FOR ACES.json";
import SongDetails from "@/components/songs/SongDetails";
import { globalStyles } from "@/lib/globalStyles";
import { DetailedSong } from "@/lib/types";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView } from "react-native";

export default function SongDetailScreen() {
  const { id } = useLocalSearchParams();
  const [songDetails, setSongDetails] = useState<DetailedSong>(
    SONG_DETAILS as unknown as DetailedSong
  );
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={globalStyles.scrollContentContainer}
    >
      <SongDetails songDetails={songDetails} />
    </ScrollView>
  );
}
