
import React from 'react';
import MetricCard from '../components/MetricCard';
import { 
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Legend, PieChart, Pie, Cell, BarChart, LabelList
} from 'recharts';
import { 
  Users, DollarSign, Smartphone, Clock, TrendingUp, Layers, Info
} from 'lucide-react';

interface ExecutiveOverviewProps {
  selectedCategory: string | null;
  onCategorySelect: (category: string) => void;
}

// Dữ liệu doanh thu so với thời gian đọc trung bình
const revenueVsTimeData = [
  { name: 'T2', doanhThu: 4200, gio: 1200 },
  { name: 'T3', doanhThu: 3800, gio: 1100 },
  { name: 'T4', doanhThu: 5100, gio: 1400 },
  { name: 'T5', doanhThu: 4600, gio: 1350 },
  { name: 'T6', doanhThu: 6200, gio: 1800 },
  { name: 'T7', doanhThu: 7800, gio: 2400 },
  { name: 'CN', doanhThu: 8500, gio: 2600 },
];

// Phân bổ doanh thu theo loại sách và kênh (Web vs App)
const channelData = [
  { name: 'Sách giấy', web: 4000, app: 800, total: 4800 },
  { name: 'E-book', web: 1500, app: 5200, total: 6700 },
];

// Phân khúc người dùng dựa trên hành vi
const segments = [
  { name: 'Chỉ đọc', value: 45, color: '#93c5fd' },
  { name: 'Chỉ mua', value: 25, color: '#60a5fa' },
  { name: 'Cả hai', value: 30, color: '#1e40af' },
];

// Top các thể loại sách mang lại doanh thu cao nhất
const topCategories = [
  { name: 'Kinh tế', value: 4500 },
  { name: 'Kỹ năng', value: 3200 },
  { name: 'Văn học', value: 2800 },
  { name: 'Tâm lý', value: 2100 },
  { name: 'Thiếu nhi', value: 1800 },
];

/**
 * Trang Tổng Quan (Executive Overview): 
 * Cung cấp cái nhìn toàn cảnh về các chỉ số kinh doanh chính (KPIs) và sức khỏe hệ thống.
 */
const ExecutiveOverview: React.FC<ExecutiveOverviewProps> = ({ selectedCategory, onCategorySelect }) => {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Tiêu đề và chú thích chung */}
      <div className="mb-3 shrink-0 flex justify-between items-end border-b border-slate-100 pb-3">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-normal leading-relaxed">Hiệu quả Kinh doanh & Doanh thu</h2>
          <p className="text-slate-500 text-[11px] font-bold uppercase mt-1 tracking-widest flex items-center gap-1.5">
            <Info size={12} className="text-blue-600" /> Tổng hợp hiệu suất kinh doanh từ đa kênh (Web/App).
          </p>
        </div>
        <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider shadow-md shadow-blue-100">DỮ LIỆU LIVE</div>
      </div>

      {/* Thẻ chỉ số KPI */}
      <div className="grid grid-cols-4 gap-3 mb-4 shrink-0">
        <MetricCard label="DAU/MAU" subtext="(tỷ lệ gắn kết)" value={selectedCategory ? "51.2%" : "42.5%"} change="+3.2%" isPositive={true} icon={<Users />} />
        <MetricCard label="ARPU" subtext="(doanh thu TB/người)" value={selectedCategory ? "$12.4" : "$8.9"} change="+12.5%" isPositive={true} icon={<DollarSign />} />
        <MetricCard label="Tỷ lệ chuyển đổi" value={selectedCategory ? "8.4%" : "6.2%"} change="+0.4%" isPositive={true} icon={<Smartphone />} />
        <MetricCard label="Tỷ lệ đọc lại" value={selectedCategory ? "62.1%" : "45.2%"} change="+2.1%" isPositive={true} icon={<Clock />} />
      </div>

      {/* Biểu đồ tương quan và kênh bán */}
      <div className="grid grid-cols-2 gap-4 flex-1 min-h-0 mb-4">
        {/* Biểu đồ kết hợp: Cột (Doanh thu) + Đường (Thời gian đọc) */}
        <div className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-col shadow-sm">
          <h3 className="text-xs font-black text-slate-800 uppercase mb-3 flex items-center gap-2 border-b border-slate-50 pb-2 tracking-widest">
            <TrendingUp size={14} className="text-blue-600" /> Doanh thu vs Thời gian đọc sách
          </h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={revenueVsTimeData} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 11, fontWeight: 700}} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                <Tooltip />
                <Legend iconSize={8} wrapperStyle={{fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', paddingTop: '10px'}} />
                <Bar yAxisId="left" dataKey="doanhThu" fill="#1e40af" radius={[4, 4, 0, 0]} name="Doanh thu ($)" barSize={32} />
                <Line yAxisId="right" type="monotone" dataKey="gio" stroke="#3b82f6" strokeWidth={4} dot={{r: 4, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2}} name="Thời gian (h)" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Biểu đồ cột chồng: Phân phối doanh thu theo kênh bán */}
        <div className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-col shadow-sm">
          <h3 className="text-xs font-black text-slate-800 uppercase mb-3 flex items-center gap-2 border-b border-slate-50 pb-2 tracking-widest">
            <Layers size={14} className="text-blue-600" /> Phân phối theo Kênh Web/App
          </h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channelData} margin={{ top: 25, right: 10, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 11, fontWeight: 700}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Legend iconSize={8} wrapperStyle={{fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', paddingTop: '10px'}} />
                <Bar dataKey="web" stackId="a" fill="#3b82f6" name="Web" barSize={55} />
                <Bar dataKey="app" stackId="a" fill="#1e3a8a" radius={[4, 4, 0, 0]} name="App" barSize={55}>
                  <LabelList dataKey="total" position="top" style={{ fontSize: '11px', fontWeight: '900', fill: '#1e3a8a' }} formatter={(val: number) => val.toLocaleString()} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Biểu đồ phân khúc và Top thể loại */}
      <div className="grid grid-cols-3 gap-4 flex-1 min-h-0">
        <div className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-col shadow-sm">
          <h3 className="text-xs font-black text-slate-800 uppercase mb-2 border-b border-slate-50 pb-2 tracking-widest text-center">Tỷ trọng tương tác người dùng</h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={segments} innerRadius="55%" outerRadius="88%" paddingAngle={4} dataKey="value" cx="50%" cy="50%">
                  {segments.map((e, i) => <Cell key={i} fill={e.color} stroke="none" />)}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" iconSize={8} wrapperStyle={{fontSize: '10px', fontWeight: 800}} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-span-2 bg-white p-4 rounded-2xl border border-slate-100 flex flex-col shadow-sm overflow-visible">
          <h3 className="text-xs font-black text-slate-800 uppercase mb-2 border-b border-slate-50 pb-2 tracking-widest">Hiệu quả theo Thể loại sách</h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topCategories} layout="vertical" margin={{ left: -5, top: 15, right: 45, bottom: 5 }} onClick={(s) => s?.activeLabel && onCategorySelect(s.activeLabel)}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 800, fill: '#1e293b'}} width={100} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={24}>
                  <LabelList dataKey="value" position="right" style={{ fontSize: '11px', fontWeight: '900', fill: '#1e40af' }} offset={10} formatter={(val: number) => val.toLocaleString()} />
                  {topCategories.map((entry, index) => (
                    <Cell 
                      key={index} 
                      fill={selectedCategory === entry.name ? '#1e40af' : '#3b82f6'} 
                      fillOpacity={selectedCategory && selectedCategory !== entry.name ? 0.3 : 1} 
                      className="cursor-pointer transition-all duration-300"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveOverview;
