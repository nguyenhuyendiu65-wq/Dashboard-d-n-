
import React from 'react';

export interface MetricCardProps {
  label: string;
  value: string | number;
  change: string;
  isPositive: boolean;
  icon?: React.ReactNode;
  subtext?: string;
}

export enum PageType {
  EXECUTIVE = 'EXECUTIVE',
  FUNNEL = 'FUNNEL',
  DEEP_DIVE = 'DEEP_DIVE'
}

export interface BookInsight {
  title: string;
  category: string;
  reads: number;
  revenue: number;
  conversion: number;
}
