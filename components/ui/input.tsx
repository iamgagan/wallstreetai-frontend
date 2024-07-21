import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md bg-form-input text-lg px-3 py-2 ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export const InputWithPrefix = React.forwardRef<HTMLInputElement, InputProps & {prefix:string}>(
  ({ className, prefix, type, ...props }, ref) => {
    return (
      <div className="flex h-10 w-full rounded-md bg-form-input text-lg px-2 py-2 ring-offset-white placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
        <span className='flex items-center pl-3 text-lg text-zinc-600'>
          {prefix}
        </span>
        <input
          type={type}
          className={cn(
            "ml-2 px-1 w-full rounded-sm bg-form-input text-lg ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

export { Input };
