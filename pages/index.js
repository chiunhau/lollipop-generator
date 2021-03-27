import React, {
  useEffect,
  useState,
  useRef,
  forwardRef,
} from 'react'
import dynamic from 'next/dynamic'
import { useStyletron } from 'baseui'
import {
  Button,
  SIZE as buttonSize,
  KIND as buttonKind,
} from 'baseui/button'
import { Grid, Cell } from 'baseui/layout-grid'

import useLocalStorage from '../hooks/useLocalStorage'

import NumberInput from '../components/inputs/NumberInput'
import SliderInput from '../components/inputs/SliderInput'
import ColorPalettes from '../components/ColorPalettes'
import Input from '../components/inputs/Input'

import StyledContainer from '../components/StyledContainer'
import colorsSource from '../components/colors'

const initialSketchState = {
  size: 200,
  speed: 50,
  canvasWidth: 500,
  canvasHeight: 500,
  activeCode: colorsSource[0].code,
}

const P5Wrapper = dynamic(
  () => import('../components/P5Wrapper'),
  {
    ssr: false,
  },
)

const ForwardedP5Wrapper = forwardRef((props, ref) => (
  <P5Wrapper {...props} forwardedRef={ref} />
))

const Index = ({}) => {
  const [css, theme] = useStyletron()
  const [
    lsSketchState,
    setLsSketchState,
    removeLsSketchState,
  ] = useLocalStorage('sketchState', initialSketchState)

  const [sketchState, setSketchState] = useState(
    lsSketchState || initialSketchState,
  )

  const p5WrapperRef = useRef()

  const handlePreserveParams = () => {
    console.log(sketchState)
    setLsSketchState(sketchState)
  }

  const handleResetAll = () => {
    removeLsSketchState()
    callRemoveCanvas()
    setSketchState(initialSketchState)
  }

  const callSetup = () => {
    p5WrapperRef.current.call('setup')
  }

  const callSaveCanvas = () => {
    p5WrapperRef.current.call('saveCanvas')
  }

  const callRemoveCanvas = () => {
    p5WrapperRef.current.forceRerender()
  }

  return (
    <div
      className={css({
        backgroundColor: theme.colors.backgroundPrimary,
        minHeight: '100vh',
      })}
    >
      <StyledContainer>
        {lsSketchState && sketchState && (
          <Grid>
            <Cell span={[1, 2, 2]}>
              <Input
                name="Canvas Width"
                value={sketchState.canvasWidth}
                setValue={newValue =>
                  setSketchState({
                    ...sketchState,
                    canvasWidth: newValue,
                  })
                }
                type="number"
                endEnhancer="px"
              />
              <Input
                name="Canvas Height"
                value={sketchState.canvasHeight}
                setValue={newValue =>
                  setSketchState({
                    ...sketchState,
                    canvasHeight: newValue,
                  })
                }
                type="number"
                endEnhancer="px"
              />
              <NumberInput
                name="Size"
                value={sketchState.size}
                setValue={newValue =>
                  setSketchState({
                    ...sketchState,
                    size: newValue,
                  })
                }
              />
              <SliderInput
                name="Speed"
                value={[sketchState.speed]}
                setValue={newValue =>
                  setSketchState({
                    ...sketchState,
                    speed: newValue[0],
                  })
                }
              />
              <Button
                $style={() => ({
                  display: 'block',
                  width: '100%',
                  marginBottom: '8px',
                })}
                kind={buttonKind.primary}
                onClick={callRemoveCanvas}
              >
                Run
              </Button>
              <Button
                $style={() => ({
                  display: 'block',
                  width: '100%',
                  marginBottom: '8px',
                })}
                kind={buttonKind.secondary}
                onClick={callSaveCanvas}
              >
                Save this frame
              </Button>
              <Button
                $style={() => ({
                  display: 'block',
                  width: '100%',
                })}
                kind={buttonKind.secondary}
                onClick={handlePreserveParams}
              >
                Preserve params
              </Button>
              <Button
                onClick={handleResetAll}
                kind={buttonKind.minimal}
              >
                Reset all
              </Button>
            </Cell>
            <Cell span={[1, 2, 2]}>
              <ColorPalettes
                value={sketchState.activeCode}
                setValue={newValue =>
                  setSketchState({
                    ...sketchState,
                    activeCode: newValue,
                    // swatch: getParsedColors(newValue),
                  })
                }
              />
            </Cell>
            <Cell span={[3, 6, 8]}>
              <ForwardedP5Wrapper
                sketchState={sketchState}
                ref={p5WrapperRef}
              />
            </Cell>
          </Grid>
        )}
      </StyledContainer>
    </div>
  )
}

export default Index
