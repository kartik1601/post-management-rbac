import './globals.css';
import Navbar from './components/navbar';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Post Management System',
  description: 'Manage your posts with RBAC system',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>

        <div className="min-h-screen bg-gray-100">
          <header className="bg-blue-600 text-white p-4 text-center">
            <a className="text-2xl font-bold"
            href='/'
            >Post Management</a>
          </header>
          {/* <Navbar/> */}
          <main>{children}</main>
        </div>
        
      </body>
    </html>
  );
}
