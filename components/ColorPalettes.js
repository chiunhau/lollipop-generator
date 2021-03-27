import React, { useEffect, useState } from 'react'
import { useStyletron } from 'baseui'
import { RadioGroup, Radio, ALIGN } from 'baseui/radio'
import { FormControl } from 'baseui/form-control'
import colorsSource from './colors'
import { getParsedColors } from './utils'

const Swatch = ({ code, id }) => {
  const [css] = useStyletron()

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
      })}
    >
      {getParsedColors(code).map(color => (
        <div
          key={`${id}-${color}`}
          className={css({
            width: '20px',
            height: '20px',
            backgroundColor: color,
          })}
        ></div>
      ))}
    </div>
  )
}

const ColorPalettes = ({ value, setValue, ...props }) => {
  console.log(value)
  const [colors, setColors] = useState(colorsSource)

  return (
    <FormControl label="Color Palettes">
      <RadioGroup
        autoFocus={false}
        value={value}
        name="colors"
        align={ALIGN.vertical}
        onChange={e => setValue(e.target.value)}
        overrides={{
          RadioGroupRoot: {
            style: ({ $theme }) => ({
              maxHeight: '100vh',
              overflowY: 'scroll',
              flexWrap: 'nowrap',
            }),
          },
        }}
      >
        {colors.map(color => (
          <Radio key={color.id} value={color.code}>
            <Swatch code={color.code} />
          </Radio>
        ))}
      </RadioGroup>
    </FormControl>
  )
}

export default ColorPalettes
