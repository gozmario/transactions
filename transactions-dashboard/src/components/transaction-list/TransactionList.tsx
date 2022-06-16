import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  GET_TRANSACTION,
  REMOVE_TRANSACTION,
  Transaction,
} from "../../services";
import { useSetRecoilState } from "recoil";
import { useMutation } from "@apollo/client";
import { DateTime } from "luxon";
import { dialogAtom } from "../../services/dialog";
import { mapCategoryToIcon } from "../../utils";
import { Fragment } from "react";

interface TransactionListProps {
  data?: Transaction[];
}
export function TransactionList({ data }: TransactionListProps) {
  const setDialog = useSetRecoilState(dialogAtom);

  const [removeMutation] = useMutation(REMOVE_TRANSACTION, {
    refetchQueries: [GET_TRANSACTION],
    onCompleted: () => {},
  });

  const handleRemove = (id: string) => {
    removeMutation({ variables: { removeId: id } });
  };

  const handleEdit = (transaction: Transaction) => {
    setDialog({
      open: true,
      editMode: true,
      dialogData: transaction,
    });
  };

  if (!data || !data.length) {
    return (
      <Box sx={{ width: "100%", padding: 2 }}>
        <Typography>Nem található tranzakció</Typography>
      </Box>
    );
  }
  return (
    <List>
      {data.map((item) => (
        <ListItem
          key={item.id}
          secondaryAction={
            <Stack direction="row" spacing={1}>
              <IconButton aria-label="edit" onClick={() => handleEdit(item)}>
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={() => handleRemove(item.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          }
        >
          <ListItemIcon>{mapCategoryToIcon(item.category)}</ListItemIcon>
          <ListItemText
            sx={{ maxWidth: 200 }}
            primary={item.summary}
            secondary={DateTime.fromISO(`${item.paid}`).toFormat("yyyy.MM.dd")}
          />
          <ListItemText primary={`${item.sum} ${item.currency}`} />
        </ListItem>
      ))}
    </List>
  );
}
