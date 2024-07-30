
'use client';
import React from 'react';

interface TabContainerProps {
    children: React.ReactNode;
    onActiveTabChange: (event: React.MouseEvent<HTMLUListElement>) => void;
}

export const TabContainer = ({ children, onActiveTabChange }:TabContainerProps) => {

    return (
    <div className="border-b border-gray-200 dark:border-gray-700"
    >
        <ul 
            className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400"
            onClick={onActiveTabChange}
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
        <li className={`inline-flex gap-2 items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg ${active ? 'text-blue-600 border-b-2 border-blue-600 bg-accent' : ''} hover:text-gray-600 hover:border-gray-300 group`}>
            <div>{icon}</div>
            {title}
        </li>
    )
}
    