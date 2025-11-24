import SONG_DETAILS from "@/assets/ACE FOR ACES.json";
import SongRow from "@/components/songs/SongRow";
import { Text, View } from "@/components/Themed";
import { globalStyles } from "@/lib/globalStyles";
import { Pokemon, Song } from "@/lib/types";
import { mode } from "@/stores/global";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useState } from "react";

export default function SongsScreen() {
  const [appMode] = useAtom(mode);
  const [song, setSong] = useState<Song>(SONG_DETAILS as unknown as Song);
  // Queries
  const { isPending, error, data, isFetching } = useQuery<Pokemon>({
    queryKey: ["pokedex"],
    queryFn: async () => {
      const r = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
      if (!r.ok) throw new Error("Failed to fetch Pokémon");
      return await r.json();
    },
  });

  if (isPending) return <Text>Loading...</Text>;

  if (error) return <Text>{"An error has occurred: " + error.message}</Text>;
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={globalStyles.title}>{appMode}</Text>
      <View
        style={globalStyles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <SongRow song={song} />
    </View>
  );
}
