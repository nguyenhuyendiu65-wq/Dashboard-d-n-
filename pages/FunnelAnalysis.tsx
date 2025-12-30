
import React, { useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  Cell, PieChart, Pie, AreaChart, Area, CartesianGrid, Legend,
  ReferenceLine
} from 'recharts';
import { Layers, Timer, TrendingDown, Info, ArrowRight, TrendingUp } from 'lucide-react';

interface FunnelAnalysisProps {
  selectedCategory: string | null;
}

// Dữ liệu mô phỏng cho các bước của phễu mua hàng
const funnelSteps = [
  { step: '1. Truy cập', value: 100, label: '100k', benchmark: 100, benchmarkLabel: '100%' },
  { step: '2. Đọc thử', value: 65, label: '65k', benchmark: 58, benchmarkLabel: '58%' },
  { step: '3. Giỏ hàng', value: 12, label: '12k', benchmark: 18, benchmarkLabel: '18%' },
  { step: '4. Mua hàng', value: 4.5, label: '4.5k', benchmark: 7.2, benchmarkLabel: '7.2%' },
];

// Dữ liệu xu hướng chuyển đổi theo tháng
const conversionTrend = [
  { time: 'T1', cat: 4.2, system: 5.1 },
  { time: 'T2', cat: 4.8, system: 5.2 },
  { time: 'T3', cat: 5.1, system: 5.0 },
  { time: 'T4', cat: 4.5, system: 5.3 },
  { time: 'T5', cat: 6.2, system: 5.4 },
  { time: 'T6', cat: 7.1, system: 5.6 },
  { time: 'T7', cat: 6.8, system: 5.7 },
  { time: 'T8', cat: 7.4, system: 5.8 },
  { time: 'T9', cat: 8.2, system: 6.0 },
  { time: 'T10', cat: 7.9, system: 6.1 },
  { time: 'T11', cat: 9.5, system: 6.3 },
  { time: 'T12', cat: 11.2, system: 6.5 },
];

// Dữ liệu cho biểu đồ phân tích tỷ lệ suy giảm (Drop-off)
const dropOffData = [
  { name: 'Truy cập', val: 100 },
  { name: 'Rơi rớt 1', val: -35 },
  { name: 'Rơi rớt 2', val: -53 },
  { name: 'Rơi rớt 3', val: -7.5 },
  { name: 'Cuối phễu', val: 4.5 },
];

const channelData = [
  { name: 'Ứng dụng (App)', value: 65, color: '#1e40af' },
  { name: 'Trang web (Web)', value: 35, color: '#3b82f6' },
];

/**
 * Component Custom Tooltip cho biểu đồ vùng
 */
const CustomAreaTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-slate-100 shadow-xl rounded-xl">
        <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Tháng {label}</p>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-700"></div>
              <span className="text-[11px] font-bold text-slate-600">Thể loại hiện tại:</span>
            </div>
            <span className="text-[11px] font-black text-blue-700">{payload[0].value}%</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-slate-300"></div>
              <span className="text-[11px] font-bold text-slate-600">Trung bình HT:</span>
            </div>
            <span className="text-[11px] font-black text-slate-400">{payload[1].value}%</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

/**
 * Trang Phễu Chuyển Đổi: Tập trung vào việc theo dõi hành trình người dùng.
 */
