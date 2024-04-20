'use client';

import type { MobileFooterMenuList } from '@/components/navbar/mobileBottomNav';
import React, { FC } from 'react';
import { usePathname } from 'next/navigation';
import { Link } from '@nextui-org/link';
import { Tooltip, TooltipContent, TooltipTrigger } from '@ui/tooltip';

import { cn } from '@/lib/utils';

const buttonsClassname = `
    pb-1
    mx-1
    
    hover:border-red-800
    hover:text-slate-100

    hover:scale-110
    hover:shadow-2xl

    transition duration-300
    ease-in-out
    
`;

type Props = {
  active?: boolean;
  label?: string;
  icon: React.JSX.Element;
  path: string;
};

const MobileBottoms = ({ menuList }: { menuList: MobileFooterMenuList[] }) => {
  const pathname = usePathname();

  return (
    <div>
      {menuList.map((item) => (
        <MobileBottomNavButton
          key={item.label}
          label={item.label}
          icon={item.icon}
          path={item.path}
          active={pathname === item.path}
        />
      ))}
    </div>
  );
};

const MobileBottomNavButton: FC<Props> = ({ active, label, icon, path }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          showAnchorIcon
          href={path}
          anchorIcon={icon}
          isDisabled={active}
          className={cn(
            buttonsClassname,
            active && 'border-b-2 border-primary-600 text-primary-600',
          )}
        />
      </TooltipTrigger>

      <TooltipContent
        side="top"
        sideOffset={12}
        className="rounded-full border border-slate-300 bg-slate-200 font-bold
          text-slate-900 opacity-60
          shadow-2xl

          dark:bg-slate-700 dark:text-slate-100
          dark:opacity-80
          "
      >
        <span>{label}</span>
      </TooltipContent>
    </Tooltip>
  );
};

export { MobileBottoms };
