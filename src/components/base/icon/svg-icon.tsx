import { CSSProperties, useEffect, useState } from 'react'
import classNames from 'classnames'

import styles from './styles.module.scss'

interface IProps {
  name: string
  color?: string
  style?: CSSProperties
  className?: string
}

const SvgIcon = (props: IProps) => {
  const [iconName, setIconName] = useState<string>()
  const [svgClass, setSvgClass] = useState<string>()

  useEffect(() => {
    setIconName(props.name)
    setSvgClass(`svg-icon`)
    if (props.className) {
      setSvgClass(`svg-icon ${props.className}`)
    }
  }, [props])

  return (
    <svg className={classNames([styles.svgIcon, { svgClass: !!svgClass }])} style={props.style}>
      <use href={`#icon-${iconName}`} fill={props.color} />
    </svg>
  )
}

export default SvgIcon
