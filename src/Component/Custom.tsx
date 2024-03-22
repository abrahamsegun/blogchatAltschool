import { createTheme } from '@mui/material/styles';

 const Theme = createTheme({
    breakpoints: {
      values: {
        // Define your custom breakpoints here
        // Example:
        xs:320,
        sm:768,
        md: 960,
        lg:1200,
        xl:1600,
      },
    },
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        'Arial',
        'sans-serif',
        '"DM Sans"', // Add dm font
      ].join(','),
    },
  });


  export default Theme;