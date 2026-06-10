import { ReactElement } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { render, type RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import theme from '../../theme';

// Renders a component inside the project's ChakraProvider so theme tokens (brand.*) resolve the
// same way they do in the app.
export const renderWithChakra = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) => {
  return render(ui, {
    wrapper: ({ children }) => <ChakraProvider theme={theme}>{children}</ChakraProvider>,
    ...options
  });
};

// Renders the form, THEN creates the userEvent instance. Order matters: `userEvent.setup()`
// redefines `HTMLElement.prototype.focus` as a getter-only accessor, which would later break
// Chakra's one-time @zag-js/focus-visible setup (it runs on the first Radio/Checkbox mount and
// reassigns `focus`). Rendering first lets that setup run while `focus` is still writable.
export const renderForm = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) => {
  const result = renderWithChakra(ui, options);
  const user = userEvent.setup();
  return { user, ...result };
};
