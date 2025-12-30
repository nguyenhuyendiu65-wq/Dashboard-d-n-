
import React from 'react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, RadarChart, PolarGrid, PolarAngleAxis, Radar, Legend
} from 'recharts';
import { Target, ShieldAlert, Zap, TrendingUp, Info, ArrowUpRight, CheckCircle, Lightbulb, Rocket, Fingerprint, Crosshair, BarChart3 } from 'lucide-react';

const ucrTrend = [
  { month: 'T1', ucr: 4.2 },
  { month: 'T2', ucr: 4.5 },
  { month: 'T3', ucr: 5.1 },
  { month: 'T4', ucr: 5.8 },
  { month: 'T5', ucr: 7.2 },
  { month: 'T6', ucr: 8.5 },
];

const cpiRadar = [
  { subject: 'Hoàn thành', A: 85 },
  { subject: 'Doanh thu', A: 70 },
  { subject: 'Đọc lại', A: 90 },
  { subject: 'Gắn kết', A: 65 },
  { subject: 'Lan tỏa', A: 50 },
];

const StrategicKPIs: React.FC = () => {
  const kpiDetails = [
    {
      id: 'ucr',
      title: 'UCR (User Conversion Rate)',
      value: '8.5%',
      color: 'blue',
      icon: <Target size={24} />,
      purpose: 'Đo lường hiệu quả chuyển đổi từ độc giả trải nghiệm miễn phí sang khách hàng trả phí.',
      reason: 'PNC sở hữu lượng lớn User đọc thử nhưng tỷ lệ mua thực tế vẫn còn dư địa tăng trưởng lớn. Đây là "mỏ neo" doanh thu.',
      application: 'Hệ thống tự động nhận diện "điểm chạm mua hàng" (Purchase Points) để tối ưu nút Call-to-Action và độ dài chương đọc thử.',
      target: 'Đạt tỷ lệ chuyển đổi trung bình 12% vào cuối Q4/2024.'
    },
    {
      id: 'crr',
      title: 'CRR (Churn Recovery Rate)',
      value: '35.8%',
      color: 'amber',
      icon: <ShieldAlert size={24} />,
      purpose: 'Đánh giá năng lực của hệ thống trong việc giữ chân và lôi kéo khách hàng có dấu hiệu rời bỏ.',
      reason: 'Chi phí giữ chân khách cũ chỉ bằng 1/7 chi phí tìm khách mới. CRR là thước đo sức khỏe của cộng đồng User.',
      application: 'Tích hợp mô hình Predictive Churn để tự động gửi Voucher/Push Noti cá nhân hóa khi User không truy cập quá 7 ngày.',
      target: 'Phục hồi thành công 45% lượng User có nguy cơ rời bỏ hàng tháng.'
    },
    {
      id: 'cpi',
      title: 'CPI (Content Power Index)',
      value: '8.2/10',
      color: 'indigo',
      icon: <Zap size={24} />,
      purpose: 'Xác định sức mạnh thương mại và mức độ lôi cuốn thực tế của từng đầu sách/thể loại.',
      reason: 'Giúp PNC thoát khỏi việc đánh giá cảm tính. CPI kết hợp cả dữ liệu Đọc (Hành vi) và dữ liệu Mua (Kinh doanh).',
      application: 'Định hướng chiến lược nhập hàng (Inventory) và xuất bản nội dung số. Ưu tiên ngân sách Marketing cho đầu sách CPI > 7.5.',
      target: '80% danh mục sách mới nhập phải đạt chỉ số CPI tối thiểu 7.0.'
    }
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white">
      {/* Header */}
      <div className="mb-6 shrink-0 flex justify-between items-center border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
            <BarChart3 className="text-blue-600" /> 3 KPI CHIẾN LƯỢC TRỌNG ĐIỂM
          </h2>
          <p className="text-slate-500 text-[11px] font-bold uppercase mt-1 tracking-widest flex items-center gap-1.5">
            <span className="text-blue-600 font-black italic">Framework: Purpose - Choice - App - Goal</span> • Hệ thống chỉ số dẫn đường PNC.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-2xl border border-blue-100 shadow-sm">
             <Rocket size={16} />
             <span className="text-[10px] font-black uppercase tracking-wider">Phiên bản Dashboard v2.0</span>
          </div>
        </div>
      </div>

      {/* Main KPI Section with Motif Layout */}
      <div className="grid grid-cols-3 gap-6 flex-1 min-h-0 overflow-y-auto pr-2 custom-scrollbar pb-6">
        {kpiDetails.map((kpi) => (
          <div key={kpi.id} className="flex flex-col bg-white rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden group hover:border-blue-200 transition-all">
            {/* KPI Summary Header */}
            <div className={`p-6 bg-${kpi.color}-600 text-white relative`}>
              <div className="absolute right-4 top-4 opacity-20 group-hover:scale-110 transition-transform duration-500">
                {kpi.icon}
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">Chỉ số hiện tại</p>
              <h3 className="text-xl font-black mb-1">{kpi.title}</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black tracking-tighter">{kpi.value}</span>
                <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-lg text-white">Tháng 6</span>
              </div>
            </div>

            {/* Motif Content */}
            <div className="p-6 space-y-5 flex-1">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-blue-600">
                  <Fingerprint size={14} />
                  <p className="text-[10px] font-black uppercase tracking-widest">1. Mục đích</p>
                </div>
                <p className="text-xs text-slate-600 font-semibold leading-relaxed">{kpi.purpose}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-amber-600">
                  <Lightbulb size={14} />
                  <p className="text-[10px] font-black uppercase tracking-widest">2. Lý do lựa chọn</p>
                </div>
                <p className="text-xs text-slate-600 font-semibold leading-relaxed">{kpi.reason}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-indigo-600">
                  <Zap size={14} />
                  <p className="text-[10px] font-black uppercase tracking-widest">3. Ứng dụng hệ thống</p>
                </div>
                <p className="text-xs text-slate-600 font-semibold leading-relaxed">{kpi.application}</p>
              </div>

              <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <div className="flex items-center gap-2 text-slate-800 mb-1">
                  <Crosshair size={14} />
                  <p className="text-[10px] font-black uppercase tracking-widest">4. Mục tiêu chiến lược</p>
                </div>
                <p className="text-xs text-blue-800 font-black italic">{kpi.target}</p>
              </div>
            </div>

            {/* Mini Visual Support */}
            <div className="h-32 px-4 pb-4">
              <div className="h-full bg-slate-50 rounded-2xl overflow-hidden p-2 border border-slate-100">
                {kpi.id === 'ucr' ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={ucrTrend}>
                      <Area type="monotone" dataKey="ucr" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.1} strokeWidth={3} />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : kpi.id === 'cpi' ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={cpiRadar}>
                      <PolarGrid stroke="#e2e8f0" />
                      <Radar dataKey="A" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.3} />
                    </RadarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex flex-col justify-center items-center text-slate-400">
                    <ShieldAlert size={20} className="mb-1 opacity-50" />
                    <span className="text-[9px] font-bold uppercase">Biểu đồ phục hồi dự kiến</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StrategicKPIs;
