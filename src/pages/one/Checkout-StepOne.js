import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
// import ParcelListCard from 'Pages/Buyer/1-Parcels/parcel-components/ParcelListCard';

export default function CheckoutStepOne() {
  return (
    <Box
      sx={{
        // flexGrow: 1,
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
          alignItems: 'stretch',
        }}
      >
        <Grid item xs={12} sm={12} md={6}>
          {/* <Card sx={{ minWidth: 350 }}>
            <CardContent> */}
          <Typography variant="h4" component="div" sx={{ display: 'flex' }}>
            Start to Checkout
          </Typography>
          <Typography
            variant="body2"
            component="div"
            sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}
          >
            Number of Items 这行字我看不见写了啥，截图看不清
          </Typography>

          {/* </CardContent>
          </Card> */}
        </Grid>
      </Grid>
    </Box>
  );
}
