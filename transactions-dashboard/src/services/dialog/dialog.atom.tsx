import { atom } from "recoil";
import { Transaction } from "../transaction";

interface DialogAtomProps {
  open: boolean;
  editMode: boolean;
  dialogData: Transaction | undefined;
}

export const dialogAtom = atom<DialogAtomProps>({
  key: "dialogAtom",
  default: { open: false, editMode: false, dialogData: undefined },
});
