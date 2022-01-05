import { extendTheme, theme as base } from '@chakra-ui/react';

export default extendTheme({
  colors: {
    brand: {
      accent: '#f85858',
      hover: '#fb7971',
      heading: '#e44550',
      paragraph: '#232264',
      orange: {
        100: '#f76f45',
        200: '#f87045'
      },
      ready: '#30354b',
      border: '#a9a9b8',
      divider: '#e5e5e5',
      footer: {
        bgGradient: {
          start: '#e07861',
          end: '#e06361'
        }
      }
    }
  },
  fonts: {
    // set base fonts as fallback
    heading: `Libre Franklin, ${base.fonts?.heading}`,
    body: `Libre Franklin, ${base.fonts?.body}`
  },
  fontSizes: {
    h1: '40px',
    h2: '24px',
    h4: '18px',
    faq: {
      question: '16px'
    },
    paragraph: '15px'
  },
  sizes: {
    container: {
      mobile: '450px'
    }
  },
  components: {
    Heading: {
      variants: {
        'page-section': {
          fontFamily: `Maison Neue Mono, ${base.fonts?.heading}`
        }
      }
    },
    Text: {
      variants: {
        ready: {
          fontFamily: `Maison Neue Mono, ${base.fonts?.body}`
        }
      }
    }
  }
});
