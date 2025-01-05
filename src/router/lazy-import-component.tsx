import { Suspense, LazyExoticComponent } from 'react'

const LazyImportComponent = (props: { lazyChildren: LazyExoticComponent<() => JSX.Element> }) => {
  return (
    <Suspense fallback={<main>Loading...</main>}>
      <props.lazyChildren />
    </Suspense>
  )
}

export default LazyImportComponent
