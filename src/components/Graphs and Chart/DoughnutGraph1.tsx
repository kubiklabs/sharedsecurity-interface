import { PieChart, Pie, Sector, Cell, Tooltip } from "recharts";

// const data = [
//   { name: "Group A", value: 30.90 },
//   { name: "Group B", value: 69.10 },
// ];

const COLORS = ["#2f67c3", "#f1e1d4"];

const renderActiveShape = (props: any, dataKey: any, labelKey: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
    name,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 50) * cos;
  const my = cy + (outerRadius + 60) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={3} fill={fill} stroke="none" />

      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fontSize={"14px"}
        fill={fill}
      >
        {`$
          ${payload[dataKey].toLocaleString("en", {
            maximumFractionDigits: 3,
          })}
  `}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill={"#b4a89e"}
        fontSize={"12px"}
        fontWeight={"bold"}
      >
        {`${payload[labelKey]} (${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const DoughnutGraph = ({
  doughnutData,
  dataKey,
  labelKey,
  colors,
}: {
  doughnutData: object[];
  dataKey: string;
  labelKey: string;
  colors: string[];
}) => {
  let activeIndex: Array<number> = [];

  console.log(doughnutData);

  doughnutData.map((entry: any, index: number) => {
    activeIndex.push(index);
  });

  return (
    <PieChart width={700} height={400}>
      <Pie
        data={doughnutData}
        cx={"50%"}
        cy={"50%"}
        innerRadius={80}
        activeIndex={activeIndex}
        // activeShape={renderActiveShape}
        activeShape={(props: any) =>
          renderActiveShape(props, dataKey, labelKey)
        }
        outerRadius={110}
        fill="#bc3d70"
        paddingAngle={1}
        // dataKey="value"
        dataKey={dataKey}
      >
        <Tooltip />
        {doughnutData.map((entry: any, index: number) => (
          <Cell
            key={`cell-${index}`}
            fill={colors[index % doughnutData.length]}
          />
          // <Cell key={`cell-${index}`} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default DoughnutGraph;
