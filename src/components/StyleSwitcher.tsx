import { FC, ReactNode, useState, useEffect, useRef } from 'react';
import { ChevronDown, Check, Accessibility, Paintbrush, Layout } from 'lucide-react';

interface StyleSwitcherProps {
  onChange: (styleId: string) => void;
  defaultStyle?: string;
}

interface StyleType {
  id: string;
  name: string;
  description: string;
  icon: ReactNode;
}

const StyleSwitcher: FC<StyleSwitcherProps> = ({ onChange, defaultStyle = 'standard' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState(defaultStyle);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const styles: StyleType[] = [
    { 
      id: 'accessible', 
      name: 'Accessible', 
      description: 'WCAG compliant, high contrast, clear typography',
      icon: <Accessibility size={20} />
    },
    { 
      id: 'creative', 
      name: 'Creative', 
      description: 'Unique animations, creative typography, visually rich',
      icon: <Paintbrush size={20} />
    },
    { 
      id: 'standard', 
      name: 'Standard', 
      description: 'Clean, professional, balanced design',
      icon: <Layout size={20} />
    }
  ];

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (styleId: string) => {
    setSelectedStyle(styleId);
    onChange(styleId);
    setIsOpen(false);
  };

  const current = styles.find(style => style.id === selectedStyle);

  return (
    <div className="fixed top-6 right-6 z-50" ref={dropdownRef}>
      <div className="relative">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
          aria-expanded={isOpen}
          aria-controls="style-dropdown"
        >
          <span className="flex items-center gap-2">
            {current && (
              <span className="text-blue-600 dark:text-blue-400">{current.icon}</span>
            )}
            <span className="font-medium">{current ? current.name : ''} UI</span>
          </span>
          <ChevronDown 
            size={16} 
            className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} text-gray-500`} 
          />
        </button>
        
        {isOpen && (
          <div 
            id="style-dropdown"
            className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 transform origin-top-right transition-all duration-200"
          >
            {styles.map(style => (
              <button
                key={style.id}
                onClick={() => handleSelect(style.id)}
                className={`w-full px-4 py-3 text-left transition-colors flex items-start gap-3 
                  ${selectedStyle === style.id 
                    ? 'bg-blue-50 dark:bg-blue-900/20' 
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}
                aria-selected={selectedStyle === style.id}
              >
                <div className={`mt-1 ${selectedStyle === style.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}>
                  {style.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className={`font-medium ${selectedStyle === style.id ? 'text-blue-700 dark:text-blue-300' : ''}`}>
                      {style.name}
                    </span>
                    {selectedStyle === style.id && (
                      <Check size={16} className="text-blue-600 dark:text-blue-400" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {style.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StyleSwitcher;