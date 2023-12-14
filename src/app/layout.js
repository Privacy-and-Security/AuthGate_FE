/* eslint-disable perfectionist/sort-imports */

import 'src/global.css';

// ----------------------------------------------------------------------

import PropTypes from 'prop-types';

import ThemeProvider from 'src/theme';
import { primaryFont } from 'src/theme/typography';

import ProgressBar from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import { SettingsDrawer, SettingsProvider } from 'src/components/settings';

import { UserProvider } from '@auth0/nextjs-auth0/client';

// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, CardElement, useElements } from '@stripe/react-stripe-js';


// ----------------------------------------------------------------------

export const metadata = {
  title: 'Minimal UI Kit',
  description:
    'The starting point for your next project with Minimal UI Kit, built on the newest version of Material-UI ©, ready to be customized to your style',
  keywords: 'react,material,kit,application,dashboard,admin,template',
  themeColor: '#000000',
  manifest: '/manifest.json',
  viewport: { width: 'device-width', initialScale: 1, maximumScale: 1 },
  icons: [
    { rel: 'icon', url: '/favicon/favicon.ico' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', url: '/favicon/favicon-16x16.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', url: '/favicon/favicon-32x32.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', url: '/favicon/apple-touch-icon.png' },
  ],
};

// const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);

export default function RootLayout({ children }) {
  // const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

  return (
    <html lang="en" className={primaryFont.className}>
      <body>
        {/* <Elements stripe={stripePromise}> */}
          <UserProvider>
            <SettingsProvider
              defaultSettings={{
                themeMode: 'light', // 'light' | 'dark'
                themeDirection: 'ltr', //  'rtl' | 'ltr'
                themeContrast: 'default', // 'default' | 'bold'
                themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
                themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
                themeStretch: false,
              }}
            >
              <ThemeProvider>
                <MotionLazy>
                  <SettingsDrawer />
                  <ProgressBar />
                  {children}
                </MotionLazy>
              </ThemeProvider>
            </SettingsProvider>
          </UserProvider>
        {/* </Elements> */}
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node,
};
