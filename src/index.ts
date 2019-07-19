import produce, { Draft } from "immer";
import { useState, useReducer, useCallback } from "react";

export type Reducer<S = any, A = any> = (
  draftState: Draft<S>,
  action: A
) => void | S;

export function useImmer<S = any>(
  initialValue: S | (() => S)
): [S, (f: (draft: Draft<S>) => void | S) => void];
export function useImmer(initialValue: any) {
  const [val, updateValue] = useState(initialValue);
  return [
    val,
    useCallback(updater => {
      updateValue(produce(updater));
    }, [])
  ];
}

export function useImmerReducer<S = any, A = any>(
  reducer: Reducer<S, A>,
  initialState: S,
  initialAction?: (initial: any) => S
): [S, React.Dispatch<A>];
export function useImmerReducer(reducer, initialState, initialAction) {
  const cachedReducer = useCallback(produce(reducer), [reducer]);
  return useReducer(cachedReducer, initialState as any, initialAction);
}
