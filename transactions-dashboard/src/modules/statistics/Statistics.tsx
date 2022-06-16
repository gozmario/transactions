import { Card, Typography } from "@mui/material";
import { LineChart } from "../../components";
import { Transaction } from "../../services";

interface StatisticsProps {
  data?: Transaction[];
}
export function Statistics({ data }: StatisticsProps) {
  return (
    <Card
      sx={{
        height: 255,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
        overflowX: "scroll",
      }}
    >
      <>
        {!data ||
          (!data.length && (
            <Typography variant="h6">Nem található adat</Typography>
          ))}
        {data && data.length && <LineChart transactionData={data} />}
      </>
    </Card>
  );
}
