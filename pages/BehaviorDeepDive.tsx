
import React, { useMemo } from 'react';
import MetricCard from '../components/MetricCard';
import { 
  ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, 
  Tooltip, Cell, LineChart, Line, CartesianGrid
} from 'recharts';
import { Clock, Target, Bookmark, CheckCircle2, Zap, RotateCcw, CalendarDays, TrendingDown, Info, AlertTriangle } from 'lucide-react';

interface BehaviorDeepDiveProps {
  selectedCategory: string | null;
}

// Danh sách các ngày trong tuần cho Heatmap
const heatmapDays = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'CN'];
// Dữ liệu ngẫu nhiên cho mật độ truy cập theo giờ (Heatmap)
const fullHeatmap = heatmapDays.flatMap((day, dIdx) => Array.from({length: 24}, (_, h) => ({
  hour: h, day, dIdx, val: Math.floor(Math.random() * 50) + (h >= 19 && h <= 21 ? 90 : (h > 19 || h < 7 ? 40 : 10))
})));

// Dữ liệu Scatter: Phân loại tệp người dùng dựa trên thời gian và chi tiêu
const scaterData = [
  { time: 120, spent: 450, type: 'Cá voi' },
  { time: 30, spent: 80, type: 'Vãng lai' },
  { time: 210, spent: 150, type: 'Yêu miễn phí' },
  { time: 45, spent: 320, type: 'Người chi tiêu' },
  { time: 95, spent: 240, type: 'Năng động' },
  { time: 180, spent: 600, type: 'VIP' },
];

// Dữ liệu Retention theo chương sách
const dotPlotData = [
  { step: 'Mở sách', rate: 100 },
  { step: 'Chương 1', rate: 85 },
  { step: 'Chương 2', rate: 70 },
  { step: 'Chương 3', rate: 52 },
  { step: 'Chương 4', rate: 45 },
  { step: 'Hoàn thành', rate: 28 },
];

// Danh sách các đầu sách có doanh thu thấp cần can thiệp
const lowRevenueBooks = [
  { title: 'Tâm Lý Học Tội Phạm', category: 'Tâm lý', reads: 14500, cr: '0.8%', risk: 'Cao', action: 'Giảm giá C1' },
  { title: 'Dòng Máu Anh Hùng', category: 'Văn học', reads: 12200, cr: '2.5%', risk: 'Vừa', action: 'Push 20h' },
  { title: 'Giao Tiếp 4.0', category: 'Kỹ năng', reads: 9800, cr: '1.5%', risk: 'Cao', action: 'Giảm giá C1' },
  { title: 'Chiến Lược Đại Dương', category: 'Kinh tế', reads: 8500, cr: '1.1%', risk: 'Cao', action: 'Push 19h' },
];

/**
 * Trang Phân Tích Sâu (Behavior Deep Dive):
 * Cung cấp các phân tích chi tiết về hành vi đọc, tương tác tính năng và rủi ro rời bỏ.
 */
