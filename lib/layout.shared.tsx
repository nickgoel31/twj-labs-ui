import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { LinkItemType } from 'fumadocs-ui/layouts/shared';
import { BookIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: 'TWJ Labs UI',
      
    },
    githubUrl: 'fggfdg',
  };
}

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <div className='dark:block hidden'>
        <Image 
        src="/symbol-logo-white.svg"
        alt="Fumadocs UI Logo"
        width={32}
        height={32}
      />
      </div>
      <div className='dark:hidden block'>
        <Image 
        src="/symbol-logo-black.svg"
        alt="Fumadocs UI Logo"
        width={32}
        height={32}
      />
      </div>
      <span className="font-bold text-lg">UI</span>
    </Link>
  );
}

