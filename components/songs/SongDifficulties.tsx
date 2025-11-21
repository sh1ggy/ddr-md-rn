import { Text, View } from "@/components/Themed";
import { DifficultyColors } from "@/constants/Colors";
import { Difficulty } from "@/lib/types";

interface Props {
  difficulty: Difficulty;
}
export default function SongDifficulties({ difficulty }: Props) {
  return (
    <View style={{ gap: 10, flexDirection: "row" }}>
      <Text style={{ fontStyle: "italic", color: DifficultyColors.beginner }}>
        {difficulty.beginner}
      </Text>
      <Text style={{ fontStyle: "italic", color: DifficultyColors.basic }}>
        {difficulty.easy}
      </Text>
      <Text style={{ fontStyle: "italic", color: DifficultyColors.difficult }}>
        {difficulty.medium}
      </Text>
      <Text style={{ fontStyle: "italic", color: DifficultyColors.expert }}>
        {difficulty.hard}
      </Text>
      <Text style={{ fontStyle: "italic", color: DifficultyColors.challenge }}>
        {difficulty.challenge}
      </Text>
    </View>
  );
}