const BehaviorDeepDive: React.FC<BehaviorDeepDiveProps> = ({ selectedCategory }) => {
  const filteredBooks = useMemo(() => {
    if (!selectedCategory) return lowRevenueBooks;
    return lowRevenueBooks.filter(b => b.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header trang */}
      <div className="mb-3 shrink-0 flex justify-between items-end border-b border-slate-100 pb-2">
        <div>
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight leading-tight">
            Hành vi & Cá nhân hóa danh mục {selectedCategory && <span className="text-blue-600">/ {selectedCategory}</span>}
          </h2>
          <p className="text-slate-500 text-[10px] font-bold uppercase mt-1 tracking-widest flex items-center gap-1.5">
            <Info size={12} className="text-blue-600" /> Tối ưu trải nghiệm dựa trên dữ liệu thời gian thực.
          </p>
        </div>
        <div className="bg-rose-600 text-white px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest flex items-center gap-1 shadow-sm">
          <AlertTriangle size={10} /> YÊU CẦU XỬ LÝ RỦI RO
        </div>
      </div>

      {/* Chỉ số hành vi */}
      <div className="grid grid-cols-4 gap-3 mb-3 shrink-0">
        <MetricCard label="Tỷ lệ đọc hết" value={selectedCategory ? "38.5%" : "32.4%"} change="+2.1%" isPositive={true} icon={<CheckCircle2 />} />
        <MetricCard label="Sử dụng tính năng" value={selectedCategory ? "22.1%" : "18.5%"} change="+5.4%" isPositive={true} icon={<Zap />} />
        <MetricCard label="Tỷ lệ giữ chân" value={selectedCategory ? "48.2%" : "45.2%"} change="-1.2%" isPositive={false} icon={<RotateCcw />} />
        <MetricCard label="Tần suất sử dụng" value={selectedCategory ? "5.1 lần/t" : "4.2 lần/t"} change="+0.8" isPositive={true} icon={<CalendarDays />} />
      </div>

      <div className="grid grid-cols-2 grid-rows-2 gap-3 flex-1 min-h-0">
        {/* Heatmap: Thời gian truy cập cao điểm */}
        <div className="bg-white p-3 rounded-xl border border-slate-100 flex flex-col shadow-sm">
          <header className="flex justify-between items-center mb-2 border-b border-slate-50 pb-1.5">
            <h3 className="text-[10px] font-black text-slate-800 flex items-center gap-1.5 uppercase tracking-widest">
              <Clock size={12} className="text-blue-600" /> Mật độ truy cập theo giờ (Peak Hours)
            </h3>
            <span className="text-[8px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full font-black uppercase">Khuyên dùng: 19h-21h</span>
          </header>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 5, right: 5, bottom: -10, left: -25 }}>
                <XAxis type="category" dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 800}} />
                <YAxis type="number" dataKey="hour" domain={[0, 23]} axisLine={false} tickLine={false} tick={{fontSize: 10}} tickCount={12} reversed />
                <ZAxis type="number" dataKey="val" range={[35, 150]} />
                <Tooltip />
                <Scatter data={fullHeatmap}>
                  {fullHeatmap.map((e, i) => (
                    <Cell key={i} fill={e.hour >= 19 && e.hour <= 21 ? '#1e40af' : e.val > 45 ? '#3b82f6' : '#f1f5f9'} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Scatter Chart: Phân nhóm khách hàng */}
        <div className="bg-white p-3 rounded-xl border border-slate-100 flex flex-col shadow-sm">
          <header className="flex justify-between items-center mb-2 border-b border-slate-50 pb-1.5">
            <h3 className="text-[10px] font-black text-slate-800 flex items-center gap-1.5 uppercase tracking-widest">
              <Target size={12} className="text-blue-600" /> Giá trị trọn đời (LTV) vs Tương tác
            </h3>
          </header>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 10, bottom: -10, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" dataKey="time" name="Thời gian (phút)" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                <YAxis type="number" dataKey="spent" name="Chi tiêu ($)" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                <Tooltip />
                <Scatter data={scaterData}>
                  {scaterData.map((e, i) => (
                    <Cell key={i} fill={e.spent > 400 ? '#1e3a8a' : e.time > 150 ? '#3b82f6' : '#cbd5e1'} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line Chart: Drop-off theo chương sách */}
        <div className="bg-white p-3 rounded-xl border border-slate-100 flex flex-col shadow-sm">
          <h3 className="text-[10px] font-black text-slate-800 mb-2 flex items-center gap-1.5 uppercase border-b border-slate-50 pb-1.5 tracking-widest">
            <Bookmark size={12} className="text-blue-600" /> Tỷ lệ hoàn thành theo từng chương sách
          </h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dotPlotData} margin={{ left: -25, top: 5, right: 10, bottom: -10 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis dataKey="step" axisLine={false} tickLine={false} tick={{fontSize: 11, fontWeight: 800}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} domain={[0, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="rate" name="Tỷ lệ (%)" stroke="#1e40af" strokeWidth={5} dot={{ r: 6, fill: '#1e40af', strokeWidth: 2, stroke: '#fff' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Action Panel: Can thiệp rủi ro */}
        <div className="bg-slate-900 p-3 rounded-xl flex flex-col shadow-lg border border-slate-800">
           <h3 className="text-[10px] font-black text-blue-400 mb-2 flex items-center gap-1.5 uppercase tracking-widest">
            <TrendingDown size={14} /> Danh sách cần can thiệp rủi ro (Churn Alert)
          </h3>
           <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-1">
             <table className="w-full text-left text-[9px]">
               <thead className="sticky top-0 bg-slate-900 z-10">
                 <tr className="text-slate-500 uppercase font-black text-[9px] border-b border-slate-800">
                   <th className="pb-1.5">Tựa sách</th>
                   <th className="pb-1.5 text-right">Mức rủi ro</th>
                   <th className="pb-1.5 text-right">Hành động đề xuất</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-800/30">
                 {filteredBooks.map((b, i) => (
                   <tr key={i} className="hover:bg-slate-800/40 transition-colors">
                     <td className="py-2">
                        <p className="font-black text-slate-200 text-[11px]">{b.title}</p>
                        <p className="text-[8px] text-slate-500 font-bold uppercase tracking-tighter">CV Rate: {b.cr}</p>
                     </td>
                     <td className="py-2 text-right">
                        <span className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase ${
                          b.risk === 'Cao' ? 'bg-rose-500 text-white' : 'bg-orange-500 text-white'
                        }`}>
                          {b.risk}
                        </span>
                     </td>
                     <td className="py-2 text-right font-bold text-slate-400 text-[10px] italic">{b.action}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
           <button className="mt-2 w-full bg-blue-600 hover:bg-blue-500 text-[10px] font-black py-2 rounded-lg transition-all uppercase tracking-widest shadow-md">
              Kích hoạt Push Notification Ngay
           </button>
        </div>
      </div>
    </div>
  );
};

export default BehaviorDeepDive;
