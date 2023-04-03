import { produce, Draft, nothing, freeze } from "immer";
import { useState, useReducer, useCallback, useMemo, Dispatch } from "react";

export type DraftFunction<S> = (draft: Draft<S>) => void;
export type Updater<S> = (arg: S | DraftFunction<S>) => void;
export type ImmerHook<S> = [S, Updater<S>];

export function useImmer<S = any>(initialValue: S | (() => S)): ImmerHook<S>;

export function useImmer(initialValue: any) {
  const [val, updateValue] = useState(() =>
    freeze(
      typeof initialValue === "function" ? initialValue() : initialValue,
      true
    )
  );
  return [
    val,
    useCallback((updater) => {
      if (typeof updater === "function") updateValue(produce(updater));
      else updateValue(freeze(updater));
    }, []),
  ];
}

// Provides different overloads of `useImmerReducer` similar to `useReducer` from `@types/react`.

export type ImmerReducer<S, A> = (
  draftState: Draft<S>,
  action: A
) => void | (S extends undefined ? typeof nothing : S);

/**
 * @deprecated Use `ImmerReducer` instead since there is already a `Reducer` type in `@types/react`.
 */
export type Reducer<S = any, A = any> = ImmerReducer<S, A>;

export function useImmerReducer<S, A, I>(
  reducer: ImmerReducer<S, A>,
  initializerArg: S & I,
  initializer: (arg: S & I) => S
): [S, Dispatch<A>];

export function useImmerReducer<S, A, I>(
  reducer: ImmerReducer<S, A>,
  initializerArg: I,
  initializer: (arg: I) => S
): [S, Dispatch<A>];

export function useImmerReducer<S, A>(
  reducer: ImmerReducer<S, A>,
  initialState: S,
  initializer?: undefined
): [S, Dispatch<A>];

export function useImmerReducer<S, A, I>(
  reducer: ImmerReducer<S, A>,
  initializerArg: S & I,
  initializer?: (arg: S & I) => S
) {
  const cachedReducer = useMemo(() => produce(reducer), [reducer]);
  return useReducer(cachedReducer, initializerArg as any, initializer as any);
}
