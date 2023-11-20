import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export default function CheckoutStepOne() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Grid
        container
        spacing={5}
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Grid item xs={12} sm={12} md={6}>
          <Typography
            variant="h3"
            component="div"
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            Start to Checkout
          </Typography>
          <Typography
            variant="body2"
            component="div"
            sx={{ display: 'flex', justifyContent: 'center', marginTop: 3, color: '#5D5D5B' }}
          >
            This page will simulate a user payment process.
          </Typography>
          <Typography
            variant="body2"
            component="div"
            sx={{ display: 'flex', justifyContent: 'center', marginTop: 1, color: '#5D5D5B' }}
          >
            Enjoy the experience!
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
