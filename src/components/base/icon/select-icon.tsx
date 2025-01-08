import { useEffect, useRef, useState } from 'react'
import { Input } from 'antd'
import { useClickAway } from 'ahooks'
import classNames from 'classnames'
import { DownOutlined, UpOutlined } from '@ant-design/icons'

import SvgIcon from './svg-icon'

const icons = import.meta.glob('@/assets/svg/*.svg')

import styles from './styles.module.scss'

interface IconItem {
  label: string
  value: string
}

interface IProps {
  value?: string
  onChange?: (value: string) => void
}

const IconSelect = (props: IProps) => {
  const [icon, setIcon] = useState<string>()
  const [iconNames, setIconNames] = useState<string[]>([])
  const [iconList, setIconList] = useState<IconItem[]>([])
  const [filterIconList, setFilterIconList] = useState<IconItem[]>([])
  const [visible, setVisible] = useState(false)
  const iconRef = useRef(null)

  useEffect(() => {
    setIcon(props.value || '')
  }, [props])

  // 加载本地图标
  useEffect(() => {
    const list: IconItem[] = []
    const names: string[] = []
    Object.keys(icons).forEach(iconPath => {
      const iconName = iconPath.slice(iconPath.lastIndexOf('/') + 1).split('.svg')[0]
      names.push(iconName)
      const item: IconItem = {
        label: iconName,
        value: iconName
      }
      list.push(item)
    })
    setIconList(list)
    setIconNames(names)
  }, [])

  // 根据名称过滤图标(搜索)
  useEffect(() => {
    if (icon === '') {
      setFilterIconList(iconList)
    } else {
      const list = iconList.filter(item => item.label.includes(icon!))
      setFilterIconList(list)
    }
  }, [icon, iconList])

  // 点击外部关闭选择框
  useClickAway(() => {
    if (!iconNames.includes(icon!)) {
      setIcon('')
    }
    closeSelect()
  }, iconRef.current)

  const handleItemClick = (item: IconItem) => {
    setIcon(item.value)
    props.onChange?.(item.value)
    closeSelect()
  }

  const closeSelect = () => {
    setVisible(false)
  }

  return (
    <section className={styles.selectIcon} ref={iconRef}>
      <Input
        placeholder='请选择菜单图标'
        suffix={visible ? <UpOutlined color='#bfbfbf' /> : <DownOutlined color='#bfbfbf' />}
        value={icon}
        onChange={e => {
          setIcon(e.target.value)
        }}
        onFocus={() => setVisible(true)}
        prefix={
          iconNames.includes(icon!) ? (
            <SvgIcon name={icon!} color='#687691' style={{ width: 24, height: 16 }} />
          ) : (
            <SvgIcon name='search' color='#687691' style={{ width: 24, height: 16 }} />
          )
        }
      />

      {visible &&
        (filterIconList.length > 0 ? (
          <ul className={styles.iconList}>
            {filterIconList.map((item, idx) => (
              <li className={styles.iconItem} key={item.value + idx}>
                <div
                  className={classNames([styles.content, { active: icon === item.value }])}
                  onClick={() => handleItemClick(item)}
                >
                  <SvgIcon name={item.value} color='#687691' style={{ width: 30, height: 22 }} />
                  <span>{item.label}</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          visible && <div>暂无数据</div>
        ))}
    </section>
  )
}

export default IconSelect
