// pages/index.tsx
import { colors } from '@/store/suggestions';
import { useState } from 'react';
import { IconColorPicker } from '@tabler/icons-react';


const ColorCustomizer = ({ selectedColor, setSelectedColor }: { selectedColor: string, setSelectedColor: (color: string) => void }) => {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <button onBlur={() => setTimeout(() => setOpen(false), 200)} onClick={() => setOpen(!open)} className='flex gap-2 items-center bg-card py-[7px] rounded-md text-sm px-3 hover:bg-card border border-border justify-center'><IconColorPicker className='w-4 h-4' />Change Theme</button>
            {open && <div className="bg-card border border-border rounded-lg flex items-center justify-center absolute top-16">
                <div className="p-6 rounded-lg shadow-lg">
                    <h1 className="text-xl font-bold mb-4">Color Customizer</h1>
                    <p className="mb-4">Customize your resume colors.</p>
                    <div className="grid grid-cols-3 gap-4">
                        {colors.map((color) => (
                            <button
                                key={color}
                                className={`
                                     p-4 rounded-lg 
                                    ${color == 'Black' && "bg-black" || color == 'Gray' && "bg-gray-500" || color == 'Red' && "bg-red-500" || color == 'Pink' && "bg-pink-500" || color == 'Orange' && 'bg-orange-500' || color == 'Yellow' && 'bg-yellow-500' || color == 'Green' && 'bg-green-500' || color == 'Teal' && "bg-teal-500" || color == 'Cyan' && 'bg-cyan-500' || color == 'Blue' && "bg-blue-500" || color == 'Indigo' && "bg-indigo-500" || color == 'Violet' && "bg-violet-500" || color == 'White' && "bg-white text-black"}
                                    ${selectedColor === color ? 'ring-2 ring-white' : ''}
                                    `}
                                onClick={() => setSelectedColor(color)}
                            >
                                {color}
                            </button>
                        ))}
                    </div>
                </div>
            </div>}
        </div>
    );
};

export default ColorCustomizer;
