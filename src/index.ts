import produce, { Draft } from "immer"
import { useState, useReducer, useMemo } from "react"

type Reducer<S = any, A = any> = (
  draftState: Draft<S>,
  action: A,
) => void | S

export function useImmer<S = any>(initialValue: S): [S, (draft: Draft<S>) => void]
export function useImmer(initialValue: any) {
  const [val, updateValue] = useState(initialValue);
  return [
    val,
    updater => {
      updateValue(produce(updater));
    }
  ];
}

export function useImmerReducer<S = any, A = any>(
  reducer: Reducer<S, A>, 
  initialState: S,
  initialAction?: (initial: any) => S
)
export function useImmerReducer(
  reducer, initialState, initialAction  
) {
  const cachedReducer = useMemo(() => produce(reducer), [reducer]);
  return useReducer(cachedReducer, initialState as any, initialAction);
}
