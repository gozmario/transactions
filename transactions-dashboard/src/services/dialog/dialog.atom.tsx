import { atom } from "recoil";
import { Transaction, TransactionCategory } from "../transaction";

type DialogTransaction = Omit<Transaction, "id"> & { id?: string };
interface DialogAtomProps {
  open: boolean;
  editMode: boolean;
  dialogData: DialogTransaction;
}

export const defaultTransaction: DialogTransaction = {
  summary: "",
  category: TransactionCategory.housing,
  sum: 0,
  currency: "HUF",
  paid: new Date(),
};

export const defaultDialogValues: DialogAtomProps = {
  open: false,
  editMode: false,
  dialogData: defaultTransaction,
};

export const dialogAtom = atom<DialogAtomProps>({
  key: "dialogAtom",
  default: { open: false, editMode: false, dialogData: defaultTransaction },
});
