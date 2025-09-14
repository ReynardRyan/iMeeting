import React, { useEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import colors from "../../styles/colors";

const DonutChart = ({ data, chartId }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    let root = am5.Root.new(chartId);
    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        innerRadius: am5.percent(50),
        layout: root.verticalLayout,
      })
    );

    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "value",
        alignLabels: false,
      })
    );

    series.labels.template.set("forceHidden", true);
    series.ticks.template.set("forceHidden", true);

    series.set(
      "colors",
      am5.ColorSet.new(root, {
        colors: [am5.color(colors.chart), am5.color("#e9ecef")],
      })
    );

    series.data.setAll(data);

    chartRef.current = root;

    return () => {
      if (chartRef.current) {
        chartRef.current.dispose();
      }
    };
  }, [data, chartId]);

  return <div id={chartId} style={{ width: "38px", height: "38px" }}></div>;
};

export default DonutChart;
