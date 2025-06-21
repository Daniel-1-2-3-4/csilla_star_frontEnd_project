"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";
import type { FC } from "react";
import DecryptedText from "./DecryptedText";

type apiDataStackedBarChart = {
  [date: string]: {
    [subject: string]: number;
  };
};

type ChartDataItemType = {
  date: string;
  Deutsch: number;
  Englisch: number;
  Gk: number;
  Mathe: number;
  Ethik: number;
};

interface SUbject_Stacked_BarChartProps {
  stackedBarChartLoading: boolean;
  stackedBarChartError: string | null;
  stackedBarChartFetchedData: apiDataStackedBarChart | null;
}

const subjectColours = {
  Mathe: "#8B008B", // Dark Magenta (Distinct, slightly warmer, vibrant)
  GK: "#6A0DAD", // Dark Orchid (More purple-blue, noticeable shift)
  Englisch: "#4B0082", // Indigo (Classic deep blue-purple, very rich)
  Deutsch: "#3B0B7D", // Deep Royal Violet (Strong, dark blue-purple)
  Ethik: "#22005A", // Very Dark Midnight Blue-Purple (Deepest, most blue-leaning for max distinction)
};

const transformStackedChartData = (
  apiData: apiDataStackedBarChart
): ChartDataItemType[] => {
  const transformedData: ChartDataItemType[] = [];
  const allSubjects = ["Deutsch", "Englisch", "Gk", "Mathe", "Ethik"];

  for (const date in apiData) {
    if (Object.prototype.hasOwnProperty.call(apiData, date)) {
      const subjectData = apiData[date];
      const item: ChartDataItemType = {
        date: date,
        Deutsch: 0,
        Englisch: 0,
        Gk: 0,
        Mathe: 0,
        Ethik: 0,
      };

      for (const subject in subjectData) {
        if (Object.prototype.hasOwnProperty.call(subjectData, subject)) {
          if (allSubjects.includes(subject)) {
            (item as any)[subject] = subjectData[subject];
          }
        }
      }
      transformedData.push(item);
    }
  }

  transformedData.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return transformedData;
};

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

export const Subject_Stacked_BarChart: FC<SUbject_Stacked_BarChartProps> = ({
  stackedBarChartLoading,
  stackedBarChartError,
  stackedBarChartFetchedData,
}) => {
  const chartData: ChartDataItemType[] =
    stackedBarChartFetchedData != null
      ? transformStackedChartData(stackedBarChartFetchedData)
      : [];

  //loading
  if (stackedBarChartLoading) {
    return (
      <Card className="w-full h-full bg-pink-500/30 backdrop-blur-sm flex pointer-events-none justify-center items-center">
        <DecryptedText
          text="Loading Data..." // Corrected text
          speed={100}
          maxIterations={20}
          characters="ABCD1234!.?"
          sequential={true}
          className="revealed"
          animateOn="view"
          revealDirection="start"
          encryptedClassName="encrypted"
        />
      </Card>
    );
  }

  //error
  if (stackedBarChartError) {
    return (
      <Card className="w-full h-full bg-pink-500/30 backdrop-blur-sm flex pointer-events-none justify-center items-center">
        <DecryptedText
          text={`${stackedBarChartError}`}
          speed={100}
          maxIterations={20}
          characters="ABCD1234!.?"
          sequential={true}
          className="revealed"
          animateOn="view"
          revealDirection="start"
          encryptedClassName="encrypted"
        />
      </Card>
    );
  }

  console.log(stackedBarChartFetchedData);
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
};
