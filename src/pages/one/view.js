'use client';

import Container from '@mui/material/Container';

import { useSettingsContext } from 'src/components/settings';
import Checkout from './Checkout';
import { useStripe } from '@stripe/react-stripe-js';

import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

// ----------------------------------------------------------------------

export default function OneView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Elements stripe={stripePromise}>
        <Checkout />
      </Elements>
    </Container>
  );
}
