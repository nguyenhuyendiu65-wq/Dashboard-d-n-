
import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { MetricCardProps } from '../types';

const MetricCard: React.FC<MetricCardProps> = ({ label, value, change, isPositive, icon, subtext }) => {
  return (
    <div className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all group h-full flex flex-col justify-between">
      <div className="flex justify-between items-start mb-2">
        <div className="flex flex-col">
          <span className="text-slate-900 text-[11px] font-black uppercase tracking-tight leading-none">{label}</span>
          {subtext && (
            <span className="text-slate-400 text-[9px] font-bold mt-1 leading-tight lowercase tracking-normal">
              {subtext}
            </span>
          )}
        </div>
        {icon && (
          <div className="text-blue-600 p-1.5 bg-blue-50 rounded-lg group-hover:scale-105 transition-transform shrink-0 ml-2">
            {React.cloneElement(icon as React.ReactElement, { size: 14 })}
          </div>
        )}
      </div>
      <div className="flex flex-col mt-auto">
        <span className="text-2xl font-black text-slate-900 tracking-tighter leading-none mb-2">{value}</span>
        <div className="flex items-center gap-1.5">
          <div className={`flex items-center px-1.5 py-0.5 rounded text-[10px] font-black ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
            {isPositive ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
            {change}
          </div>
          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-tight">so với kỳ trước</span>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
