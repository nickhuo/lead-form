import './globals.css';
import type { Metadata } from 'next';
import Providers from './components/Providers';

export const metadata: Metadata = {
  title: 'Immigration Case Assessment Form',
  description: 'Get an assessment of your immigration case from our team of experienced attorneys.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
