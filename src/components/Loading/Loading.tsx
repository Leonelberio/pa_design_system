import React from 'react'
import { IconLoader } from './../../index'
// @ts-ignore
import LoadingStyles from './Loading.module.css'

interface Props {
  children: React.ReactNode
  active: boolean
}
export default function Loading({ children, active }: Props) {
  let classNames = [LoadingStyles['paf-loading']]
  if (active) {
    classNames.push(LoadingStyles['paf-loading--active'])
  }

  return (
    <div className={classNames.join(' ')}>
      <div className={LoadingStyles['paf-loading-content']}>{children}</div>
      {active && (
        <IconLoader
          size="xlarge"
          className={LoadingStyles['paf-loading-spinner']}
        />
      )}
    </div>
  )
}
