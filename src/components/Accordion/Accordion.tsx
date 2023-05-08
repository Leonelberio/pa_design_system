import React, { createContext, useCallback, useContext, useEffect } from 'react'
import { Disclosure, Transition } from '@headlessui/react'
// @ts-ignore
import AccordionStyles from './Accordion.module.css'
import { IconChevronUp } from '../Icon/icons/IconChevronUp'
import Typography from '../Typography'

type ContextValue = Required<
  Pick<AccordionProps, 'defaultActiveId' | 'icon' | 'iconPosition'>
> &
  Pick<AccordionProps, 'onChange'>

const AccordionContext = createContext<ContextValue>({
  defaultActiveId: [],
  icon: <IconChevronUp strokeWidth={2} />,
  iconPosition: 'right',
  onChange: undefined,
})

interface AccordionProps {
  children?: React.ReactNode
  className?: string
  defaultActiveId?: (string | number)[]
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  bordered?: boolean
  onChange?: (item: {
    label: string
    id?: string | number
    open: boolean
  }) => void
}

function Accordion({
  children,
  className,
  defaultActiveId = [],
  icon = <IconChevronUp strokeWidth={2} />,
  iconPosition = 'right',
  bordered,
  onChange,
}: AccordionProps) {
  let containerClasses = [AccordionStyles['paf-accordion-container']]
  if (bordered) {
    containerClasses.push(AccordionStyles['paf-accordion-container--bordered'])
  }
  if (className) {
    containerClasses.push(className)
  }

  const contextValue = {
    defaultActiveId,
    icon,
    iconPosition,
    onChange,
  }

  return (
    <AccordionContext.Provider value={contextValue}>
      <div className={containerClasses.join(' ')}>{children}</div>
    </AccordionContext.Provider>
  )
}

interface ItemProps {
  children?: React.ReactNode
  className?: string
  label: string
  id?: string | number
}

export function Item({ children, className, label, id }: ItemProps) {
  const { defaultActiveId, icon, iconPosition, onChange } =
    useContext(AccordionContext)

  let panelClasses = [AccordionStyles['paf-accordion-item__panel']]

  let buttonClasses = [AccordionStyles['paf-accordion-item__button']]
  if (className) {
    buttonClasses.push(className)
  }

  const isDefaultActive = id ? defaultActiveId?.includes(id) : false

  const handleOnChange = useCallback(
    (open: boolean) => () => {
      if (onChange) {
        onChange({ id, label, open })
      }
    },
    [onChange, id, label]
  )

  return (
    <Disclosure defaultOpen={isDefaultActive}>
      {({ open }) => (
        <>
          <Disclosure.Button
            className={
              open
                ? `${buttonClasses.join(' ')} paf-accordion-item__button--open`
                : buttonClasses.join(' ')
            }
          >
            {iconPosition === 'left' && icon}
            <Typography.Text>{label}</Typography.Text>
            {iconPosition === 'right' && icon}
          </Disclosure.Button>
          <Transition
            show={open}
            enter={AccordionStyles[`paf-accordion-item__panel--enter`]}
            enterFrom={AccordionStyles[`paf-accordion-item__panel--enterFrom`]}
            enterTo={AccordionStyles[`paf-accordion-item__panel--enterTo`]}
            leave={AccordionStyles[`paf-accordion-item__panel--leave`]}
            leaveFrom={AccordionStyles[`paf-accordion-item__panel--leaveFrom`]}
            leaveTo={AccordionStyles[`paf-accordion-item__panel--leaveTo`]}
            afterEnter={handleOnChange(open)}
            afterLeave={handleOnChange(open)}
          >
            <Disclosure.Panel className={panelClasses.join(' ')} static>
              {children}
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  )
}

Accordion.Item = Item
export default Accordion
