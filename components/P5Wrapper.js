import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react'
import P5 from 'p5'
import sketch from './sketch2'

import useForceUpdate from '../hooks/useForceUpdate'

const P5Wrapper = ({ sketchState, forwardedRef }) => {
  const stateRef = useRef()
  const p5InstanceRef = useRef(null)
  const forceUpdate = useForceUpdate()

  const getProps = () => {
    return stateRef.current
  }

  useImperativeHandle(forwardedRef, () => ({
    getInstance: () => {
      return p5InstanceRef.current
    },
    call: func => {
      p5InstanceRef.current[func]()
    },
    forceRerender: () => {
      console.log('force rerender')
      // p5InstanceRef.current.removeCanvas()
      clear()
      init()
    },
  }))

  const init = () => {
    p5InstanceRef.current = new P5(p => sketch(p, getProps))
  }

  const clear = () => {
    p5InstanceRef.current.removeCanvas()
  }

  useEffect(() => {
    stateRef.current = {
      ...sketchState,
    }
  }, [sketchState])

  useEffect(() => {
    init()

    return () => clear()
  }, [])

  return <div id="p5Wrapper" />
}

export default P5Wrapper
