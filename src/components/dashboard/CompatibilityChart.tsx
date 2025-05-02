
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';

interface CompatibilityChartProps {
  data: Array<{ subject: string; A: number }>;
}

const CompatibilityChart: React.FC<CompatibilityChartProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Compatibility Dimensions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data} outerRadius="70%">
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <Radar
                name="Compatibility"
                dataKey="A"
                stroke="#9b87f5"
                fill="#9b87f5"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompatibilityChart;
