export const getWebsite = (website: string) => (
  website 
    ? website.includes('https://') || website.includes('http://')
      ? website
      : `https://${website}` 
    : ''
);
