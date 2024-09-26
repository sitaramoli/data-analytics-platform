// src/components/FileUpload.tsx
import React, { useState } from 'react';
import * as Papa from 'papaparse';
import * as XLSX from 'xlsx';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const FileUpload: React.FC = () => {
  const [options, setOptions] = useState<any>({}); // Highcharts options
  const [error, setError] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();

      if (fileExtension === 'csv') {
        // Parse CSV file
        Papa.parse(file, {
          complete: (result) => {
            generateChartData({ 'Sheet1': result.data });
          },
          header: true,
          skipEmptyLines: true,
          error: (err) => {
            setError(`Error parsing CSV: ${err.message}`);
          },
        });
      } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
        // Parse Excel file
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Uint8Array(e.target!.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          generateChartData(workbook.Sheets);
        };
        reader.onerror = () => setError('Error reading Excel file');
        reader.readAsArrayBuffer(file);
      } else {
        setError('Invalid file type. Please upload a CSV or Excel file.');
      }
    }
  };

  const generateChartData = (sheets: any) => {
    const series = [];
    let categories = [];

    for (const sheetName in sheets) {
      const jsonData = XLSX.utils.sheet_to_json(sheets[sheetName], { header: 1 });
      if (jsonData.length > 0) {
        const header = jsonData[0];
        const data = jsonData.slice(1);

        categories = data.map(row => row[0]);
        const values = data.map(row => row[1]);

        series.push({
          name: sheetName, // Use the sheet name as series name
          data: values.map(Number),
        });
      }
    }

    // Set the chart options
    setOptions({
      title: {
        text: 'Chart from Uploaded Data',
      },
      xAxis: {
        categories: categories,
      },
      yAxis: {
        title: {
          text: 'Values',
        },
      },
      series: series,
    });
  };

  return (
    <div>
      <input type="file" accept=".csv, .xlsx, .xls" onChange={handleFileChange} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {options.series && <HighchartsReact highcharts={Highcharts} options={options} />}
    </div>
  );
};

export default FileUpload;