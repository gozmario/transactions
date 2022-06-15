import {
  Box,
  IconButton,
  LinearProgress,
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
  GetTransactionData,
  GET_TRANSACTION,
  mapFilterFoQuery,
  REMOVE_TRANSACTION,
  Transaction,
  transactionFilterAtom,
} from "../../services";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useMutation, useQuery } from "@apollo/client";
import { DateTime } from "luxon";
import { dialogAtom } from "../../services/dialog";
import { mapCategoryToIcon } from "../../utils";

export function TransactionList() {
  const filter = useRecoilValue(transactionFilterAtom);
  const setDialog = useSetRecoilState(dialogAtom);
  const { data, loading } = useQuery<GetTransactionData>(GET_TRANSACTION, {
    variables: {
      filterTransactionInput: mapFilterFoQuery(filter),
    },
  });
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
  if (loading) {
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  }
  if (!data?.findAlltransaction || !data?.findAlltransaction.length) {
    return (
      <Box sx={{ width: "100%", padding: 2 }}>
        <Typography>Üres lista</Typography>
      </Box>
    );
  }
  return (
    <List>
      {data.findAlltransaction.map((item) => (
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
