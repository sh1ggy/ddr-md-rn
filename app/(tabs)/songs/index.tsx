import { Text, View } from "@/components/Themed";
import { globalStyles } from "@/lib/globalStyles";
import { Pokemon } from "@/lib/types";
import { mode } from "@/stores/global";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import { useAtom } from "jotai";

export default function SongsScreen() {
  const [appMode] = useAtom(mode);
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
      <Link
        href={{
          pathname: "/songs/[id]",
          params: {
            id: "00000000-0000-0000-0000-000000000000",
            name: "ACE FOR ACES",
          },
        }}
      >
        <Text>Go to Song Details</Text>
      </Link>
    </View>
  );
}
