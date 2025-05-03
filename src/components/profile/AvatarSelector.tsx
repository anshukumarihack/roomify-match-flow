
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Check } from 'lucide-react';

const PRESET_AVATARS = [
  { id: 1, url: 'https://source.unsplash.com/collection/1346951/150x150?1', alt: 'Person 1' },
  { id: 2, url: 'https://source.unsplash.com/collection/1346951/150x150?2', alt: 'Person 2' },
  { id: 3, url: 'https://source.unsplash.com/collection/1346951/150x150?3', alt: 'Person 3' },
  { id: 4, url: 'https://source.unsplash.com/collection/1346951/150x150?4', alt: 'Person 4' },
  { id: 5, url: 'https://source.unsplash.com/collection/1346951/150x150?5', alt: 'Person 5' },
  { id: 6, url: 'https://source.unsplash.com/collection/1346951/150x150?6', alt: 'Person 6' },
  { id: 7, url: 'https://source.unsplash.com/collection/1346951/150x150?7', alt: 'Person 7' },
  { id: 8, url: 'https://source.unsplash.com/collection/1346951/150x150?8', alt: 'Person 8' },
  { id: 9, url: 'https://source.unsplash.com/collection/1346951/150x150?9', alt: 'Person 9' },
  { id: 10, url: 'https://source.unsplash.com/collection/1346951/150x150?10', alt: 'Person 10' },
  { id: 11, url: 'https://source.unsplash.com/collection/1346951/150x150?11', alt: 'Person 11' },
  { id: 12, url: 'https://source.unsplash.com/collection/1346951/150x150?12', alt: 'Person 12' },
  { id: 13, url: 'https://source.unsplash.com/collection/1346951/150x150?13', alt: 'Person 13' },
  { id: 14, url: 'https://source.unsplash.com/collection/1346951/150x150?14', alt: 'Person 14' },
  { id: 15, url: 'https://source.unsplash.com/collection/1346951/150x150?15', alt: 'Person 15' },
  { id: 16, url: 'https://source.unsplash.com/collection/1346951/150x150?16', alt: 'Person 16' },
];

interface AvatarSelectorProps {
  selectedUrl?: string;
  onSelect: (url: string) => void;
}

const AvatarSelector: React.FC<AvatarSelectorProps> = ({ selectedUrl, onSelect }) => {
  return (
    <div className="p-4">
      <h3 className="font-medium mb-3 text-center">Choose an Avatar</h3>
      <ScrollArea className="h-64">
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
