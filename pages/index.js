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
import CheckboxInput from '../components/inputs/CheckboxInput'
import ColorPalettes from '../components/ColorPalettes'
import Input from '../components/inputs/Input'

import StyledContainer from '../components/StyledContainer'
import colorsSource from '../components/colors'
import sketch from '../components/sketch'

const initialSketchState = {
  canvasWidth: 400,
  canvasHeight: 400,
  useSin: false,
  rotationSpeed: 2.5,
  sizeGrowSpeed: 2.5,
  size: 200,
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
                name="Circle size"
                type="number"
                value={sketchState.size}
                setValue={newValue =>
                  setSketchState({
                    ...sketchState,
                    size: newValue,
                  })
                }
              />
              <SliderInput
                name="Rotation speed"
                value={[sketchState.rotationSpeed]}
                min={0.1}
                max={5}
                step={0.1}
                setValue={newValue =>
                  setSketchState({
                    ...sketchState,
                    rotationSpeed: newValue[0],
                  })
                }
              />
              <CheckboxInput
                name="Rotate with Math.sin"
                value={sketchState.useSin}
                setValue={newValue =>
                  setSketchState({
                    ...sketchState,
                    useSin: newValue,
                  })
                }
              />
              <SliderInput
                name="Size grow speed"
                value={[sketchState.sizeGrowSpeed]}
                min={0.1}
                max={5}
                step={0.1}
                setValue={newValue =>
                  setSketchState({
                    ...sketchState,
                    sizeGrowSpeed: newValue[0],
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
                Capture
              </Button>
              <Button
                $style={() => ({
                  display: 'block',
                  width: '100%',
                })}
                kind={buttonKind.minimal}
                onClick={handlePreserveParams}
              >
                Save settings
              </Button>
              <Button
                $style={() => ({
                  display: 'block',
                  width: '100%',
                })}
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
