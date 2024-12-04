import { configureStore } from '@reduxjs/toolkit'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'

const store = configureStore({
  reducer: {}
})

type StateFnType = typeof store.getState

type IRootState = ReturnType<StateFnType>

export type DispatchType = typeof store.dispatch

export type { IRootState }

export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector

export const useAppDispatch: () => DispatchType = useDispatch

export const shallowEqualApp = shallowEqual

export default store
