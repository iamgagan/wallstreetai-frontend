"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import React from "react";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/store";

export const Profile = () => {
  const { isLoggedIn } = useUserStore();
  return (
    <Avatar>
      {isLoggedIn ? (
        <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
      ) : (
        <AvatarFallback>CN</AvatarFallback>
      )}
    </Avatar>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className='text-sm font-medium leading-none'>{title}</div>
          <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";

const MenuItems = [
  {
    title: "Resume Generator",
    href: "/resume-generator",
  },
  {
    title: "Resume Score",
    href: "/resume-score",
  },
  {
    title: "Mock Interview",
    href: "/mock-interview",
  },
  {
    title: "Career Insights",
    href: "/career-insights",
  },
  {
    title: "Ask AI",
    href: "/ask-ai",
  },
];

export const ProfileMenu = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Profile />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className='flex flex-col gap-2 fixed mt-4 right-2 w-[200px] shadow-lg'>
              {MenuItems.map((item) => (
                <ListItem
                  key={item.title}
                  title={item.title}
                  href={item.href}
                />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
