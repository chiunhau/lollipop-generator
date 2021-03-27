import React from 'react'
import { Input as BaseInput } from 'baseui/input'
import { FormControl } from 'baseui/form-control'

const Input = ({ name, value, setValue, ...props }) => {
  return (
    <FormControl label={name}>
      <BaseInput
        value={value}
        onChange={e => setValue(e.target.value)}
        {...props}
      />
    </FormControl>
  )
}

export default Input
