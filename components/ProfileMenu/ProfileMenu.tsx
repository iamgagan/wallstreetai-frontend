'use client';
import React from 'react';
import { Profile } from '../ProfileCard/ProfileCard';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '../ui/navigation-menu';
import { cn } from '@/lib/utils';
import { useUserStore } from '@/store/store';

const MenuItems = [
  {
    title: 'Settings',
    href: '',
    divider: true,
  },
  {
    title: 'Resume Generator',
    href: '/resume-generator',
  },
  {
    title: 'Resume Score',
    href: '/resume-score',
  },
  {
    title: 'Mock Interview',
    href: '/mock-interview',
  },
  {
    title: 'Career Insights',
    href: '/career-insights',
  },
  {
    title: 'Ask AI',
    href: '/ask-ai',
    divider: true,
  },

  {
    title: 'Sign Out',
    href: '/',
  },
];

interface ListItemProps extends React.ComponentPropsWithoutRef<'a'> {
  divider?: boolean;
}

const ListItem = React.forwardRef<React.ElementRef<'a'>, ListItemProps>(
  ({ className, title, children, divider, ...props }, ref) => {
    const { name } = useUserStore();
    return (
      <li className="px-2 bg-popover z-1000">
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'block select-none space-y-1 p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground rounded-lg',
              className
            )}
            {...props}
          >
            <div>
              {title === 'Settings' && name ? (
                <p className="pb-2 font-bold overflow-hidden whitespace-nowrap overflow-ellipsis text-sm text-blue-40">
                  {name}
                </p>
              ) : null}
              <p className="text-sm">{title}</p>
            </div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
        {divider && (
          <hr className="border-[1px] border-border w-[80%] mt-[1px] mx-2 bg-popover" />
        )}
      </li>
    );
  }
);

ListItem.displayName = 'ListItem';

export const ProfileMenu = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Profile />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex flex-col gap-[1px] fixed mt-4 right-2 w-[200px] shadow-lg bg-popover">
              {MenuItems.map((item) => (
                <ListItem
                  key={item.title}
                  title={item.title}
                  href={item.href}
                  divider={item.divider}
                />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
