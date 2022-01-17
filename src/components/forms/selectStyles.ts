import { ChakraStylesConfig } from 'chakra-react-select';

export const chakraStyles: ChakraStylesConfig = {
  container: provided => ({
    ...provided,
    background: 'white',
    borderColor: 'brand.border',
    color: 'brand.paragraph'
  }),
  control: provided => ({
    ...provided,
    borderRadius: 0,
    h: '56px',
    fontSize: 'input'
  }),
  dropdownIndicator: provided => ({
    ...provided,
    backgroundColor: 'transparent',
    color: 'brand.divider.200'
  }),
  indicatorSeparator: provided => ({
    ...provided,
    borderColor: 'brand.divider.200',
    w: '2px',
    h: '34px',
    pr: 1
  }),
  menu: provided => ({
    ...provided,
    borderRadius: 0,
    mt: '1px',
    boxShadow: 'select'
  }),
  menuList: provided => ({
    ...provided,
    borderRadius: 0,
    py: 0
  }),
  option: (provided, state) => ({
    ...provided,
    background: state.isFocused ? 'brand.option' : provided.background,
    color: 'brand.paragraph',
    fontSize: 'input',
    pl: '17px',
    h: '50px'
  })
};
