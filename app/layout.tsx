import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Admission Enquiry | Guru Nanak University, Hyderabad',
  description: 'Apply for admission to Guru Nanak University, Hyderabad. Fill out the enquiry form for B.Tech, MBA, B.Sc, Law, and many more programs.',
  manifest: '/site.webmanifest',
  themeColor: '#4f46e5',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'GNU Admissions',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased text-slate-900 bg-slate-50" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
