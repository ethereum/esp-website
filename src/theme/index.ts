import { extendTheme } from '@chakra-ui/react';

import { breakpoints, colors, fonts, fontSizes, shadows, sizes } from './foundations';
import { Checkbox, Heading, MenuButton, Radio } from './components';

const overrides = {
  breakpoints,
  colors,
  fonts,
  fontSizes,
  shadows,
  sizes,
  components: {
    Checkbox,
    Heading,
    MenuButton,
    Radio
  }
};

export default extendTheme(overrides);
