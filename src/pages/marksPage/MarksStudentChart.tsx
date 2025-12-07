import {useMemo} from "react";
import {LineChart} from "@mui/x-charts/LineChart";
import {format} from "date-fns";
import {pl} from "date-fns/locale";
import type {IMark} from "../../interfaces/IMark.ts";
import {SectionCard} from "../../components/SectionCard.tsx";

type MarksChartProps = {
  marks: IMark[];
};

export function MarksStudentChart({marks}: MarksChartProps) {

  const {xLabels, series} = useMemo(() => {
    const uniqueDates = Array.from(new Set(marks.map((m) => m.date)));

    const labels = uniqueDates.map(date =>
      format(new Date(date), "d.MM", {locale: pl})
    );

    const uniqueSubjects = Array.from(new Set(marks.map((m) => m.language.subject)));

    const chartSeries = uniqueSubjects.map((subject) => {
      const data = uniqueDates.map((date) => {
        const foundMark = marks.find(
          (m) => m.date === date && m.language.subject === subject
        );
        return foundMark ? foundMark.mark : null;
      });

      return {
        data: data,
        label: subject,
      };
    });

    return {xLabels: labels, series: chartSeries};
  }, [marks]);

  return (
    <SectionCard>
      <LineChart
        sx={{height: "400px"}}
        xAxis={[{
          scaleType: 'point',
          data: xLabels,
        }]}
        series={series}
      />
    </SectionCard>
  );
}
