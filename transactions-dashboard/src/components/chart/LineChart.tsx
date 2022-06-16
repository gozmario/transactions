import { groupBy } from "lodash";
import { DateTime } from "luxon";
import React, { useMemo } from "react";
import { AxisOptions, Chart } from "react-charts";
import { Transaction } from "../../services";

type Series = {
  label: string;
  data: Transaction[];
};

interface LineChartProps {
  transactionData: Transaction[];
}
export function LineChart(props: LineChartProps) {
  const { transactionData } = props;

  const chartData: Series[] = useMemo(() => {
    const grouped = groupBy(transactionData, "category");
    return Object.entries(grouped).map((entry) => ({
      label: entry[0],
      data: entry[1],
    }));
  }, [transactionData]);

  const primaryAxis = React.useMemo(
    (): AxisOptions<Transaction> => ({
      getValue: (data) => data.paid,
      formatters: {
        scale: (time: Date) =>
          DateTime.fromISO(`${time}`).toFormat("yyyy.MM.dd"),
      },
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    (): AxisOptions<Transaction>[] => [
      {
        getValue: (data) => data.sum,
      },
    ],
    []
  );

  return (
    <Chart
      options={{
        data: chartData,
        primaryAxis,
        secondaryAxes,
      }}
    />
  );
}
