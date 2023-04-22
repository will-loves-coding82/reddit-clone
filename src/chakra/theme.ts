import { extendTheme } from '@chakra-ui/react';
import "@fontsource/open-sans/300.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/700.css";

export const theme = extendTheme({
    colors: {

      brand: {
        // hex color for reddit logo, accessible by brand.100
        100: "#FF3c00",
      },
    },
    fonts: {
        body: "Open Sans, sans-serif",
    },
    // we define a global styling to the body 
    styles: {
        global: () => ({
            body: {
                // chakra library's gray color theme
                bg:"gray.200",
            },
        }),
    },
    components: {
        // Button 
    }
  })