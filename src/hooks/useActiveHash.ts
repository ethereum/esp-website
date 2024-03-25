import { useEffect, useState } from 'react';

/**
 * A hook to determine which section of the page is currently in the viewport.
 * @param {*} itemIds Array of document ids to observe
 * @param {*} rootMargin
 * @returns id of the element currently in viewport
 */
export const useActiveHash = (itemIds: Array<string>, rootMargin = `0% 0% -80% 0%`) => {
  const [lastActiveHash, setLastActiveHash] = useState<string>(itemIds[0]);
  const [hashes, setHashes] = useState<Record<string, boolean>>(() =>
    itemIds.reduce((acc, id, index) => ({ [id]: index === 0, ...acc }), {})
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const hash = `#${entry.target.id}`;
          setHashes(hashes => ({ ...hashes, [hash]: entry.isIntersecting }));
        });
      },
      { rootMargin }
    );

    itemIds?.forEach(id => {
      // Remove # from id. EX: #element-id -> element-id
      const element = document.getElementById(id.replace('#', ''));
      if (element !== null) {
        observer.observe(element);
      }
    });

    return () => {
      itemIds?.forEach(id => {
        const element = document.getElementById(id);
        if (element !== null) {
          observer.unobserve(element);
        }
      });
    };
  }, [itemIds, rootMargin]);

  useEffect(() => {
    const firstActiveHash = itemIds.find(id => hashes[id]);

    if (firstActiveHash) {
      setLastActiveHash(firstActiveHash);
    }
  }, [hashes, itemIds]);

  return lastActiveHash;
};
