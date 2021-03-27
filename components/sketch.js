const sketch = (p, getProps) => {
  p.setup = () => {
    const canvas = p.createCanvas(
      getProps().canvasWidth,
      getProps().canvasHeight,
    )
    canvas.parent('p5Wrapper')
    p.background(0)
  }

  p.draw = () => {
    p.background(0)
    p.fill('red')
    p.ellipse(250, 250, getProps().size, getProps().size)
  }
}

export default sketch
