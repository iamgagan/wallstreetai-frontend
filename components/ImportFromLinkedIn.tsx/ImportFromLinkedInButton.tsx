import { Button } from '../ui/button';
import { CardContent } from '../ui/card';
import { FaLinkedin } from 'react-icons/fa';

interface ImportFromLinkedInButtonProps {
  onClick: () => void;
}

export const ImportFromLinkedInButton = ({
  onClick,
}: ImportFromLinkedInButtonProps) => {
  return (
    <Button
      variant="ghost"
      className="w-[90%] flex justify-start hover:border-[1px] hover:border-black hover:bg-primary-foreground cursor-pointer bg-secondary py-2 h-[60px] shadow-xl rounded-lg"
      onClick={onClick}
    >
      <CardContent className="flex gap-3 items-center justify-start">
        <FaLinkedin size={25} color={'#0a66c2'} />
        <p className="text-sm">Import from LinkedIn</p>
      </CardContent>
    </Button>
  );
};
