import { VictoryChart, VictoryLine, VictoryLegend } from "victory";
import inventoryData from "./inventoryData";

const InventoryChart = () => {
  const prepareChartData = (data) => {
    const priceData = data.map((item) => ({ x: item.name, y: item.price }));
    const rateOfPurchaseData = data.map((item) => ({
      x: item.name,
      y: item.rateOfPurchase,
    }));
    const rateOfMakingData = data.map((item) => ({
      x: item.name,
      y: item.rateOfMaking,
    }));

    return [priceData, rateOfPurchaseData, rateOfMakingData];
  };

  const chartData = prepareChartData(inventoryData);

  return (
    <div
      style={{
        maxWidth: "100%",
        margin: "auto",
      }}
    >
      <VictoryChart height={400} width={600} domainPadding={20}>
        <VictoryLegend
          x={50}
          y={10}
          orientation="horizontal"
          data={[
            { name: "Price", symbol: { fill: "rgba(255, 99, 132, 0.2)" } },
            {
              name: "Rate of Purchase",
              symbol: { fill: "rgba(54, 162, 235, 0.2)" },
            },
            {
              name: "Rate of Making",
              symbol: { fill: "rgba(255, 206, 86, 0.2)" },
            },
          ]}
        />
        <VictoryLine data={chartData[0]} style={{ data: { stroke: "red" } }} />
        <VictoryLine data={chartData[1]} style={{ data: { stroke: "blue" } }} />
        <VictoryLine
          data={chartData[2]}
          style={{ data: { stroke: "green" } }}
        />
      </VictoryChart>
    </div>
  );
};

export default InventoryChart;
