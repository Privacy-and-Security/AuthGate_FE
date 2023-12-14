'use client';

import Container from '@mui/material/Container';

import { useSettingsContext } from 'src/components/settings';
import Checkout from '../../assets/checkout/Checkout';
import { useStripe } from '@stripe/react-stripe-js';

import { loadStripe } from '@stripe/stripe-js';
import { CardElement, useElements } from '@stripe/react-stripe-js';
import dynamic from 'next/dynamic';

const Elements = dynamic(
  () => import('@stripe/react-stripe-js').then((mod) => mod.Elements),
  { ssr: false }
);

import React, { useEffect, useState } from 'react';

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

// ----------------------------------------------------------------------

export default function OneView() {
  const settings = useSettingsContext();

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Elements stripe={stripePromise}>
        <Checkout />
      </Elements>
    </Container>
  );
}
