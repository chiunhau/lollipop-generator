import React from 'react'
import {
  Button,
  SIZE as buttonSize,
  KIND,
  SHAPE,
} from 'baseui/button'
import { FormControl } from 'baseui/form-control'
import { Input, SIZE as inputSize } from 'baseui/input'

const NumberInput = ({ name, value, setValue }) => {
  return (
    <FormControl label={name}>
      <Input
        size={inputSize.compact}
        value={value}
        type="number"
        onChange={e => setValue(parseInt(e.target.value))}
        startEnhancer={() => (
          <Button
            shape={SHAPE.square}
            kind={KIND.secondary}
            size={buttonSize.compact}
            onClick={() => setValue(value - 1)}
          >
            -
          </Button>
        )}
        endEnhancer={() => (
          <Button
            shape={SHAPE.square}
            kind={KIND.secondary}
            size={buttonSize.compact}
            onClick={() => setValue(value + 1)}
          >
            +
          </Button>
        )}
        overrides={{
          Root: {
            style: {
              paddingLeft: 0,
              paddingRight: 0,
            },
          },
          Input: {
            style: {
              textAlign: 'center',
            },
          },
          StartEnhancer: {
            style: {
              paddingLeft: 0,
              paddingRight: 0,
            },
          },
          EndEnhancer: {
            style: {
              paddingLeft: 0,
              paddingRight: 0,
            },
          },
        }}
      />
    </FormControl>
  )
}

export default NumberInput
