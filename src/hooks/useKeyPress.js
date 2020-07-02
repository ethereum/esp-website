import { useEffect } from "react"

export const useKeyPress = (targetKey, handler) => {
  function downHandler({ key }) {
    if (key === targetKey) {
      handler()
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", downHandler)
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler)
    }
  }, []) // Empty array ensures that effect is only run on mount and unmount
}
