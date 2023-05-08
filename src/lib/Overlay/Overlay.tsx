import React, { useEffect, useRef, useState } from 'react'
//@ts-ignore
import { useOnClickOutside } from './../../lib/Hooks'
import { DropdownContext } from './OverlayContext'
import { AnimationTailwindClasses } from '../../types'
// @ts-ignore
import OverlayStyles from './Overlay.module.css'

import { Transition } from '@headlessui/react'

interface Props {
  visible?: boolean
  overlay?: React.ReactNode
  children?: React.ReactNode
  placement?:
    | 'bottomLeft'
    | 'bottomRight'
    | 'bottomCenter'
    | 'topLeft'
    | 'topRight'
    | 'topCenter'
  onVisibleChange?: any
  disabled?: boolean
  triggerElement?: any
  overlayStyle?: React.CSSProperties
  overlayClassName?: string
  transition?: AnimationTailwindClasses
}

function Overlay({
  visible,
  overlay,
  children,
  placement = 'topCenter',
  onVisibleChange,
  disabled,
  triggerElement,
  overlayStyle,
  overlayClassName,
  transition,
}: Props) {
  const ref = useRef(null)
  const [visibleState, setVisibleState] = useState(!!visible)

  let classes = [
    OverlayStyles['paf-overlay-container'],
    OverlayStyles[`paf-overlay-container--${placement}`],
  ]
  if (overlayClassName) classes.push(overlayClassName)

  function onToggle() {
    setVisibleState(!visibleState)
    if (onVisibleChange) onVisibleChange(visibleState)
  }

  // allow ovveride of Dropdown
  useEffect(() => {
    setVisibleState(!!visible)
  }, [visible])

  // detect clicks from outside
  useOnClickOutside(ref, () => {
    if (visibleState) {
      setVisibleState(!visibleState)
    }
  })

  const TriggerElement = () => {
    return <div onClick={onToggle}>{triggerElement}</div>
  }

  return (
    <div ref={ref} className={OverlayStyles['paf-overlay']}>
      {placement === 'bottomRight' ||
      placement === 'bottomLeft' ||
      placement === 'bottomCenter' ? (
        <TriggerElement />
      ) : null}
      <Transition
        show={visibleState}
        enter={OverlayStyles[`paf-overlay--enter`]}
        enterFrom={OverlayStyles[`paf-overlay--enterFrom`]}
        enterTo={OverlayStyles[`paf-overlay--enterTo`]}
        leave={OverlayStyles[`paf-overlay--leave`]}
        leaveFrom={OverlayStyles[`paf-overlay--leaveFrom`]}
        leaveTo={OverlayStyles[`paf-overlay--leaveTo`]}
      >
        <div className={classes.join(' ')} style={overlayStyle}>
          <DropdownContext.Provider value={{ onClick: onToggle }}>
            {children}
          </DropdownContext.Provider>
        </div>
      </Transition>
      {placement === 'topRight' ||
      placement === 'topLeft' ||
      placement === 'topCenter' ? (
        <TriggerElement />
      ) : null}
    </div>
  )
}

export default Overlay
