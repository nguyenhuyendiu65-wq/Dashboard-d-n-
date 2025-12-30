
import React from 'react';
import { 
  LayoutDashboard, 
  Filter, 
  BarChart2, 
  Users, 
  Settings, 
  LogOut,
  Package
} from 'lucide-react';
import { PageType } from '../types';

interface SidebarProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onPageChange }) => {
  const menuItems = [
    { id: PageType.EXECUTIVE, icon: LayoutDashboard, label: 'Hiệu quả Kinh doanh' },
    { id: PageType.FUNNEL, icon: Filter, label: 'Phễu Chuyển đổi' },
    { id: PageType.DEEP_DIVE, icon: BarChart2, label: 'Hành vi Khách hàng' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-screen flex flex-col fixed left-0 top-0 z-50 shadow-sm">
      <div className="p-7 flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-blue-200">P</div>
        <div>
          <h1 className="font-black text-slate-900 text-base tracking-tight leading-tight uppercase">PNC Analytics</h1>
          <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">Hệ thống v2.0</span>
        </div>
      </div>

      <nav className="flex-1 px-5 py-2 space-y-8">
        <div>
          <p className="px-3 text-[10px] font-black text-slate-300 uppercase tracking-widest mb-4">Mục tiêu dự án</p>
          <div className="space-y-1.5">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-bold transition-all text-left ${
                  currentPage === item.id 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-blue-600'
                }`}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="px-3 text-[10px] font-black text-slate-300 uppercase tracking-widest mb-4">Quản trị</p>
          <div className="space-y-1.5">
            <button className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-bold text-slate-500 hover:bg-slate-50 transition-all text-left">
              <Users size={18} />
              <span>Người dùng</span>
            </button>
            <button className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-bold text-slate-500 hover:bg-slate-50 transition-all text-left">
              <Package size={18} />
              <span>Sản phẩm</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="p-6 border-t border-slate-100">
        <button className="w-full flex items-center gap-3.5 px-4 py-4 text-xs font-black text-slate-400 hover:text-rose-600 transition-colors uppercase tracking-widest">
          <LogOut size={18} />
          Đăng xuất
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
