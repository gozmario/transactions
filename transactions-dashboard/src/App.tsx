import { useQuery } from "@apollo/client";
import {
  Box,
  Container,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { Header } from "./components";
import { Statistics, TransactionsLayout } from "./modules";
import {
  GetTransactionData,
  GET_TRANSACTION,
  mapFilterFoQuery,
  transactionFilterAtom,
} from "./services";

function App() {
  const filter = useRecoilValue(transactionFilterAtom);
  const { data, loading } = useQuery<GetTransactionData>(GET_TRANSACTION, {
    fetchPolicy: "network-only",
    variables: {
      filterTransactionInput: mapFilterFoQuery(filter),
    },
  });

  const memoizedData = useMemo(() => {
    if (data?.findAlltransaction) {
      return data.findAlltransaction;
    }
    return undefined;
  }, [data]);

  return (
    <Box>
      <Header />
      {loading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
      <Container sx={{ paddingY: 2 }}>
        <Grid container spacing={4}>
          <Grid item lg={6} xs={12}>
            <Typography variant="h4" sx={{ marginBottom: 2 }}>
              Statisztika
            </Typography>
            <Statistics data={memoizedData} />
          </Grid>
          <Grid item lg={6} xs={12}>
            <TransactionsLayout data={memoizedData} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default App;
