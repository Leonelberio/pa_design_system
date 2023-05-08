import React from 'react'
// @ts-ignore
import SpaceStyles from './Space.module.css'

function Space({
  direction,
  size = 2,
  className,
  block,
  style,
  minus,
  children,
}: any) {
  const classes = []
  classes.push(direction === 'vertical' ? 'paf-space-col' : 'paf-space-row')
  classes.push(
    SpaceStyles[
      'paf-' +
        (minus ? 'minus-' : '') +
        'space-' +
        (direction === 'vertical' ? 'y' : 'x') +
        '-' +
        size
    ]
  )
  if (block) {
    classes.push(SpaceStyles['paf-space--block'])
  }
  if (className) {
    classes.push(className)
  }

  return (
    <div className={classes.join(' ')} style={style}>
      {children}
    </div>
  )
}

export default Space
