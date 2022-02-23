import { useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

export const useShadowAnimation = () => {
  const [buttonHovered, setButtonHovered] = useState(false);
  const shadowBoxControl = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      if (buttonHovered) {
        shadowBoxControl.start({ x: 1.5, y: 1.5 });
      } else {
        shadowBoxControl.start({ x: 0, y: 0 });
      }
    };

    sequence();
  }, [buttonHovered, shadowBoxControl]);

  return { shadowBoxControl, setButtonHovered };
};
