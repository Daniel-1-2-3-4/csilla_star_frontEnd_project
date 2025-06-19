"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";

export const description = "A mixed bar chart";

const subjectColours = {
  Deutsch: "#8C0B55", // Deep Berry Pink (as the base)
  GK: "#7A0A4B", // Slightly darker magenta
  Englisch: "#680941", // Mid-range deep magenta
  Ethik: "#560837", // Darker deep magenta
  Mathe: "#44072D", // Very dark deep magenta
};

const chartData = [
  { browser: "Deutsch", hours: 10, fill: `${subjectColours["Deutsch"]}` },
  { browser: "GK", hours: 5, fill: `${subjectColours["GK"]}` },
  { browser: "Englisch", hours: 3, fill: `${subjectColours["Englisch"]}` },
  { browser: "Ethik", hours: 0, fill: `${subjectColours["Ethik"]}` },
  { browser: "Mathe", hours: 8, fill: `${subjectColours["Mathe"]}` },
];

const chartConfig = {
  hours: {
    label: "hours",
  },
  GK: {
    label: "GK",
  },
  Deutsch: {
    label: "Deutsch",
  },
  Englisch: {
    label: "Englisch",
  },
  Ethik: {
    label: "Ethik",
  },
  Mathe: {
    label: "Mathe",
  },
} satisfies ChartConfig;

export function ChartBarMixed() {
  return (
    <Card className="w-full h-full bg-pink-500/30 backdrop-blur-sm flex pointer-events-none justify-center items-center">
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-[19dvh]">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
              right: 0,
            }}
          >
            <YAxis
              dataKey="browser"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tick={{ fill: "black", style: { fill: "black" } }}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="hours" type="number" hide />
            <Bar dataKey="hours" layout="vertical" radius={100} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
