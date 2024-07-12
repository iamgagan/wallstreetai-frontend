import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "../ui/button";

interface MenuButtonProps extends ButtonProps {
  buttonLabel: string | React.ReactNode;
  className?: string;
}

export const MenuButton = ({
  buttonLabel,
  className,
  ...props
}: MenuButtonProps) => {
  return (
    <Button
      onClick={props.onClick}
      className={cn(
        className,
        "border-r-0 rounded-r-none w-[400px] flex justify-start text-xl"
      )}
      variant='menu'
      size='menu'
    >
      {buttonLabel}
    </Button>
  );
};
