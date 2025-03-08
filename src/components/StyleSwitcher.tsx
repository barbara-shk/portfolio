import{ FC, ReactNode, useState } from 'react';
import { ChevronDown, Check, Accessibility, Paintbrush, Layout } from 'lucide-react';

interface StyleSwitcherProps {
  onChange: (styleId: string) => void;
}

interface StyleType {
    id: string;
    name: string;
    description: string;
    icon: ReactNode;
}

const StyleSwitcher: FC<StyleSwitcherProps> = ({ onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState('standard');

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

  const handleSelect = (styleId: string) => {
    setSelectedStyle(styleId);
    onChange(styleId);
    setIsOpen(false);
  };

  const current = styles.find(style => style.id === selectedStyle);

  return (
    <div className="fixed top-6 right-6 z-50">
      <div className="relative">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
        >
          <span className="flex items-center gap-2">
            {current && current.icon}
            <span className="font-medium">{current ? current.name : ''} UI</span>
          </span>
          <ChevronDown size={16} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isOpen && (
          <div className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
            {styles.map(style => (
              <button
                key={style.id}
                onClick={() => handleSelect(style.id)}
                className="w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-start gap-3"
              >
                <div className="mt-1 text-blue-600 dark:text-blue-400">
                  {style.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{style.name}</span>
                    {selectedStyle === style.id && (
                      <Check size={16} className="text-green-500" />
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