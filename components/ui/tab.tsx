
'use client';
import React from 'react';

interface TabContainerProps {
    children: React.ReactNode;
    onActiveTabChange: (item:number) => void;
}

export const TabContainer = ({ children, onActiveTabChange }:TabContainerProps) => {
    
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        // Check if the clicked element is an li
        if (event.target && event.target?.nodeName === 'LI') {
          const clickedItem = event.target;
          const listItems = Array.from(clickedItem?.parentNode.children);
          const index = listItems.indexOf(clickedItem);
          onActiveTabChange(index);
        }
    };
    
    return (
    <div className="border-b border-gray-200 dark:border-gray-700">
        <ul 
            className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400"
            onClick={handleClick}
        >
            {children}
        </ul>
    </div>)
}

interface TabItemProps {
    title: React.ReactNode;
    active?: boolean;
    icon: React.ReactNode;
}

export const TabItem = ({ title, active, icon }:TabItemProps) => {
    return (
        <li className="me-2">
            <a href="#" className={`inline-flex gap-2 items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg ${active ? 'text-blue-600 border-b-2 border-blue-600 bg-accent' : ''} hover:text-gray-600 hover:border-gray-300 group`}>
                <div>{icon}</div>
                {title}
            </a>
        </li>
    )
}
    