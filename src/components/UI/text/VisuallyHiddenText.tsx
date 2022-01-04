import { VisuallyHidden } from '@chakra-ui/react';
import { FC } from 'react';

interface Props {
  readMore: boolean;
}

// the purpose of this component is to be able to render conditionally some text
// and make it visually hidden for sighted users but still accesible for screen readers
// (https://levelup.gitconnected.com/a11y-visually-hidden-elements-aea4ee784142)
export const VisuallyHiddenText: FC<Props> = ({ children, readMore }) => {
  if (!readMore) {
    return <VisuallyHidden>{children}</VisuallyHidden>;
  }

  return <span>{children}</span>;
};
