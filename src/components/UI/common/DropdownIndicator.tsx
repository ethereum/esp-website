import { components, DropdownIndicatorProps } from 'chakra-react-select';

import { SelectArrowIcon } from '../icons';

export const DropdownIndicator = (props: DropdownIndicatorProps) => {
  return (
    <components.DropdownIndicator {...props}>
      <SelectArrowIcon h='15px' w='24px' mr={2} />
    </components.DropdownIndicator>
  );
};
