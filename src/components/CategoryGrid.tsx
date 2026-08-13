import React from 'react';
import { POPULAR_CATEGORIES } from '../data/mockData';
import {
  Laptop,
  Headphones,
  Tv,
  Zap,
  Coffee,
  Activity,
  Gamepad2,
  Shirt,
  Sparkles,
  BookOpen,
  Briefcase,
  Compass
} from 'lucide-react';

interface CategoryGridProps {
  selectedCategory: string;
  onSelectCategory: (catId: string) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Laptop':
        return <Laptop className="w-5 h-5 text-blue-600" />;
      case 'Headphones':
        return <Headphones className="w-5 h-5 text-blue-600" />;
      case 'Tv':
        return <Tv className="w-5 h-5 text-blue-600" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-blue-600" />;
      case 'Coffee':
        return <Coffee className="w-5 h-5 text-blue-600" />;
      case 'Activity':
        return <Activity className="w-5 h-5 text-blue-600" />;
      case 'Gamepad2':
        return <Gamepad2 className="w-5 h-5 text-blue-600" />;
      case 'Shirt':
        return <Shirt className="w-5 h-5 text-blue-600" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-blue-600" />;
      case 'BookOpen':
        return <BookOpen className="w-5 h-5 text-blue-600" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5 text-blue-600" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-blue-600" />;
      default:
        return <Laptop className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="my-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Explore Popular Amazon India Categories
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm">
            Curated product collections synced with Amazon India Associates Program
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {POPULAR_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between group ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs font-medium'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-300 shadow-xs'
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 shadow-2xs transition-colors ${
                isSelected ? 'bg-blue-700/60' : 'bg-slate-100 group-hover:bg-slate-200/80'
              }`}>
                {getCategoryIcon(cat.icon)}
              </div>

              <div>
                <h3 className="text-xs font-semibold leading-tight line-clamp-1">{cat.name}</h3>
                <p className={`text-[10px] mt-0.5 line-clamp-1 ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                  {cat.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
