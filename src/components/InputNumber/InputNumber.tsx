import React from 'react'
import { FormLayout } from '../../lib/Layout/FormLayout'
import InputErrorIcon from '../../lib/Layout/InputErrorIcon'
import { IconChevronDown } from '../Icon/icons/IconChevronDown'
import { IconChevronUp } from '../Icon/icons/IconChevronUp'
import InputIconContainer from '../../lib/Layout/InputIconContainer'
import { Space } from '../../index'
// @ts-ignore
import InputNumberStyles from './InputNumber.module.css'

export interface Props {
  autoComplete?: string
  autofocus?: boolean
  className?: string
  defaultValue?: string | number
  descriptionText?: string
  disabled?: boolean
  error?: string
  icon?: any
  id?: string
  inputRef?: React.RefObject<HTMLInputElement>
  label?: string
  afterLabel?: string
  beforeLabel?: string
  labelOptional?: string
  layout?: 'horizontal' | 'vertical'
  name?: string
  onChange?(x: React.ChangeEvent<HTMLInputElement>): void
  onFocus?(x: React.FocusEvent<HTMLInputElement>): void
  onBlur?(x: React.FocusEvent<HTMLInputElement>): void
  onKeyDown?(x: React.KeyboardEvent<HTMLInputElement>): void
  placeholder?: string
  style?: React.CSSProperties
  value?: any
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'xlarge'
  min?: number
  max?: number
  borderless?: boolean
}

function InputNumber({
  autoComplete,
  autofocus,
  className,
  defaultValue,
  descriptionText,
  disabled,
  error,
  icon,
  id,
  inputRef,
  label,
  afterLabel,
  beforeLabel,
  labelOptional,
  layout,
  name,
  onChange,
  onBlur,
  onFocus,
  onKeyDown,
  placeholder,
  value,
  style,
  size = 'medium',
  min,
  max,
  borderless = false,
}: Props) {
  const inputClasses = [InputNumberStyles['paf-inputnumber']]

  const iconUpClasses = [
    InputNumberStyles['paf-inputnumber-button'],
    InputNumberStyles['paf-inputnumber-button-up'],
  ]

  const inputRefCurrent = inputRef
    ? inputRef
    : React.createRef<HTMLInputElement>()

  const iconDownClasses = [
    InputNumberStyles['paf-inputnumber-button'],
    InputNumberStyles['paf-inputnumber-button-down'],
  ]

  const iconNavClasses = [InputNumberStyles['paf-inputnumber-nav']]

  if (error) inputClasses.push(InputNumberStyles['paf-inputnumber--error'])

  if (icon) inputClasses.push(InputNumberStyles['paf-inputnumber--with-icon'])

  if (size) {
    inputClasses.push(InputNumberStyles[`paf-inputnumber--${size}`])
    iconNavClasses.push(InputNumberStyles[`paf-inputnumber-nav--${size}`])
  }

  if (borderless)
    inputClasses.push(InputNumberStyles['paf-inputnumber--borderless'])

  const onClickChevronUp = () => {
    inputRefCurrent.current?.stepUp()
    if (onChange) {
      inputRefCurrent.current?.dispatchEvent(
        new InputEvent('change', {
          view: window,
          bubbles: true,
          cancelable: false,
        })
      )
    }
  }

  const onClickChevronDown = () => {
    inputRefCurrent.current?.stepDown()
    if (onChange) {
      inputRefCurrent.current?.dispatchEvent(
        new InputEvent('change', {
          view: window,
          bubbles: true,
          cancelable: false,
        })
      )
    }
  }

  return (
    <div className={className}>
      <FormLayout
        label={label}
        afterLabel={afterLabel}
        beforeLabel={beforeLabel}
        labelOptional={labelOptional}
        layout={layout}
        id={id}
        error={error}
        descriptionText={descriptionText}
        style={style}
        size={size}
      >
        <div className={InputNumberStyles['paf-inputnumber-container']}>
          <input
            autoComplete={autoComplete}
            autoFocus={autofocus}
            defaultValue={defaultValue}
            disabled={disabled}
            id={id}
            name={name}
            onChange={onChange ? (event) => onChange(event) : undefined}
            onFocus={onFocus ? (event) => onFocus(event) : undefined}
            onBlur={onBlur ? (event) => onBlur(event) : undefined}
            onKeyDown={onKeyDown ? (event) => onKeyDown(event) : undefined}
            placeholder={placeholder}
            ref={inputRefCurrent}
            type={'number'}
            value={value}
            className={inputClasses.join(' ')}
            min={min}
            max={max}
          />
          <div className={iconNavClasses.join(' ')}>
            <IconChevronUp
              className={iconUpClasses.join(' ')}
              onClick={onClickChevronUp}
              onMouseDown={(e: React.MouseEvent) => {
                e.preventDefault()
              }}
            />
            <IconChevronDown
              className={iconDownClasses.join(' ')}
              onClick={onClickChevronDown}
              onMouseDown={(e: React.MouseEvent) => {
                e.preventDefault()
              }}
            />
          </div>
          {icon && <InputIconContainer icon={icon} />}
          {error ? (
            <Space
              className={
                InputNumberStyles['paf-inputnumber-actions-container']
              }
              size={1}
            >
              {error && <InputErrorIcon size={size} />}
            </Space>
          ) : null}
        </div>
      </FormLayout>
    </div>
  )
}

export default InputNumber
