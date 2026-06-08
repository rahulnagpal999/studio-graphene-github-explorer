import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#58a6ff', '#3fb950', '#d2a8ff', '#ff7b72', '#f0883e', '#e3b341', '#a5d6ff', '#79c0ff'];

const LanguageChart = ({ repos }) => {
  const data = useMemo(() => {
    if (!repos) return [];

    const langCounts = {};
    repos.forEach((repo) => {
      if (repo.language) {
        langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
      }
    });

    const formattedData = Object.keys(langCounts).map((key) => ({
      name: key,
      value: langCounts[key],
    }));

    // Sort by count and take top 8
    return formattedData.sort((a, b) => b.value - a.value).slice(0, 8);
  }, [repos]);

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mt-8 shadow-sm hover:border-gray-500 transition-colors">
      <h2 className="text-xl font-bold text-white mb-6 text-center">Top Languages Used</h2>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px', color: '#d1d5db' }}
              itemStyle={{ color: '#d1d5db' }}
            />
            <Legend verticalAlign="bottom" height={36} wrapperStyle={{ paddingTop: '20px' }}/>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LanguageChart;
