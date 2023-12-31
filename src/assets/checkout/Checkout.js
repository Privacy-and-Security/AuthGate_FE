import { useUser } from '@auth0/nextjs-auth0/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from 'react';
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import FormProvider from '../../@mui-library/components/hook-form';
import Main from '../../@mui-library/layouts/dashboard/Main';
import { FormGroupStepTwo } from '../../pages/one/Checkout-StepTwo';
import CryptoJS from 'crypto-js';

import dynamic from 'next/dynamic';

import {
  Elements,
  CardElement,
  useElements,
  useStripe,
  CardCvcElement,
  CardNumberElement,
  CardExpiryElement,
} from '@stripe/react-stripe-js';

const steps = ['', '', ''];
export default function Checkout() {
  const recaptchaRef = React.createRef();
  const [activeStep, setActiveStep] = React.useState(0);
  const [recaptchaToken, setRecaptchaToken] = useState('');

  const [allowPurchase, setAllowPurchase] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);

  const elements = useElements();
  const stripe = useStripe();

  const handleNext = async (event) => {
    setAllowPurchase(false);

    // get payment method from stripe before confirming
    if (activeStep === 0) {
      try {
        console.log('here');

        // event.preventDefault();

        if (!stripe || !elements) {
          return;
        }

        const paymentMethod = await stripe.createPaymentMethod({
          type: 'card',
          card: elements.getElement(CardNumberElement),
        });

        console.log(`paymentMethod: ${JSON.stringify(paymentMethod)}`);

        setPaymentMethod(paymentMethod);
      } catch (error) {
        console.log(`error: ${error}`);
      }
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const onRecaptchaChange = (token) => {
    setAllowPurchase(true);
    setRecaptchaToken(token);
  };

  const handleBack = () => {
    if (activeStep === 1) {
      const confirmed = window.confirm('You will lose your selection. Are you sure to leave?');
      if (confirmed) {
      } else {
        return;
      }
      setAllowPurchase(false);
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setAllowPurchase(false);
  };

  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const defaultValues = {
    name: '',
    zipCode: '',
  };

  const NewGroupSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    zipCode: Yup.string()
      .required('Zip code is required')
      .matches(/^[0-9]{5}(-[0-9]{4})?$/, 'Zip code must be 5 digits or 5+4 digits'),
  });

  const methods = useForm({
    resolver: yupResolver(NewGroupSchema),
    defaultValues,
  });

  const { handleSubmit, setValue, getValues } = methods;

  const { user, error, isLoading } = useUser();

  const sendData = async (data) => {
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      process.env.NEXT_PUBLIC_AES_SECRET_KEY
    );
    const response = await fetch('https://api.authgate.work/pay', {
      // const response = await fetch('http://localhost:3005/pay', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        encrypted: encryptedData.toString(),
      }),
    });

    if (response.ok) {
      console.log('Sent data to the server');
    } else {
      throw new Error('Failed to send data to the server');
    }
  };

  const onSubmit = async (data) => {
    handleNext();
  };

  const getData = () => {
    const data = {
      name: getValues('name'),
      cardNumber: getValues('cardNumber'),
      cvv: getValues('cvv'),
      expireDate: getValues('expireDate'),
      zipCode: getValues('zipCode'),
      user: user,
      recaptchaToken,
    };

    return data;
  };

  const onCompletePurchase = async () => {
    const data = getData();

    submitPaymentToStripe();

    console.log(`data: ${JSON.stringify(data)}`);
    await sendData(data);
    handleNext();
  };

  const fetchPaymentIntentClientSecret = async (paymentMethod) => {
    const amount = 1000;
    const currency = 'usd';

    const response = await fetch('https://api.authgate.work/create-payment-intent', {
      // const response = await fetch('http://localhost:3005/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        currency,
        paymentMethodId: paymentMethod,
      }),
    });

    const data = await response.json();
    return data.clientSecret;
  };

  const submitPaymentToStripe = async () => {
    try {
      const paymentMethodId = paymentMethod.paymentMethod.id;

      const clientSecret = await fetchPaymentIntentClientSecret(paymentMethodId);
    } catch (error) {
      console.log(`error: ${error}`);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {/*-------Box is the layout of the whole page-----*/}
      <Box
        sx={{
          display: { lg: 'flex' },
          minHeight: { lg: 1 },
        }}
      >
        {/*--------------Navigation bar------------------*/}

        <Main>
          <Container
            maxWidth="xl"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box sx={{ width: '100%', alignItems: 'center' }}>
              <Stepper
                activeStep={activeStep}
                sx={{
                  width: '50%',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  display: 'flex',
                  justifyContent: 'center',

                  mb: 10,
                }}
              >
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1, display: 'flex', justifyContent: 'center' }}>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Box
                    sx={{ display: 'flex', flexDirection: 'row', pt: 5, justifyContent: 'center' }}
                  >
                    <Button onClick={handleReset}>Reset</Button>
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {/*Body content*/}

                  {/*page 1*/}
                  {activeStep === 0 && <FormGroupStepTwo />}

                  {/*page 2*/}
                  {activeStep === 1 && (
                    <>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          mb: 5,
                        }}
                      >
                        <Typography variant="h4">Confirm your Payment Information</Typography>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            mb: 5,
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                            }}
                          >
                            <Typography
                              variant="body1"
                              component="div"
                              sx={{
                                display: 'flex',
                                marginTop: 3,
                                color: '#5D5D5B',
                                marginRight: 2,
                                fontWeight: 'bold',
                              }}
                            >
                              Name:
                            </Typography>
                            <Typography
                              variant="body1"
                              component="div"
                              sx={{
                                display: 'flex',
                                marginTop: 3,
                                color: '#5D5D5B',
                              }}
                            >
                              {getValues('name')}
                            </Typography>
                          </Box>
                          {/* <Typography
                            variant="body2"
                            component="div"
                            sx={{
                              display: 'flex',
                              marginTop: 3,
                              color: '#5D5D5B',
                            }}
                          >
                            Credit Card: {getValues('cardNumber')}
                          </Typography>
                          <Typography
                            variant="body2"
                            component="div"
                            sx={{
                              display: 'flex',
                              marginTop: 3,
                              color: '#5D5D5B',
                            }}
                          >
                            Expire Date: {getValues('expireDate')}
                          </Typography> */}
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                            }}
                          >
                            <Typography
                              variant="body1"
                              component="div"
                              sx={{
                                display: 'flex',
                                marginTop: 2,
                                color: '#5D5D5B',
                                marginRight: 2,
                                fontWeight: 'bold',
                              }}
                            >
                              Zip Code:
                            </Typography>
                            <Typography
                              variant="body1"
                              component="div"
                              sx={{
                                display: 'flex',
                                marginTop: 2,
                                color: '#5D5D5B',
                              }}
                            >
                              {getValues('zipCode')}
                            </Typography>
                          </Box>
                          <Typography
                            variant="body1"
                            component="div"
                            sx={{
                              display: 'flex',
                              marginTop: 3,
                              color: '#5D5D5B',
                              fontWeight: 'bold',
                            }}
                          >
                            Total Payment Amount
                          </Typography>
                          <Typography
                            variant="body1"
                            component="div"
                            sx={{
                              display: 'flex',
                              color: '#5D5D5B',
                              fontWeight: 'bold',
                              fontSize: 36,
                            }}
                          >
                            $10.00
                          </Typography>
                        </Box>
                      </Box>
                    </>
                  )}

                  {/*page 3*/}
                  {activeStep === 2 && (
                    <>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          mb: 5,
                        }}
                      >
                        <Typography variant="h4">You're All Set!</Typography>
                        <Box
                          sx={{
                            width: '35%',
                            alignItems: 'center',
                            flexDirection: 'column',
                            display: 'flex',
                            mt: 2,
                          }}
                        >
                          <div
                            style={{
                              textAlign: 'center',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              height: '100%',
                            }}
                          >
                            <Typography variant="caption" style={{ color: '#5D5D5B' }}>
                              Congratulations!
                            </Typography>
                            <Typography variant="caption" style={{ color: '#5D5D5B' }}>
                              Your payment has been processed!
                            </Typography>
                          </div>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          alignItems: 'center',
                          flexDirection: 'column',
                          display: 'flex',
                        }}
                      >
                        <div>
                          <svg
                            width="397"
                            height="298"
                            viewBox="0 0 397 298"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M387.5 270C392.747 270 397 265.747 397 260.5C397 255.253 392.747 251 387.5 251C382.253 251 378 255.253 378 260.5C378 265.747 382.253 270 387.5 270Z"
                              fill="#A9D250"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M9.5 143C14.7467 143 19 138.747 19 133.5C19 128.253 14.7467 124 9.5 124C4.25329 124 0 128.253 0 133.5C0 138.747 4.25329 143 9.5 143Z"
                              fill="#A9D250"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M325.5 251C327.985 251 330 248.985 330 246.5C330 244.015 327.985 242 325.5 242C323.015 242 321 244.015 321 246.5C321 248.985 323.015 251 325.5 251Z"
                              fill="#A9D250"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M338.5 222C340.433 222 342 220.433 342 218.5C342 216.567 340.433 215 338.5 215C336.567 215 335 216.567 335 218.5C335 220.433 336.567 222 338.5 222Z"
                              fill="#A9D250"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M331.5 179C333.433 179 335 177.433 335 175.5C335 173.567 333.433 172 331.5 172C329.567 172 328 173.567 328 175.5C328 177.433 329.567 179 331.5 179Z"
                              fill="#A9D250"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M301 239C302.657 239 304 237.657 304 236C304 234.343 302.657 233 301 233C299.343 233 298 234.343 298 236C298 237.657 299.343 239 301 239Z"
                              fill="#A9D250"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M282 282C283.105 282 284 281.105 284 280C284 278.895 283.105 278 282 278C280.895 278 280 278.895 280 280C280 281.105 280.895 282 282 282Z"
                              fill="#A9D250"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M293 108C294.105 108 295 107.105 295 106C295 104.895 294.105 104 293 104C291.895 104 291 104.895 291 106C291 107.105 291.895 108 293 108Z"
                              fill="#A9D250"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M373 141C374.105 141 375 140.105 375 139C375 137.895 374.105 137 373 137C371.895 137 371 137.895 371 139C371 140.105 371.895 141 373 141Z"
                              fill="#A9D250"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M230 77C231.105 77 232 76.1046 232 75C232 73.8954 231.105 73 230 73C228.895 73 228 73.8954 228 75C228 76.1046 228.895 77 230 77Z"
                              fill="#A9D250"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M152.5 79C154.433 79 156 77.433 156 75.5C156 73.567 154.433 72 152.5 72C150.567 72 149 73.567 149 75.5C149 77.433 150.567 79 152.5 79Z"
                              fill="#A9D250"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M76 81C78.7614 81 81 78.7614 81 76C81 73.2386 78.7614 71 76 71C73.2386 71 71 73.2386 71 76C71 78.7614 73.2386 81 76 81Z"
                              fill="#A9D250"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M114.5 62C116.433 62 118 60.433 118 58.5C118 56.567 116.433 55 114.5 55C112.567 55 111 56.567 111 58.5C111 60.433 112.567 62 114.5 62Z"
                              fill="#A9D250"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M43 26C44.6569 26 46 24.6569 46 23C46 21.3431 44.6569 20 43 20C41.3431 20 40 21.3431 40 23C40 24.6569 41.3431 26 43 26Z"
                              fill="#A9D250"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M56 175C57.6569 175 59 173.657 59 172C59 170.343 57.6569 169 56 169C54.3431 169 53 170.343 53 172C53 173.657 54.3431 175 56 175Z"
                              fill="#A9D250"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M99 245C100.657 245 102 243.657 102 242C102 240.343 100.657 239 99 239C97.3431 239 96 240.343 96 242C96 243.657 97.3431 245 99 245Z"
                              fill="#A9D250"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M53 298C55.7614 298 58 295.761 58 293C58 290.239 55.7614 288 53 288C50.2386 288 48 290.239 48 293C48 295.761 50.2386 298 53 298Z"
                              fill="#A9D250"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M151 298C152.657 298 154 296.657 154 295C154 293.343 152.657 292 151 292C149.343 292 148 293.343 148 295C148 296.657 149.343 298 151 298Z"
                              fill="#A9D250"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M63 225C64.1046 225 65 224.105 65 223C65 221.895 64.1046 221 63 221C61.8954 221 61 221.895 61 223C61 224.105 61.8954 225 63 225Z"
                              fill="#A9D250"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M209 57C211.761 57 214 54.7614 214 52C214 49.2386 211.761 47 209 47C206.239 47 204 49.2386 204 52C204 54.7614 206.239 57 209 57Z"
                              fill="#A9D250"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M199 10C201.761 10 204 7.76142 204 5C204 2.23858 201.761 0 199 0C196.239 0 194 2.23858 194 5C194 7.76142 196.239 10 199 10Z"
                              fill="#A9D250"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M231.5 26C233.433 26 235 24.433 235 22.5C235 20.567 233.433 19 231.5 19C229.567 19 228 20.567 228 22.5C228 24.433 229.567 26 231.5 26Z"
                              fill="#A9D250"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M322.5 51C324.433 51 326 49.433 326 47.5C326 45.567 324.433 44 322.5 44C320.567 44 319 45.567 319 47.5C319 49.433 320.567 51 322.5 51Z"
                              fill="#A9D250"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M311 83C312.657 83 314 81.6569 314 80C314 78.3431 312.657 77 311 77C309.343 77 308 78.3431 308 80C308 81.6569 309.343 83 311 83Z"
                              fill="#A9D250"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M370 124C371.657 124 373 122.657 373 121C373 119.343 371.657 118 370 118C368.343 118 367 119.343 367 121C367 122.657 368.343 124 370 124Z"
                              fill="#A9D250"
                            />
                            <g filter="url(#filter0_d_0_1)">
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M198.5 250C244.616 250 282 212.616 282 166.5C282 120.384 244.616 83 198.5 83C152.384 83 115 120.384 115 166.5C115 212.616 152.384 250 198.5 250Z"
                                fill="#EBF4D6"
                              />
                            </g>
                            <path
                              d="M270 166.5C270 205.988 237.988 238 198.5 238C159.012 238 127 205.988 127 166.5C127 127.012 159.012 95 198.5 95C237.988 95 270 127.012 270 166.5Z"
                              fill="#80B213"
                              stroke="white"
                              stroke-width="8"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M174 165.443L191.279 183L224 151"
                              stroke="white"
                              stroke-width="9.19206"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <defs>
                              <filter
                                id="filter0_d_0_1"
                                x="95"
                                y="83"
                                width="207"
                                height="207"
                                filterUnits="userSpaceOnUse"
                                color-interpolation-filters="sRGB"
                              >
                                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                <feColorMatrix
                                  in="SourceAlpha"
                                  type="matrix"
                                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                  result="hardAlpha"
                                />
                                <feOffset dy="20" />
                                <feGaussianBlur stdDeviation="10" />
                                <feColorMatrix
                                  type="matrix"
                                  values="0 0 0 0 0.843137 0 0 0 0 0.843137 0 0 0 0 0.843137 0 0 0 0.236533 0"
                                />
                                <feBlend
                                  mode="normal"
                                  in2="BackgroundImageFix"
                                  result="effect1_dropShadow_0_1"
                                />
                                <feBlend
                                  mode="normal"
                                  in="SourceGraphic"
                                  in2="effect1_dropShadow_0_1"
                                  result="shape"
                                />
                              </filter>
                            </defs>
                          </svg>
                        </div>
                      </Box>
                    </>
                  )}

                  {/*------------------buttons------------------*/}

                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      pt: 2,
                      alignItems: 'center',
                    }}
                  >
                    {activeStep === 0 && (
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                        onChange={onRecaptchaChange}
                      />
                    )}
                  </Box>

                  {isSmallScreen && (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        pt: 2,
                        ml: 'auto',
                        mr: 'auto',
                      }}
                    >
                      {activeStep === 0 && (
                        <Button
                          variant={'contained'}
                          color="primary"
                          type="submit"
                          style={{
                            display: allowPurchase ? 'block' : 'none',
                          }}
                        >
                          Next
                        </Button>
                      )}
                      {activeStep === 1 && (
                        <Button variant={'contained'} color="primary" onClick={onCompletePurchase}>
                          Complete
                        </Button>
                      )}
                      {activeStep === 2 && (
                        <Button variant={'contained'} color="primary" onClick={handleNext}>
                          OK
                        </Button>
                      )}

                      {activeStep === 1 && <Box sx={{ flex: '1 1 auto' }} />}

                      <Button
                        color="inherit"
                        disabled={activeStep === 2 || activeStep === 3}
                        onClick={handleBack}
                      >
                        {activeStep === 1 ? 'Back' : ''}
                      </Button>
                    </Box>
                  )}

                  {!isSmallScreen && (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        pt: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      {activeStep === 1 && (
                        <Button color="inherit" onClick={handleBack}>
                          Back
                        </Button>
                      )}

                      {activeStep === 1 && <Box sx={{ width: '30%' }} />}

                      {activeStep === 0 && (
                        <Button
                          variant={'contained'}
                          color="primary"
                          style={{
                            display: allowPurchase ? 'block' : 'none',
                          }}
                          type="submit"
                        >
                          Next
                        </Button>
                      )}
                      {activeStep === 1 && (
                        <Button variant={'contained'} color="primary" onClick={onCompletePurchase}>
                          Complete
                        </Button>
                      )}
                      {activeStep === 2 && (
                        <Button variant={'contained'} color="primary" onClick={handleNext}>
                          Make a new payment
                        </Button>
                      )}
                    </Box>
                  )}
                </React.Fragment>
              )}
            </Box>
          </Container>
        </Main>
      </Box>
    </FormProvider>
  );
}
