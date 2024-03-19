import { Link, LinkProps } from '@chakra-ui/react';

export const MdLink = (props: LinkProps) => {
  return <Link fontWeight={700} color='brand.orange.100' isExternal {...props} />;
};
