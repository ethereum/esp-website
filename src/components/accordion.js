import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { faMinus } from "@fortawesome/free-solid-svg-icons"

const AccordionSection = ({
  i,
  expanded,
  setExpanded,
  headerText,
  children,
}) => {
  const isOpen = i === expanded
  const icon = isOpen ? faMinus : faPlus

  // By using `AnimatePresence` to mount and unmount the contents, we can animate
  // them in and out while also only rendering the contents of open accordions
  return (
    <div className="accordion-section">
      <motion.header
        className="accordion-header"
        initial={false}
        onClick={() => setExpanded(isOpen ? false : i)}
      >
        <span>
          <FontAwesomeIcon className="accordion-icon" icon={icon} />
        </span>
        <span>{headerText}</span>
      </motion.header>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            className="accordion-section"
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
              className="accordion-content"
            >
              {children}
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AccordionSection
