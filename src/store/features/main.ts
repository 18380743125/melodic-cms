import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IState {
  token: string
}

const initialState = {
  token: 'hello'
} as IState

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setToken(state, { payload }: PayloadAction<string>) {
      state.token = payload
    }
  }
})

export const { setToken } = mainSlice.actions

export default mainSlice.reducer
