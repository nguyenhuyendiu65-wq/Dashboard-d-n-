
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Slicer from './components/Slicer';
import ExecutiveOverview from './pages/ExecutiveOverview';
import FunnelAnalysis from './pages/FunnelAnalysis';
import BehaviorDeepDive from './pages/BehaviorDeepDive';
import { PageType } from './types';
import { Search, Bell, Calendar, ChevronDown, X } from 'lucide-react';

/**
 * App Component: Trái tim của Dashboard PNC Analytics.
 * Quản lý điều hướng trang và các bộ lọc dữ liệu toàn hệ thống.
 */
const App: React.FC = () => {
  // Đặt Hiệu quả Kinh doanh làm trang mặc định sau khi xóa Strategic KPI
  const [currentPage, setCurrentPage] = useState<PageType>(PageType.EXECUTIVE);
  
  // Trạng thái lọc toàn cục theo Thể loại (được điều khiển bởi Slicer ở Header)
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  
  // Trạng thái lọc theo Nền tảng (Web/App)
  const [platform, setPlatform] = useState('all');

  /**
   * Phân luồng hiển thị nội dung dựa trên menu được chọn ở Sidebar.
   */
  const renderPage = () => {
    const categoryFilter = selectedCategory === '' ? null : selectedCategory;
    
    switch (currentPage) {
      case PageType.EXECUTIVE:
        return <ExecutiveOverview selectedCategory={categoryFilter} onCategorySelect={setSelectedCategory} />;
      case PageType.FUNNEL:
        return <FunnelAnalysis selectedCategory={categoryFilter} />;
      case PageType.DEEP_DIVE:
        return <BehaviorDeepDive selectedCategory={categoryFilter} />;
      default:
        return <ExecutiveOverview selectedCategory={categoryFilter} onCategorySelect={setSelectedCategory} />;
    }
  };

  return (
    <div className="h-screen bg-slate-50 flex overflow-hidden">
      {/* Thanh điều hướng bên trái (Navigation) */}
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      
      {/* Khu vực xử lý dữ liệu chính (Main Content) */}
      <main className="flex-1 ml-64 min-w-[1200px] h-screen flex flex-col">
        
        {/* Header: Chứa các công cụ lọc và thông tin tài khoản */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 shadow-sm z-50">
          <div className="flex items-center gap-4 flex-1">
            
            {/* Thanh tìm kiếm nhanh */}
            <div className="relative w-64 lg:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Tìm kiếm báo cáo..." 
                className="w-full bg-slate-100 border-none rounded-xl py-2 pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
            
            {/* Bộ chọn mốc thời gian báo cáo */}
            <button className="flex items-center gap-2.5 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors shrink-0">
              <Calendar size={16} className="text-blue-600" />
              <span className="hidden sm:inline text-xs">Thời gian</span>
              <ChevronDown size={14} className="text-slate-400" />
            </button>

            {/* Component Bộ lọc: Nền tảng & Thể loại sách */}
            <Slicer 
              platform={platform} 
              setPlatform={setPlatform} 
              category={selectedCategory || 'Tất cả thể loại'} 
              setCategory={setSelectedCategory}
            />

            {/* Badge hiển thị nhanh bộ lọc đang được kích hoạt */}
            {selectedCategory && (
              <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-[10px] font-bold text-blue-700 animate-in fade-in zoom-in-95">
                <span>Thể loại: {selectedCategory}</span>
                <button 
                  onClick={() => setSelectedCategory('')} 
                  className="hover:bg-blue-200 p-0.5 rounded-full transition-colors"
                  title="Xóa bộ lọc"
                >
                  <X size={10} />
                </button>
              </div>
            )}
          </div>

          {/* Khu vực thông báo và thông tin người dùng quản trị */}
          <div className="flex items-center gap-5">
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            
            <div className="flex items-center gap-4 pl-5 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900 leading-none uppercase">Quản trị viên</p>
                <p className="text-[10px] text-slate-400 mt-1 font-bold uppercase tracking-widest">PNC Analytics</p>
              </div>
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white text-sm font-black shadow-lg shadow-blue-200">
                AD
              </div>
            </div>
          </div>
        </header>

        {/* Nội dung trang chi tiết hiển thị trong khung trắng */}
        <div className="flex-1 p-6 overflow-hidden flex flex-col">
          <div className="flex-1 bg-white rounded-2xl shadow-xl border border-slate-200 flex flex-col p-6 overflow-hidden">
            {renderPage()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
