
import React from 'react';
import { ChevronDown, Tag } from 'lucide-react';

interface SlicerProps {
  platform: string;
  setPlatform: (p: string) => void;
  category: string;
  setCategory: (c: string) => void;
}

/**
 * Component Slicer: Cung cấp các bộ lọc nhanh cấp độ toàn cục.
 * - Platform: Chọn Web/App (Chỉ sử dụng văn bản, không dùng icon thiết bị).
 * - Thể loại: Chọn danh mục sách (Kinh tế, Văn học, v.v.)
 */
const Slicer: React.FC<SlicerProps> = ({ platform, setPlatform, category, setCategory }) => {
  return (
    <div className="flex items-center gap-2 px-4 border-l border-slate-200">
      {/* Bộ chọn Nền tảng - Thiết kế dạng Tab tối giản */}
      <div className="flex items-center gap-1 p-1 bg-slate-100/80 rounded-xl">
        {[
          { id: 'all', label: 'Tất cả' },
          { id: 'web', label: 'Web' },
          { id: 'app', label: 'App' },
        ].map((p) => (
          <button
            key={p.id}
            onClick={() => setPlatform(p.id)}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${
              platform === p.id
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-slate-400 hover:text-blue-600'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Bộ lọc Thể loại - Dropdown Menu */}
      <div className="relative group">
        <button className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 rounded-xl text-[11px] font-bold text-slate-600 transition-all border border-transparent hover:border-slate-200">
          <Tag size={14} className="text-blue-600" />
          <span className="hidden lg:inline text-[10px] uppercase">
            Thể loại: <span className="text-blue-700">{category}</span>
          </span>
          <ChevronDown size={14} className="text-slate-400" />
        </button>
        
        {/* Menu thả xuống hiển thị danh mục thể loại */}
        <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-xl py-2 z-50 hidden group-hover:block animate-in fade-in slide-in-from-top-1">
          {[
            'Tất cả thể loại', 
            'Kinh tế', 
            'Kỹ năng', 
            'Văn học', 
            'Tâm lý', 
            'Thiếu nhi'
          ].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat === 'Tất cả thể loại' ? '' : cat)}
              className="w-full text-left px-4 py-2 text-[11px] font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-colors"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slicer;
