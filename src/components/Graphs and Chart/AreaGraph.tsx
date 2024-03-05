import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { v4 as uuidv4 } from 'uuid';


const AreaGraph = ({ lineData, colors, xKey, yKey }: { lineData: object[], colors: string[], xKey: string, yKey: string[]}) => {

  const gradientId = `gradient-${uuidv4()}`;

  return (
    <ResponsiveContainer width="100%" height={"100%"}>
      <AreaChart
        data={lineData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          {yKey.map((_, index: number) => (
            <linearGradient key={index} id={gradientId + index} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colors[index]} stopOpacity={0.8} />
              <stop offset="100%" stopColor={colors[index]} stopOpacity={0} />
            </linearGradient>
          ))}

        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#666666" />
        <XAxis
          dataKey={xKey}
          axisLine={{ stroke: "#666666", strokeWidth: 2 }}
          tick={{ fill: "#666666", fontSize: "12px" }}
        />
        <YAxis
          axisLine={{ stroke: "#666666", strokeWidth: 2 }}
          tick={{ fill: "#666666", fontSize: "12px" }}
        />
        <Tooltip
          cursor={{ strokeDasharray: "3 3" }}
          contentStyle={{ backgroundColor: "#17131e", borderRadius: "4px", padding: "8px", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}
        />
        {yKey.map((yItem: string, index: number) => (
          <Area
            key={index}
            type="monotone"
            dataKey={yItem}
            stroke={colors[index]}
            strokeWidth={2}
            fill={`url(#${gradientId + index})`}
          />
        ))}

      </AreaChart>
    </ResponsiveContainer>
  )
}

export default AreaGraph