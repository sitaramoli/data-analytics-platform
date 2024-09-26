// src/pages/index.tsx
import React from 'react';
import FileUpload from '../components/FileUpload';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Upload CSV/Excel File and Generate Chart with Highcharts</h1>
      <FileUpload />
    </div>
  );
};

export default Home;