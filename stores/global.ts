import { atom } from "jotai";

export const mode = atom<"singles" | "doubles">("singles");
