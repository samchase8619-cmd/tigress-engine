import './globals.css';

export const metadata = {
  title: 'PES Engine UI',
  description: 'A minimal Next.js app for PES Engine UI',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}