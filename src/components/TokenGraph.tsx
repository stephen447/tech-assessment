"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// TypeScript types
interface BlockData {
  Date: string;
  Time: string;
}

interface TradeData {
  Buy: {
    Currency: {
      Name: string;
      Symbol: string;
    };
    Price: number;
  };
}

interface DEXTrade {
  Block: BlockData;
  Trade: TradeData;
}

interface TokenGraphProps {
  prices: DEXTrade[];
}

const TokenGraph: React.FC<TokenGraphProps> = ({ prices }) => {
  // Format data for the graph
  const chartData = prices.map(({ Block, Trade }) => ({
    date: new Date(Block.Time).toLocaleDateString(),
    price: Trade.Buy.Price,
  }));

  return (
    <div
      className="w-full h-[400px] mt-6"
      data-testid="token-graph"
      tabIndex={0}
    >
      {prices.length === 0 ? (
        <p className="text-center text-gray-400" role="alert">
          No price data available
        </p>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="date" tick={{ fill: "#fff" }} />
            <YAxis tick={{ fill: "#fff" }} />{" "}
            <Tooltip
              content={({ payload }) => {
                if (!payload || payload.length === 0) return null;
                const { date, price } = payload[0].payload;
                return (
                  <div
                    className="bg-background_light dark:bg-background_dark border-2 border-border_light dark:border-border_dark p-2 rounded"
                    role="tooltip"
                    aria-live="polite"
                  >
                    <p>{date}</p>
                    <p>Price: {price}</p>
                  </div>
                );
              }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#4CAF50"
              strokeWidth={2}
              data-testid="token-graph-point-0"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default TokenGraph;
