"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";

const subjectColours = {
  Mathe: "#8B008B", // Dark Magenta (Distinct, slightly warmer, vibrant)
  GK: "#6A0DAD", // Dark Orchid (More purple-blue, noticeable shift)
  Englisch: "#4B0082", // Indigo (Classic deep blue-purple, very rich)
  Deutsch: "#3B0B7D", // Deep Royal Violet (Strong, dark blue-purple)
  Ethik: "#22005A", // Very Dark Midnight Blue-Purple (Deepest, most blue-leaning for max distinction)
};

const chartData = [
  {
    day: "Mon",
    Deutsch: 186,
    GK: 80,
    Englisch: 100,
    Ethik: 120,
  },
  {
    day: "Sun",
    Deutsch: 186,
    GK: 80,
    Englisch: 100,
    Ethik: 120,
  },
];

const chartConfig = {
  Deutsch: {
    label: "Deutsch",
    color: `${subjectColours["Deutsch"]}`,
  },
  GK: {
    label: "GK",
    color: `${subjectColours["GK"]}`,
  },
  Englisch: {
    label: "Englisch",
    color: `${subjectColours["Englisch"]}`,
  },
  Ethik: {
    label: "Ethik",
    color: `${subjectColours["Ethik"]}`,
  },
  Mathe: {
    label: "Mathe",
    color: `${subjectColours["Mathe"]}`,
  },
} satisfies ChartConfig;

const fetchData = () => {
  //logic
};

export function SUbject_Stacked_BarChart() {
  return (
    <Card className="w-full h-full bg-pink-500/30 backdrop-blur-sm flex pointer-events-none justify-center items-center">
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-[19dvh]">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tick={{ fill: "black", style: { fill: "black" } }}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartLegend content={<ChartLegendContent />} />
            {Object.entries(subjectColours).map(
              ([subject_name, subject_color], i) => (
                <Bar
                  key={i}
                  dataKey={`${subject_name}`}
                  stackId="a"
                  fill={`${subject_color}`}
                  radius={[4, 4, 0, 0]}
                />
              )
            )}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
