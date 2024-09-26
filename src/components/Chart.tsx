// components/Chart.tsx
import React, {useEffect, useState} from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axiosClient from "@/utils/axiosClient";

interface Series {
  name: string;
  data: number[];
}

interface ChartOptions {
  title: {
    text: string;
  };
  xAxis: {
    categories: string[];
  };
  series: Series[];
}

const Chart: React.FC = () => {
  const [chartOptions, setChartOptions] = useState<ChartOptions>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get<ChartOptions>('/data');
        const data = response.data;

        setChartOptions({
          title: {
            text: 'Monthly Sales and Revenue'
          },
          xAxis: {
            categories: data.categories,
          },
          series: data.series,
        });
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {chartOptions && chartOptions.series ? (
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Chart;