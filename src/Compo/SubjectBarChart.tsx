"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";
import { type FC } from "react";
import DecryptedText from "./DecryptedText";

type apiDataBarChart = {
  [subject: string]: number;
};

interface SubjectBarChartProps {
  barChartLoading: boolean;
  barChartError: string | null;
  barChartFetchedData: apiDataBarChart | null;
}

type ChartDataItemType = {
  subjectData: string;
  hours: number;
  fill: string;
};

const subjectColours = {
  Deutsch: "#8C0B55",
  GK: "#7A0A4B",
  Englisch: "#680941",
  Ethik: "#560837",
  Mathe: "#44072D",
};

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

export const ChartBarMixed: FC<SubjectBarChartProps> = ({
  barChartFetchedData,
  barChartLoading,
  barChartError,
}) => {
  const chartData: ChartDataItemType[] = Object.keys(subjectColours).map(
    (subjectKey) => {
      const subjectName = subjectKey as keyof typeof subjectColours;
      const actualHours = barChartFetchedData
        ? barChartFetchedData[subjectName] || 0
        : 0;

      return {
        subjectData: subjectName,
        hours: actualHours,
        fill: subjectColours[subjectName],
      };
    }
  );

  //loading
  if (barChartLoading) {
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
  if (barChartError) {
    return (
      <Card className="w-full h-full bg-pink-500/30 backdrop-blur-sm flex pointer-events-none justify-center items-center">
        <DecryptedText
          text={`${barChartError}`}
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

  //successfull display of data
  return (
    <Card className="w-full h-full bg-pink-500/30 backdrop-blur-sm flex pointer-events-none justify-center items-center">
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-[19dvh]">
          <BarChart
            accessibilityLayer
            data={chartData} // Using the dynamically created chartData
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              hide
              dataKey="subjectData" // Y-axis displays subject names from 'subjectData' key
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tick={{ fill: "black", style: { fill: "black" } }} // Ensure text is visible
              tickFormatter={
                (value) => chartConfig[value as keyof typeof chartConfig]?.label // Use chartConfig for labels
              }
            />
            <XAxis dataKey="hours" type="number" hide />
            <Bar dataKey="hours" layout="vertical" radius={4}>
              <LabelList
                dataKey="subjectData" // Label for subject name on the left of the bar
                position="insideLeft"
                offset={8}
                className="fill-foreground" // Use your actual foreground color class
                fontSize={12}
              />
              <LabelList
                dataKey="hours" // Label for the hour value on the right of the bar
                position="insideRight"
                stroke="white"
                offset={8}
                className="fill-foreground" // Use your actual foreground color class
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
