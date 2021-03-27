import { getParsedColors } from './utils'

const QUARTER_PI = Math.PI / 8

const sketch = (p, getProps) => {
  const randomColorIndex = Math.floor(Math.random() * 80) // 0 ~ 79
  const randomRotateMagicNumber = getProps().speed
  // Math.floor(Math.random() * 400) + 50 // 30 ~ 229
  const randomSizeMagicNumber =
    Math.floor(Math.random() * 1) + 200 // 100 ~ 299
  const perfectFrameCounts =
    Math.PI * 2 * randomSizeMagicNumber
  const rotationOffsets = [0, 0, 0, 0].map(
    i => Math.random() + 1,
  )
  p.setup = () => {
    console.log('hello')
    const canvas = p.createCanvas(800, 800)
    canvas.parent('p5Wrapper')
    p.rectMode(p.CENTER)
    p.noFill()
    p.background(0)
  }

  p.draw = () => {
    p.translate(p.width / 2, p.height / 2)
    render(
      getParsedColors(getProps().activeCode),
      getProps().rotationSpeed,
      getProps().sizeGrowSpeed,
      rotationOffsets,
      p.frameCount,
    )
  }

  function render(c, m, s, rotationOffsets, t) {
    const size =
      Math.sin((t * s) / 500 - Math.PI / 2) *
        getProps().size +
      getProps().size

    p.push()
    if (getProps().useSin) {
      p.rotate(Math.sin((t * m) / 100))
    } else {
      p.rotate((t * m) / 200)
    }
    p.stroke(p.color(c[1]))
    p.rect(0, 0, size * 1, size * 1)
    p.pop()

    p.push()
    p.rotate(QUARTER_PI * 1)
    if (getProps().useSin) {
      p.rotate(Math.sin((t * m) / 100))
    } else {
      p.rotate((t * m) / 200)
    }

    p.stroke(p.color(c[2]))
    p.rect(0, 0, size * 1, size * 1)
    p.pop()

    p.push()
    p.rotate(QUARTER_PI * 2)
    if (getProps().useSin) {
      p.rotate(Math.sin((t * m) / 100))
    } else {
      p.rotate((t * m) / 200)
    }
    p.stroke(p.color(c[3]))
    p.rect(0, 0, size * 1, size * 1)
    p.pop()

    p.push()
    p.rotate(QUARTER_PI * 3)
    if (getProps().useSin) {
      p.rotate(Math.sin((t * m) / 100))
    } else {
      p.rotate((t * m) / 200)
    }
    p.stroke(p.color(c[0]))
    p.rect(0, 0, size * 1, size * 1)
    p.pop()
  }

  p.removeCanvas = () => {
    p.remove()
  }

  p.saveCanvas = () => {
    console.log('save!')
    p.save(`${new Date().getTime()}.png`)
  }
}

export default sketch
