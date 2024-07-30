'use client'
import { HiPencil, HiDocumentSearch } from "react-icons/hi";
import {TabItem, TabContainer} from '../ui/tab';


export const TabItemTitle = ({ title}: {title:string}) => {
  return (
    <p className="text-lg">{title }</p>
  );
}

interface ResumeMenuTabsProps {
  onTabChange: (menu: number) => void;
  menu:number
}

export function ResumeMenuTabs({onTabChange, menu}: ResumeMenuTabsProps) {
  const handleClick = (event: React.MouseEvent<HTMLUListElement>) => {
    // Check if the clicked element is an li
    if (event.target) {
      const clickedItem = event.target as HTMLElement;
      const parentNode = clickedItem.parentNode;
  
      if (parentNode) {
        const listItems = Array.from(parentNode.children);
        const index = listItems.indexOf(clickedItem);
        if (index !== -1) {
          onTabChange(index);
        }
      }
    }
  };
  
  return (
    <TabContainer 
      aria-label="Tabs with icons" 
      onActiveTabChange={handleClick}
    >
      <TabItem active={menu === 0} title={<TabItemTitle title="Edit" />} icon={<HiPencil size={20}/>}/>
      <TabItem active={menu === 1} title={<TabItemTitle title="Preview" />} icon={<HiDocumentSearch size={20} />} />
    </TabContainer>
  );
}
