import React, { useEffect, useState } from 'react'
// @ts-ignore
import SlidePanelStyles from './SidePanel.module.css'
import { Button, IconX, Space, Typography } from '../../index'
import { AnimationTailwindClasses } from '../../types'

import * as Dialog from '@radix-ui/react-dialog'

import { Transition } from '@headlessui/react'

interface Props {
  className?: string
  children?: React.ReactNode
  title?: string
  description?: string
  visible: boolean
  wide?: boolean
  loading?: boolean
  align?: 'right' | 'left'
  alignFooter?: 'right' | 'left'
  hideFooter?: boolean
  customFooter?: React.ReactNode
  onCancel?: any
  cancelText?: string
  onConfirm?: any
  confirmText?: string
  transition?: AnimationTailwindClasses
  transitionOverlay?: AnimationTailwindClasses
  triggerElement?: React.ReactNode
}

const SidePanel = ({
  className,
  children,
  title,
  description,
  visible,
  wide = false,
  loading,
  align = 'right',
  alignFooter = 'right',
  hideFooter = false,
  customFooter = undefined,
  onConfirm,
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  triggerElement,
}: Props) => {
  const [open, setOpen] = React.useState(visible ? visible : false)

  useEffect(() => {
    setOpen(visible)
  }, [visible])

  function stopPropagation(e: React.MouseEvent) {
    e.stopPropagation()
  }

  const sidePanelClasses = [SlidePanelStyles['paf-sidepanel']]

  const left = align === 'left'

  const containerClasses = [SlidePanelStyles['paf-sidepanel-container']]
  if (left) {
    containerClasses.push(SlidePanelStyles['paf-sidepanel--left'])
  } else {
    containerClasses.push(SlidePanelStyles['paf-sidepanel--right'])
  }
  if (className) containerClasses.push(className)

  let footerClasses = [SlidePanelStyles['paf-sidepanel-footer-container']]
  if (!customFooter) {
    footerClasses.push(SlidePanelStyles['paf-sidepanel-footer'])
  }

  const footerContent = customFooter ? (
    <div className={footerClasses.join(' ')}>{customFooter}</div>
  ) : (
    <div className={footerClasses.join(' ')}>
      <Space
        style={{
          width: '100%',
          justifyContent: alignFooter === 'right' ? 'flex-end' : 'flex-start',
        }}
      >
        <Button
          disabled={loading}
          type="outline"
          onClick={() => (onCancel ? onCancel() : null)}
        >
          {cancelText}
        </Button>
        <Button
          loading={loading}
          onClick={() => (onConfirm ? onConfirm() : null)}
        >
          {confirmText}
        </Button>
      </Space>
    </div>
  )

  function handleOpenChange(open: boolean) {
    if (visible !== undefined && !open) {
      // controlled component behaviour
      onCancel()
    } else {
      // un-controlled component behaviour
      setOpen(open)
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      {triggerElement && (
        <Dialog.Trigger className={SlidePanelStyles[`paf-sidepanel__trigger`]}>
          {triggerElement}
        </Dialog.Trigger>
      )}
      <Transition show={open}>
        <Dialog.Overlay forceMount>
          <Transition.Child
            enter={SlidePanelStyles[`paf-sidepanel-overlay--enter`]}
            enterFrom={SlidePanelStyles[`paf-sidepanel-overlay--enterFrom`]}
            enterTo={SlidePanelStyles[`paf-sidepanel-overlay--enterTo`]}
            leave={SlidePanelStyles[`paf-sidepanel-overlay--leave`]}
            leaveFrom={SlidePanelStyles[`paf-sidepanel-overlay--leaveFrom`]}
            leaveTo={SlidePanelStyles[`paf-sidepanel-overlay--leaveTo`]}
          >
            <div
              className={SlidePanelStyles['paf-sidepanel-overlay-container']}
            >
              <div className={SlidePanelStyles['paf-sidepanel-overlay']}></div>
            </div>
          </Transition.Child>
        </Dialog.Overlay>

        <Dialog.Content forceMount style={{ width: '100vw' }}>
          <div className={containerClasses.join(' ')}>
            <Transition.Child
              enter={SlidePanelStyles[`paf-sidepanel--enter`]}
              enterFrom={
                left
                  ? SlidePanelStyles[`paf-sidepanel--enterFrom--left`]
                  : SlidePanelStyles[`paf-sidepanel--enterFrom`]
              }
              enterTo={SlidePanelStyles[`paf-sidepanel--enterTo`]}
              leave={SlidePanelStyles[`paf-sidepanel--leave`]}
              leaveFrom={SlidePanelStyles[`paf-sidepanel--leaveFrom`]}
              leaveTo={
                left
                  ? SlidePanelStyles[`paf-sidepanel--leaveTo--left`]
                  : SlidePanelStyles[`paf-sidepanel--leaveTo`]
              }
            >
              <div
                className={
                  wide
                    ? SlidePanelStyles['paf-sidepanel--wide']
                    : SlidePanelStyles['paf-sidepanel--medium']
                }
              >
                <div
                  className={sidePanelClasses.join(' ')}
                  onClick={stopPropagation}
                >
                  <Space
                    size={6}
                    direction="vertical"
                    style={{
                      minHeight: '0',
                      flex: '1 1 0%',
                      overflowY: 'scroll',
                    }}
                  >
                    <header
                      className={SlidePanelStyles['paf-sidepanel-header']}
                    >
                      <Space
                        size={3}
                        direction="row"
                        style={{
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        {title && (
                          <Typography.Title className="m-0" level={4}>
                            {title}
                          </Typography.Title>
                        )}
                        <div
                          className={
                            SlidePanelStyles['paf-sidepanel-close-container']
                          }
                        >
                          <Button
                            aria-label="Close panel"
                            onClick={onCancel}
                            type="text"
                            shadow={false}
                            style={{ padding: 0 }}
                            icon={<IconX size="xlarge" strokeWidth={2} />}
                          />
                        </div>
                      </Space>
                      <div>
                        {description && (
                          <Typography.Text type="secondary">
                            {description}
                          </Typography.Text>
                        )}
                      </div>
                    </header>
                    <div className={SlidePanelStyles['paf-sidepanel-content']}>
                      {children}
                    </div>
                  </Space>
                  {!hideFooter && footerContent}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog.Content>
      </Transition>
    </Dialog.Root>
  )
}

export default SidePanel
