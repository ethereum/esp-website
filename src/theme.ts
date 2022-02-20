import { extendTheme, theme as base } from '@chakra-ui/react';

export default extendTheme({
  breakpoints: {
    xs: '320px',
    sm: '360px',
    md: '768px',
    lg: '1015px',
    xl: '1200px'
  },
  colors: {
    brand: {
      accent: '#f85858',
      button: {
        shadow: '#e34550'
      },
      hover: '#fb7971',
      heading: '#e44550',
      paragraph: '#232264',
      orange: {
        100: '#ff4d15',
        200: '#f87045'
      },
      ready: {
        text: '#30354b',
        bgGradient: {
          start: '#fff8ec',
          end: '#fee8dc'
        }
      },
      border: '#a9a9b8',
      divider: {
        100: '#e5e5e5',
        200: '#a1a0ba'
      },
      granteesListDivider: '#ddd',
      footer: {
        bgGradient: {
          start: '#e07861',
          end: '#e06361'
        }
      },
      newsletter: {
        bgGradient: {
          start: '#fff8ec',
          end: '#fee8dc'
        }
      },
      faq: {
        bgGradient: {
          start: '#ffe5e2',
          end: '#f3d1ee'
        }
      },
      applicants: {
        bgGradient: {
          start: '#ffe9e0',
          end: '#edcdf9'
        },
        rgba: 'rgba(237, 205, 249, 0)'
      },
      about: {
        bgGradient: {
          start: '#e8edff',
          end: '#ffd1e7'
        },
        rgba: 'rgba(255, 209, 231, 0)'
      },
      sidebar: {
        bgGradient: {
          start: '#fff3eb',
          end: 'rgba(255, 243, 235, 0)'
        }
      },
      option: '#ffefec',
      upload: {
        bg: 'rgba(189, 189, 189, 0.2)',
        filename: 'rgba(35, 34, 100, .1)'
      },
      helpText: '#7c7ba1',
      warning: '#f0f6fd',
      homepageHero: '#f8e8fc',
      homepageWhiteBox: 'rgba(255, 255, 255, 0.6)',
      stats: {
        bgGradient: {
          start: 'rgba(255, 229, 226, 0.3)',
          end: 'rgba(243, 209, 238, 0.3)'
        }
      },
      whoWeSupport: {
        bgGradient: {
          start: '#f0f6fd',
          end: '#ecf2fe'
        }
      },
      howWeSupport: {
        bgGradient: {
          start: '#ffe5e2',
          end: '#f3d1ee'
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
    homepage: '30px',
    allocations: '36px',
    h1: '40px',
    h2: '24px',
    h4: '18px',
    faq: {
      question: '16px'
    },
    paragraph: '15px',
    input: '14px',
    stats: '20px',
    helpText: '13px'
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
    MenuButton: {
      variants: {
        transparent: {
          background: 'none'
        }
      }
    },
    Radio: {
      baseStyle: {
        control: {
          bg: 'white',
          border: 0,
          boxShadow: '0 0 0 1px #a9a9b8',
          _checked: {
            color: 'brand.orange.100',
            bg: 'white'
          }
        }
      }
    },
    Checkbox: {
      baseStyle: {
        control: {
          bg: 'white',
          border: '1px solid #c8c8c8',
          _checked: {
            color: 'brand.orange.100',
            bg: 'white',
            border: '1px solid #c8c8c8'
          }
        }
      }
    }
  },
  shadows: {
    select: '0px 3px 5px rgba(0, 0, 0, 0.25)'
  }
});
