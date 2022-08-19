import { ThemeProvider } from '@mui/material';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
// import { SnackbarProvider } from 'notistack';
// import { useEffect } from 'react';
// import '../styles/globals.css';
import { StoreProvider } from '../utils/Store';
import theme from '../utils/theme';

function MyApp({ Component, pageProps }) {
  // useEffect(() => {
  //   const jssStyles = document.querySelector('#jss-server-side');
  //   if (jssStyles) {
  //     jssStyles.parentElement.removeChild(jssStyles);
  //   }
  // }, []);
  return (
    <StoreProvider>
      <ThemeProvider theme={theme}>
        <PayPalScriptProvider deferLoading={true}>
          <Component {...pageProps} />
        </PayPalScriptProvider>
      </ThemeProvider>
    </StoreProvider>
  );
}

export default MyApp;
