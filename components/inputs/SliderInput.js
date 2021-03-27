import React from 'react'
import { Slider } from 'baseui/slider'
import { FormControl } from 'baseui/form-control'

const SilderInput = ({ value, setValue, name }) => {
  return (
    <FormControl label={name}>
      <Slider
        value={value}
        onChange={({ value }) => value && setValue(value)}
        onFinalChange={({ value }) => console.log(value)}
        overrides={{
          Track: {
            style: ({ $theme }) => ({
              paddingLeft: 0,
              paddingRight: 0,
            }),
          },
          TickBar: {
            style: ({ $theme }) => ({
              paddingLeft: 0,
              paddingRight: 0,
            }),
          },
        }}
      />
    </FormControl>
  )
}

export default SilderInput
