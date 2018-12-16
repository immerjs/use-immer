import * as React from 'react'
import { Draft } from 'immer'

type Recipe<S = any> = (this: Draft<S>, draftState: Draft<S>) => void | S
type Update<S = any> = (recipe: Recipe<S>) => void
type Reducer<S = any, A = any> = (
  this: Draft<S>,
  draftState: Draft<S>,
  action: A,
) => void | S

declare module 'use-immer' {
  export function useImmer<S = any>(initialValue: S): [S, Update<S>]
  export function useImmerReducer<S = any, A = any>(reducer: Reducer<S, A>, initialState: S): [S, React.Dispatch<A>]
}
