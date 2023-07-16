import { Link, type TextProps } from '@chakra-ui/react';
import { PageText } from '..';

export const PrivacyPolicyAgreement: React.FC<TextProps> = props => (
  <PageText {...props}>
    Please note that by submitting this application, you confirm that you have read and agree to our{' '}
    <Link
      href='https://ethereum.org/en/privacy-policy/'
      isExternal
      fontWeight={700}
      color='brand.orange.100'
      _hover={{ textDecoration: 'none' }}
    >
      Privacy Policy
    </Link>.
  </PageText>
);
