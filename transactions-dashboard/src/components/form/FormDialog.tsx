import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { useRecoilState } from "recoil";
import { dialogAtom } from "../../services/dialog";
import {
  Button,
  DialogContent,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  CREATE_TRANSACTION,
  GET_TRANSACTION,
  Transaction,
  TransactionCategory,
  UPDATE_TRANSACTION,
} from "../../services";
import { useEffect, useState } from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { useMutation } from "@apollo/client";
import { LoadingButton } from "@mui/lab";

type CreateTransaction = Omit<Transaction, "id">;

const defaultTransaction: CreateTransaction = {
  summary: "",
  category: TransactionCategory.housing,
  sum: 0,
  currency: "HUF",
  paid: new Date(),
};

const defaultDialogValues = {
  open: false,
  editMode: false,
  dialogData: undefined,
};

export function FormDialog() {
  const [dialog, setDialog] = useRecoilState(dialogAtom);

  const [transaction, setTransaction] =
    useState<CreateTransaction>(defaultTransaction);

  // TODO: replace this with an atom
  useEffect(() => {
    if (!!dialog.dialogData && dialog.editMode) {
      setTransaction(dialog.dialogData);
    } else {
      setTransaction(defaultTransaction);
    }
  }, [dialog]);

  const [createMutation, { loading }] = useMutation(CREATE_TRANSACTION, {
    refetchQueries: [GET_TRANSACTION],
    onCompleted: () => {
      setTransaction(defaultTransaction);
      setDialog(defaultDialogValues);
    },
  });

  const [updateMutation, { loading: updateLoading }] = useMutation(
    UPDATE_TRANSACTION,
    {
      refetchQueries: [GET_TRANSACTION],
      onCompleted: () => {
        setTransaction(defaultTransaction);
        setDialog(defaultDialogValues);
      },
    }
  );

  const handleClose = () => {
    setDialog({ ...dialog, open: false });
  };

  const handleSubmit = () => {
    if (dialog.editMode && dialog.dialogData) {
      updateMutation({
        variables: {
          updateTransactionInput: {
            ...transaction,
            id: dialog.dialogData.id,
          },
        },
      });
    } else {
      createMutation({
        variables: {
          createTransactionInput: transaction,
        },
      });
    }
  };
  const title = dialog.editMode
    ? "Tranzakció szerkesztése"
    : "Új tranzakció létrehozása";
  return (
    <Dialog onClose={handleClose} open={dialog.open} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Stack direction="column" spacing={2}>
          <Stack spacing={1}>
            <Typography>Tranzakciós kategória</Typography>
            <Select
              labelId="select-label"
              id="simple-select"
              size="small"
              defaultValue={TransactionCategory.housing}
              value={transaction.category}
              label="Tranzakciós kategória"
              onChange={(e) =>
                setTransaction((prev) => ({
                  ...prev,
                  category: e.target.value as TransactionCategory,
                }))
              }
            >
              {Object.values(TransactionCategory).map((v, idx) => (
                <MenuItem key={v + idx} value={v}>
                  {v}
                </MenuItem>
              ))}
            </Select>
          </Stack>
          <Stack spacing={1}>
            <Typography>Leírás</Typography>
            <TextField
              size="small"
              placeholder="leírás..."
              value={transaction.summary}
              onChange={(e) =>
                setTransaction((prev) => ({
                  ...prev,
                  summary: e.target.value,
                }))
              }
            />
          </Stack>
          <Stack spacing={1}>
            <Typography>Összeg</Typography>
            <TextField
              size="small"
              type="number"
              placeholder="összeg"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              value={transaction.sum}
              onChange={(e) =>
                setTransaction((prev) => ({
                  ...prev,
                  sum: parseInt(e.target.value),
                }))
              }
            />
          </Stack>
          <Stack spacing={1}>
            <Typography>Valuta</Typography>
            <Select
              labelId="currency-label"
              id="simple-currency"
              size="small"
              defaultValue={TransactionCategory.housing}
              value={transaction.currency}
              label="Valuta"
              onChange={(e) =>
                setTransaction((prev) => ({
                  ...prev,
                  currency: e.target.value,
                }))
              }
            >
              <MenuItem value="HUF">HUF</MenuItem>
              <MenuItem value="EUR">EUR</MenuItem>
              <MenuItem value="USD">USD</MenuItem>
            </Select>
            <Stack spacing={1}>
              <Typography>Dátum</Typography>
              <DesktopDatePicker
                label="Dátum"
                inputFormat="MM/dd/yyyy"
                value={transaction.paid}
                onChange={(paid) =>
                  setTransaction((prev) => ({ ...prev, paid }))
                }
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </Stack>
        </Stack>
      </DialogContent>
      <Stack
        justifyContent="flex-end"
        direction="row"
        spacing={2}
        sx={{ paddingX: 2, marginBottom: 2 }}
      >
        <Button variant="outlined" onClick={handleClose}>
          Mégsem
        </Button>
        <LoadingButton
          variant="contained"
          loading={loading || updateLoading}
          onClick={handleSubmit}
        >
          Mentés
        </LoadingButton>
      </Stack>
    </Dialog>
  );
}
