import {
  Box,
  Button,
  Card,
  CardHeader,
  Container,
  Divider,
  Fab,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useSetRecoilState } from "recoil";
import { Header, Filter, TransactionList, FormDialog } from "./components";
import { dialogAtom } from "./services/dialog";

function App() {
  const setDialog = useSetRecoilState(dialogAtom);
  return (
    <Box>
      <Header />
      <Container sx={{ paddingY: 2 }}>
        <Stack direction="column" spacing={2} alignItems="center">
          <Fab
            color="primary"
            aria-label="add"
            variant="extended"
            onClick={() =>
              setDialog({ open: true, editMode: false, dialogData: undefined })
            }
          >
            <AddIcon />
            Új tranzakció létrehozása
          </Fab>
          <Filter />
          <Card sx={{ minWidth: 500 }}>
            <CardHeader title="Tranzakciós lista" />
            <Divider />
            <TransactionList />
          </Card>
        </Stack>
        <FormDialog />
      </Container>
    </Box>
  );
}

export default App;
