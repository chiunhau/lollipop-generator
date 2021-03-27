import React from 'react'
import { FormControl } from 'baseui/form-control'
import {
  Checkbox,
  LABEL_PLACEMENT,
  STYLE_TYPE,
} from 'baseui/checkbox'

const CheckboxInput = ({
  name,
  value,
  setValue,
  children,
}) => {
  return (
    <FormControl label={name}>
      <Checkbox
        checked={value}
        checkmarkType={STYLE_TYPE.toggle_round}
        onChange={e => setValue(e.target.checked)}
      >
        {children}
      </Checkbox>
    </FormControl>
  )
}

export default CheckboxInput
