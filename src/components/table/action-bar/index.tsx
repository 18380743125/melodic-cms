import { CSSProperties } from 'react'
import styles from './styles.module.scss'

interface IProps {
  style?: CSSProperties
  operatorLeft?: React.ReactNode
  operatorRight?: React.ReactNode
}

const ActionBar = (props: IProps) => {
  return (
    <section className={styles.operatorLayout}>
      <div className={styles.left}>{props.operatorLeft}</div>
      <div className={styles.right}>{props.operatorRight}</div>
    </section>
  )
}

export default ActionBar
