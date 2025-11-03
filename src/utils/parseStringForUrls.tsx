import { Link } from "@chakra-ui/react";

const parseStringForUrls = (text: string) => {
  // URL regex pattern that matches http/https URLs
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  
  const parts = text.split(urlRegex);
  
  return parts.map((part, index) => {
    if (urlRegex.test(part)) {
      return (
        <Link
          key={index}
          href={part}
          color="brand.orange.100"
          textDecoration="underline"
          _hover={{ color: "brand.orange.200" }}
          isExternal
        >
          {part}
        </Link>
      );
    }
    return part;
  });
};

export default parseStringForUrls;