import { Cormorant_Garamond, Plus_Jakarta_Sans, JetBrains_Mono, Fraunces, Outfit } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-canela',
  weight: ['300', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-subheading',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata = {
  title: 'Pink Salt Cafe | Artisanal Roasts, Stone Hearth & Culinary Craft • Hubballi',
  description:
    'Pink Salt Cafe located at Kusugal Road, Hubballi. Luxury artisanal culinary craft, single-origin roasts, 36h wild fermented hearth pizzas, handcrafted pastas, and mineral cold brews.',
  keywords: [
    'Pink Salt Cafe',
    'Hubballi Cafe',
    'Kusugal Road',
    'Artisanal Coffee',
    'Sourdough Pizza',
    'Handcrafted Pasta',
    'Hubballi Dining',
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${outfit.variable} ${cormorant.variable} ${jakarta.variable} ${jetbrains.variable}`}
    >
      <body className="bg-[#18181A] text-[#FAF7F2] antialiased selection:bg-[#E8998D] selection:text-[#18181A] font-sans">
        {children}
      </body>
    </html>
  );
}
