import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { useRecoilState } from "recoil";
import {
  TransactionCategory,
  TransactionFilter,
  transactionFilterAtom,
} from "../../services";

export function Filter() {
  const [filter, setFilter] = useRecoilState<TransactionFilter>(
    transactionFilterAtom
  );

  return (
    <Card sx={{ minWidth: 500 }}>
      <CardHeader title="Szűrés" />
      <CardContent>
        <Stack direction="row" spacing={2}>
          <FormControl fullWidth>
            <InputLabel id="select-label" size="small">
              Tranzakciós kategória
            </InputLabel>
            <Select<TransactionCategory | "all">
              labelId="select-label"
              id="simple-select"
              size="small"
              value={filter.category}
              label="Tranzakciós kategória"
              onChange={({ target }) =>
                setFilter({
                  ...filter,
                  category: target.value as TransactionCategory,
                })
              }
            >
              <MenuItem value="all">Összes kategória</MenuItem>
              {Object.values(TransactionCategory).map((v, idx) => (
                <MenuItem key={v + idx} value={v}>
                  {v}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </CardContent>
    </Card>
  );
}