const FunnelAnalysis: React.FC<FunnelAnalysisProps> = ({ selectedCategory }) => {
  const displayFunnel = useMemo(() => {
    if (!selectedCategory) return funnelSteps;
    const factor = selectedCategory === 'Văn học' ? 0.6 : 1.1;
    return funnelSteps.map(step => ({
      ...step,
      value: Math.min(100, step.value * factor),
      label: (parseFloat(step.label) * factor).toFixed(1) + 'k'
    }));
  }, [selectedCategory]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Tiêu đề trang */}
      <div className="mb-4 shrink-0 flex justify-between items-end border-b border-slate-100 pb-3">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-normal leading-relaxed">Phễu Chuyển Đổi & Điểm Rơi</h2>
          <p className="text-slate-500 text-[11px] font-bold uppercase mt-1 tracking-widest flex items-center gap-1.5">
            <Info size={12} className="text-blue-600" /> Phân tích hành trình khách hàng từ lúc truy cập đến lúc thanh toán.
          </p>
        </div>
        <div className="text-[9px] font-bold text-slate-400 uppercase italic tracking-wider">So sánh với Benchmark ngành</div>
      </div>

      {/* Thẻ chỉ số chính */}
      <div className="grid grid-cols-4 gap-3 mb-4 shrink-0">
        <div className="bg-white p-3 rounded-xl border border-slate-100 flex items-center gap-3 shadow-sm">
          <div className="p-2 bg-rose-50 rounded-lg"><TrendingDown size={16} className="text-rose-500" /></div>
          <div className="leading-normal">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tỷ lệ rời bỏ</p>
            <p className="text-xl font-black text-rose-600">{selectedCategory ? '24.2%' : '32.5%'}</p>
          </div>
        </div>
        <div className="bg-white p-3 rounded-xl border border-slate-100 flex items-center gap-3 shadow-sm">
          <div className="p-2 bg-emerald-50 rounded-lg"><Layers size={16} className="text-emerald-500" /></div>
          <div className="leading-normal">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">User Phục hồi</p>
            <p className="text-xl font-black text-slate-800">4,820</p>
          </div>
        </div>
        <div className="bg-white p-3 rounded-xl border border-slate-100 flex items-center gap-3 shadow-sm">
          <div className="p-2 bg-blue-50 rounded-lg"><Timer size={16} className="text-blue-500" /></div>
          <div className="leading-normal">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">T.gian chuyển đổi</p>
            <p className="text-xl font-black text-slate-800">8.5p</p>
          </div>
        </div>
        <div className="bg-blue-900 p-3 rounded-xl flex items-center gap-3 text-white shadow-lg shadow-blue-200">
          <div className="p-2 bg-blue-800/50 rounded-lg"><ArrowRight size={16} /></div>
          <div className="leading-normal">
            <p className="text-[10px] font-black text-blue-300 uppercase tracking-widest">Doanh thu tiềm năng</p>
            <p className="text-xl font-black">+$42,500</p>
          </div>
        </div>
      </div>

      {/* Biểu đồ chi tiết */}
      <div className="grid grid-cols-2 gap-4 flex-1 min-h-0">
        {/* Phễu Ngang */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 flex flex-col shadow-sm">
          <div className="flex justify-between items-center mb-5 border-b border-slate-50 pb-2">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">Phân tích Phễu Chuyển Đổi Thực tế</h3>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-1 bg-blue-700 rounded-full"></div>
                <span className="text-[9px] font-black text-slate-400 uppercase">Thực tế</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-1 border-t-2 border-rose-500 border-dashed"></div>
                <span className="text-[9px] font-black text-slate-400 uppercase">Chuẩn (BM)</span>
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-around gap-4">
            {displayFunnel.map((d, i) => (
              <div key={i} className="group">
                <div className="flex justify-between text-[12px] font-black mb-1.5 uppercase text-slate-700 tracking-normal leading-normal">
                  <span>{d.step}</span>
                  <div className="flex gap-3">
                    <span className="text-slate-400 text-[10px] font-bold">Chuẩn: {d.benchmarkLabel}</span>
                    <span className={d.value < d.benchmark ? 'text-rose-600' : 'text-blue-700'}>{d.value.toFixed(1)}%</span>
                  </div>
                </div>
                <div className="h-12 w-full bg-slate-50 rounded-xl relative border border-slate-100 overflow-visible shadow-inner flex items-center">
                  <div 
                    className={`h-full relative z-10 transition-all duration-700 rounded-lg flex items-center justify-end ${d.value < d.benchmark ? 'bg-blue-400' : 'bg-blue-700'}`} 
                    style={{ width: `${d.value}%` }}
                  >
                    {d.value >= 15 && (
                      <div className="pr-4 text-xs font-black text-white drop-shadow-md whitespace-nowrap overflow-visible">
                        {d.label}
                      </div>
                    )}
                  </div>
                  {d.value < 15 && (
                    <div className="pl-3 text-xs font-black text-blue-900 whitespace-nowrap z-30 transition-all duration-700">
                      {d.label}
                    </div>
                  )}
                  <div className="absolute inset-y-0 border-r-2 border-rose-500 border-dashed z-20" style={{ left: `${d.benchmark}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 min-h-0">
          {/* Biểu đồ Xu hướng cải tiến */}
          <div className="flex-[1.2] bg-white p-4 rounded-2xl border border-slate-100 flex flex-col shadow-sm">
            <div className="flex justify-between items-start mb-3 border-b border-slate-50 pb-2">
              <div>
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                  <TrendingUp size={14} className="text-blue-600" /> Xu hướng tỷ lệ chuyển đổi
                </h3>
                <p className="text-[9px] text-slate-400 font-bold uppercase mt-0.5 tracking-tighter italic">Dữ liệu so sánh lũy kế năm 2024</p>
              </div>
              <div className="flex gap-4">
                 <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-blue-700"></div>
                    <span className="text-[9px] font-black text-slate-400 uppercase">Thể loại</span>
                 </div>
                 <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                    <span className="text-[9px] font-black text-slate-400 uppercase">Hệ thống</span>
                 </div>
              </div>
            </div>
            
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={conversionTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCat" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1e40af" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#1e40af" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                  <XAxis 
                    dataKey="time" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fontSize: 10, fontWeight: 900, fill: '#94a3b8'}} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fontSize: 10, fontWeight: 700, fill: '#cbd5e1'}} 
                    tickFormatter={(val) => `${val}%`}
                  />
                  <Tooltip content={<CustomAreaTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="cat" 
                    stroke="#1e40af" 
                    strokeWidth={4} 
                    fillOpacity={1} 
                    fill="url(#colorCat)" 
                    activeDot={{ r: 6, stroke: '#fff', strokeWidth: 3, fill: '#1e40af' }}
                    animationDuration={1500}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="system" 
                    stroke="#e2e8f0" 
                    strokeWidth={2} 
                    fill="transparent" 
                    strokeDasharray="5 5"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-2 gap-4 min-h-0">
            {/* Phân tích Suy giảm */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-col">
              <p className="text-[10px] font-black text-slate-800 uppercase border-b border-slate-50 pb-2 mb-2 tracking-widest text-center">Phân tích Tỷ lệ Suy giảm</p>
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dropOffData} margin={{ left: -20, bottom: 5, right: 5, top: 5 }}>
                    <XAxis dataKey="name" tick={{fontSize: 11, fontWeight: 800}} axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Bar dataKey="val" barSize={30} radius={[4, 4, 0, 0]}>
                      {dropOffData.map((e, i) => <Cell key={i} fill={e.val > 0 ? '#1e3a8a' : '#f43f5e'} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Kênh mua hàng */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-col">
              <p className="text-[10px] font-black text-slate-800 uppercase border-b border-slate-50 pb-2 mb-2 tracking-widest text-center">Kênh mua hàng</p>
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={channelData} innerRadius="45%" outerRadius="75%" dataKey="value" paddingAngle={5}>
                      {channelData.map((e, i) => <Cell key={i} fill={e.color} stroke="none" />)}
                    </Pie>
                    <Tooltip />
                    <Legend 
                      verticalAlign="bottom" 
                      align="center"
                      iconSize={8} 
                      wrapperStyle={{fontSize: '9px', fontWeight: 800, textTransform: 'uppercase', paddingTop: '10px'}} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FunnelAnalysis;
