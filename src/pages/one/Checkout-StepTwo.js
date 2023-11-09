import { yupResolver } from '@hookform/resolvers/yup';
import { RHFTextField } from '../../@mui-library/components/hook-form';
import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export function FormGroupStepTwo() {
  return (
    <>
      {/*----------------- Title & Description -----------------*/}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 5,
        }}
      >
        <Typography variant="h4">Enter Payment Details</Typography>
        <Box
          sx={{
            width: { xs: '70%', sm: '50%', md: '35%', lg: '35%', xl: '35%', xxl: '35%' },
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <Typography variant="caption">
            Please provide accurate and comprehensive information about your group to ensure the
            best possible experience for all members.
          </Typography>
        </Box>
      </Box>
      {/*----------------- Form -----------------*/}
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Stack
          component={'form'}
          spacing={4}
          sx={{
            width: { xs: '90%', sm: '80%', md: '70%', lg: '55%', xl: '55%', xxl: '50%' },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Stack sx={{ width: '100%' }}>
            <Typography variant="h6">Name</Typography>
            <TextField required name="name" id="outlined-required" placeholder="eg. Tony Swift" />
          </Stack>

          <Stack
            direction={{ xs: 'column', sm: 'column', md: 'row' }}
            spacing={2}
            sx={{
              width: '100%',
              justifyContent: 'space-between',
              '& > *': {
                flex: 1,
              },
            }}
          >
            <Stack>
              <Typography variant="h6">Card Number</Typography>
              <TextField
                required
                name="cardNumber"
                id="outlined-required"
                placeholder="1234-1234-1234-1234"
                style={{ marginBottom: 15 }}
              />
            </Stack>
            <Stack>
              <Typography variant="h6">CVV</Typography>
              <TextField
                required
                name="cvv"
                id="outlined-required"
                placeholder="eg. 000"
                style={{ marginBottom: 15 }}
              />
            </Stack>
          </Stack>
          <Stack
            direction={{ xs: 'column', sm: 'column', md: 'row' }}
            spacing={2}
            sx={{
              width: '100%',
              justifyContent: 'space-between',
              '& > *': {
                flex: 1,
              },
            }}
          >
            <Stack>
              <Typography variant="h6">Expiration Date</Typography>
              <TextField
                required
                name="expireDate"
                id="outlined-required"
                placeholder="eg. 123-456-7890"
                style={{ marginBottom: 15 }}
              />
            </Stack>
            <Stack>
              <Typography variant="h6">Zip code</Typography>
              <TextField
                required
                name="zipCode"
                id="outlined-required"
                placeholder="eg. 97000"
                style={{ marginBottom: 15 }}
              />
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </>
  );
}

export default function CheckoutStepTwo() {
  return <> </>
};
