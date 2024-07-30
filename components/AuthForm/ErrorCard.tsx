import { BackButton } from './BackButton';
import { Card, CardHeader, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export const ErrorCard = () => {
  return (
    <Card className="w-[400px] shadow-md mt-[100px]">
      <CardHeader>
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
          <h1 className={cn('text-3xl font-semibold')}>🔐 Auth</h1>
          <p className="text-muted-foreground text-sm">
            {'Oops, something went wrong!'}
          </p>
        </div>
      </CardHeader>
      <CardFooter />
      <BackButton label="Back to login" href="/auth/login" />
      <CardFooter />
    </Card>
  );
};
