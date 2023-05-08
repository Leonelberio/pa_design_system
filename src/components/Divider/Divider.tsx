import React from 'react'
// @ts-ignore
import DividerStyles from './Divider.module.css'

interface Props {
  children?: React.ReactNode
  className?: string
  light?: boolean
  orientation?: 'left' | 'right' | 'center'
  style?: React.CSSProperties
  type?: 'vertical' | 'horizontal'
}

export default function Divider({
  children,
  className,
  light = false,
  orientation = 'center',
  style,
  type = 'horizontal',
}: Props) {
  let classes = [
    type === 'horizontal'
      ? DividerStyles['paf-divider']
      : DividerStyles['paf-divider-vertical'],
  ]
  if (light) classes.push(DividerStyles['paf-divider--light'])

  if (children) {
    classes.push(DividerStyles[`paf-divider--${orientation}`])
  } else if (!children && type === 'horizontal') {
    classes.push(DividerStyles[`paf-divider--no-text`])
  }

  if (className) classes.push(className)

  return (
    <div className={classes.join(' ')} role="seperator" style={style}>
      {children && (
        <span className={DividerStyles['paf-divider__content']}>
          {children}
        </span>
      )}
    </div>
  )
}
