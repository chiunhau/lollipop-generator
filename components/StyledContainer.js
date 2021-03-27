import React from 'react'
import { useStyletron } from 'baseui'

const StyledContainer = ({ children }) => {
  const [css, theme] = useStyletron()

  return (
    <div
      className={css({
        margin: '0 auto',
        padding: '16px',
      })}
    >
      {children}
    </div>
  )
}

export default StyledContainer
