'use client';

import Container from '@mui/material/Container';

import { useSettingsContext } from 'src/components/settings';
import Checkout from './Checkout';

// ----------------------------------------------------------------------

export default function OneView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Checkout />
    </Container>
  );
}
