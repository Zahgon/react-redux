import { React } from '../utils/react'
import { ReactReduxContext } from '../components/Context'
import type { ReactReduxContextValue } from '../components/Context'

/**
 * Hook factory, which creates a `useReduxContext` hook bound to a given context. This is a low-level
 * hook that you should usually not need to call directly.
 *
 * @param {React.Context} [context=ReactReduxContext] Context passed to your `<Provider>`.
 * @returns {Function} A `useReduxContext` hook bound to the specified context.
 */
export function createReduxContextHook(context = ReactReduxContext) {
  return function useReduxContext(): ReactReduxContextValue {
      throw new Error("STUB");
  }
}

/**
 * A hook to access the value of the `ReactReduxContext`. This is a low-level
 * hook that you should usually not need to call directly.
 *
 * @returns {any} the value of the `ReactReduxContext`
 *
 * @example
 *
 * import React from 'react'
 * import { useReduxContext } from 'react-redux'
 *
 * export const CounterComponent = () => {
 *   const { store } = useReduxContext()
 *   return <div>{store.getState()}</div>
 * }
 */
export const useReduxContext = /*#__PURE__*/ createReduxContextHook()
