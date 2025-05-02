
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Check } from 'lucide-react';

const PRESET_AVATARS = [
  { id: 1, url: 'https://source.unsplash.com/photo-1582562124811-c09040d0a901', alt: 'Orange and white cat' },
  { id: 2, url: 'https://source.unsplash.com/photo-1535268647677-300dbf3d78d1', alt: 'Grey tabby kitten' },
  { id: 3, url: 'https://source.unsplash.com/photo-1441057206919-63d19fac2369', alt: 'Two penguins' },
  { id: 4, url: 'https://source.unsplash.com/photo-1501286353178-1ec871fac814', alt: 'Monkey with banana' },
  { id: 5, url: 'https://source.unsplash.com/random/200x200?person=1', alt: 'Person 1' },
  { id: 6, url: 'https://source.unsplash.com/random/200x200?person=2', alt: 'Person 2' },
  { id: 7, url: 'https://source.unsplash.com/random/200x200?person=3', alt: 'Person 3' },
  { id: 8, url: 'https://source.unsplash.com/random/200x200?person=4', alt: 'Person 4' },
];

interface AvatarSelectorProps {
  selectedUrl?: string;
  onSelect: (url: string) => void;
}

const AvatarSelector: React.FC<AvatarSelectorProps> = ({ selectedUrl, onSelect }) => {
  return (
    <div className="p-4">
      <h3 className="font-medium mb-3 text-center">Choose an Avatar</h3>
      <ScrollArea className="h-48">
        <div className="grid grid-cols-4 gap-2">
          {PRESET_AVATARS.map((avatar) => (
            <div 
              key={avatar.id}
              className={`relative cursor-pointer rounded-md p-1 transition-all ${
                selectedUrl === avatar.url ? 'bg-roomify-purple/20 ring-2 ring-roomify-purple' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              onClick={() => onSelect(avatar.url)}
            >
              <Avatar className="h-16 w-16 mx-auto">
                <AvatarImage src={avatar.url} alt={avatar.alt} />
                <AvatarFallback>AV</AvatarFallback>
              </Avatar>
              {selectedUrl === avatar.url && (
                <div className="absolute top-0 right-0 bg-roomify-purple text-white rounded-full p-0.5">
                  <Check className="h-3 w-3" />
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default AvatarSelector;
