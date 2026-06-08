import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { PieChart as PieChartIcon } from 'lucide-react';

const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f43f5e', '#f59e0b', '#06b6d4', '#6366f1', '#ec4899'];

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
    <div className="bg-[#111115]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 lg:p-8 mt-4 shadow-xl">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-blue-500/10 rounded-xl">
          <PieChartIcon className="w-5 h-5 text-blue-400" />
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">Language Usage</h2>
      </div>
      <p className="text-gray-400 text-sm mb-8">Distribution of languages across public repositories</p>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={4}
              dataKey="value"
              stroke="none"
              cornerRadius={4}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ 
                backgroundColor: 'rgba(17, 17, 21, 0.9)', 
                border: '1px solid rgba(255,255,255,0.1)', 
                borderRadius: '12px', 
                color: '#f3f4f6',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)'
              }}
              itemStyle={{ color: '#f3f4f6', fontWeight: 500 }}
              cursor={{ fill: 'transparent' }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              iconType="circle"
              wrapperStyle={{ paddingTop: '20px', fontSize: '13px', color: '#9ca3af' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LanguageChart;
