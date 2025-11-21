import { View } from "@/components/Themed";
import { mode } from "@/stores/global";
import { useAtom } from "jotai";
import { Switch, SwitchChangeEvent } from "react-native";

interface Props {}

export default function ModeSwitch({}: Props) {
  const [appMode, setAppMode] = useAtom(mode);

  function handleModeChange(e: SwitchChangeEvent) {
    setAppMode(e.nativeEvent.value ? "doubles" : "singles");
  }

  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
      <Switch
        onChange={(e) => handleModeChange(e)}
        value={appMode === "singles" ? false : true}
      />
    </View>
  );
}
