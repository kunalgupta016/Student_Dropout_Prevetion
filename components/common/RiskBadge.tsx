
import React from 'react';
import { RiskLevel } from '../../types';

interface RiskBadgeProps {
  level: RiskLevel;
}

const RiskBadge: React.FC<RiskBadgeProps> = ({ level }) => {
  const baseClasses = 'px-3 py-1 text-sm font-semibold rounded-full inline-block';
  let colorClasses = '';

  switch (level) {
    case RiskLevel.LOW:
      colorClasses = 'bg-green-100 text-green-800';
      break;
    case RiskLevel.MODERATE:
      colorClasses = 'bg-yellow-100 text-yellow-800';
      break;
    case RiskLevel.HIGH:
      colorClasses = 'bg-red-100 text-red-800';
      break;
    default:
      colorClasses = 'bg-gray-100 text-gray-800';
  }

  return <span className={`${baseClasses} ${colorClasses}`}>{level}</span>;
};

export default RiskBadge;
