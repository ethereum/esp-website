import React from "react"
import { motion, AnimatePresence } from "framer-motion"

const AccordianSection = ({
  i,
  expanded,
  setExpanded,
  headerText,
  children,
}) => {
  const isOpen = i === expanded

  // By using `AnimatePresence` to mount and unmount the contents, we can animate
  // them in and out while also only rendering the contents of open accordions
  return (
    <>
      <motion.header
        initial={false}
        animate={{ backgroundColor: isOpen ? "#FF0088" : "#0055FF" }}
        onClick={() => setExpanded(isOpen ? false : i)}
      >
        {headerText}
      </motion.header>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <motion.div
              variants={{ collapsed: { scale: 0.8 }, open: { scale: 1 } }}
              transition={{ duration: 0.8 }}
              className="content-placeholder"
            >
              {children}
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  )
}

export default AccordianSection
