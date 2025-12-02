import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Inter } from 'next/font/google';
import SearchDialog from '@/components/search';
import { Banner } from 'fumadocs-ui/components/banner';
import { ThemeProvider } from '@/contexts/ui-theme-context';

const inter = Inter({
  subsets: ['latin'],
});

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
   <ThemeProvider initialTheme='modern'>
      <html lang="en" className={inter.className} suppressHydrationWarning>
        <body className="flex flex-col min-h-screen">
          <RootProvider theme={{enabled:true, defaultTheme:'dark'}}>
            <Banner
    variant="rainbow"
    id='announcement-banner'
  >
    We 
  </Banner>
            {children}
          </RootProvider>
        </body>
      </html>
   </ThemeProvider>
  );
}
