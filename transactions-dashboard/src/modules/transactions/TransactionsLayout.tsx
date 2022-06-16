import { Stack, Fab, Card, CardHeader, Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useSetRecoilState } from "recoil";
import { Filter, FormDialog, TransactionList } from "../../components";
import { defaultTransaction, dialogAtom } from "../../services/dialog";
import { Transaction } from "../../services";

interface TransactionsLayoutProps {
  data?: Transaction[];
}
export function TransactionsLayout({ data }: TransactionsLayoutProps) {
  const setDialog = useSetRecoilState(dialogAtom);

  return (
    <Stack direction="column" spacing={2} alignItems="center">
      <Fab
        color="primary"
        aria-label="add"
        variant="extended"
        onClick={() =>
          setDialog({
            open: true,
            editMode: false,
            dialogData: defaultTransaction,
          })
        }
      >
        <AddIcon />
        Új tranzakció létrehozása
      </Fab>
      <Filter />
      <Card sx={{ minWidth: 500 }}>
        <CardHeader title="Tranzakciós lista" />
        <Divider />
        <TransactionList data={data} />
      </Card>
      <FormDialog />
    </Stack>
  );
}
