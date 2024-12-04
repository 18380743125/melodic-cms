import { RefObject, useCallback, useEffect, useState } from 'react'
import useResize from '@/hooks/useResize.ts'

/**
 * antd table 滚动高度
 * @param ref
 * @param isPage
 */
function useTableScrollHeight(ref: RefObject<HTMLElement>, isPage = true) {
  const [tableScrollY, setTableScrollY] = useState<string>()

  useResize(() => {
    _handle()
  })

  const _handle = useCallback(() => {
    const theadHeightEl = ref.current?.querySelector('.ant-table-thead') as HTMLElement
    if (!theadHeightEl) {
      return
    }
    const rect = theadHeightEl.getBoundingClientRect()
    setTableScrollY(`calc(100vh - ${(rect?.top as number) + rect.height + (isPage ? 76 : 12)}px)`)
  }, [isPage, ref])

  useEffect(() => {
    _handle()
  }, [_handle])

  return [tableScrollY]
}

export default useTableScrollHeight
