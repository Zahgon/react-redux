/* eslint-disable valid-jsdoc, @typescript-eslint/no-unused-vars */
import type { ComponentType } from 'react'
import { React } from '../utils/react'
import { isValidElementType, isContextConsumer } from '../utils/react-is'

import type { Store } from 'redux'

import type {
  ConnectedComponent,
  InferableComponentEnhancer,
  InferableComponentEnhancerWithProps,
  ResolveThunks,
  DispatchProp,
  ConnectPropsMaybeWithoutContext,
} from '../types'

import type {
  MapStateToPropsParam,
  MapDispatchToPropsParam,
  MergeProps,
  MapDispatchToPropsNonObject,
  SelectorFactoryOptions,
} from '../connect/selectorFactory'
import defaultSelectorFactory from '../connect/selectorFactory'
import { mapDispatchToPropsFactory } from '../connect/mapDispatchToProps'
import { mapStateToPropsFactory } from '../connect/mapStateToProps'
import { mergePropsFactory } from '../connect/mergeProps'

import type { Subscription } from '../utils/Subscription'
import { createSubscription } from '../utils/Subscription'
import { useIsomorphicLayoutEffect } from '../utils/useIsomorphicLayoutEffect'
import shallowEqual from '../utils/shallowEqual'
import hoistStatics from '../utils/hoistStatics'
import warning from '../utils/warning'

import type {
  ReactReduxContextValue,
  ReactReduxContextInstance,
} from './Context'
import { ReactReduxContext } from './Context'

// Define some constant arrays just to avoid re-creating these
const EMPTY_ARRAY: [unknown, number] = [null, 0]
const NO_SUBSCRIPTION_ARRAY = [null, null]

// Attempts to stringify whatever not-really-a-component value we were given
// for logging in an error message
const stringifyComponent = (Comp: unknown) => {
    throw new Error("STUB");
}

type EffectFunc = (...args: any[]) => void | ReturnType<React.EffectCallback>

// This is "just" a `useLayoutEffect`, but with two modifications:
// - we need to fall back to `useEffect` in SSR to avoid annoying warnings
// - we extract this to a separate function to avoid closing over values
//   and causing memory leaks
function useIsomorphicLayoutEffectWithArgs(
  effectFunc: EffectFunc,
  effectArgs: any[],
  dependencies?: React.DependencyList,
) {
    throw new Error("STUB");
}

// Effect callback, extracted: assign the latest props values to refs for later usage
function captureWrapperProps(
  lastWrapperProps: React.MutableRefObject<unknown>,
  lastChildProps: React.MutableRefObject<unknown>,
  renderIsScheduled: React.MutableRefObject<boolean>,
  wrapperProps: unknown,
  // actualChildProps: unknown,
  childPropsFromStoreUpdate: React.MutableRefObject<unknown>,
  notifyNestedSubs: () => void,
) {
    throw new Error("STUB");
}

// Effect callback, extracted: subscribe to the Redux store or nearest connected ancestor,
// check for updates after dispatched actions, and trigger re-renders.
function subscribeUpdates(
  shouldHandleStateChanges: boolean,
  store: Store,
  subscription: Subscription,
  childPropsSelector: (state: unknown, props: unknown) => unknown,
  lastWrapperProps: React.MutableRefObject<unknown>,
  lastChildProps: React.MutableRefObject<unknown>,
  renderIsScheduled: React.MutableRefObject<boolean>,
  isMounted: React.MutableRefObject<boolean>,
  childPropsFromStoreUpdate: React.MutableRefObject<unknown>,
  notifyNestedSubs: () => void,
  // forceComponentUpdateDispatch: React.Dispatch<any>,
  additionalSubscribeListener: () => void,
  displayName: string,
) {
  // If we're not subscribed to the store, nothing to do here
  if (!shouldHandleStateChanges) return () => {
      throw new Error("STUB");
  }

  // Capture values for checking if and when this component unmounts
  let didUnsubscribe = false
  let lastThrownError: Error | null = null

  // We'll run this callback every time a store subscription update propagates to this component
  const checkForUpdates = () => {
    if (didUnsubscribe || !isMounted.current) {
      // Don't run stale listeners.
      // Redux doesn't guarantee unsubscriptions happen until next dispatch.
      return
    }

    // TODO We're currently calling getState ourselves here, rather than letting `uSES` do it
    const latestStoreState = store.getState()

    let newChildProps, error
    try {
      // Actually run the selector with the most recent store state and wrapper props
      // to determine what the child props should be
      newChildProps = childPropsSelector(
        latestStoreState,
        lastWrapperProps.current,
      )
    } catch (e) {
      error = e
      lastThrownError = e as Error | null
      if (process.env.NODE_ENV !== 'production') {
        console.error(
          `An error occurred in \`mapStateToProps\` (or a selector) of the \`connect()\`-ed component "${displayName}". ` +
            'See https://github.com/reduxjs/react-redux/issues/1942 for details.',
          e,
        )
      }
    }

    if (!error) {
      lastThrownError = null
    }

    // If the child props haven't changed, nothing to do here - cascade the subscription update
    if (newChildProps === lastChildProps.current) {
      if (!renderIsScheduled.current) {
        notifyNestedSubs()
      }
    } else {
      // Save references to the new child props.  Note that we track the "child props from store update"
      // as a ref instead of a useState/useReducer because we need a way to determine if that value has
      // been processed.  If this went into useState/useReducer, we couldn't clear out the value without
      // forcing another re-render, which we don't want.
      lastChildProps.current = newChildProps
      childPropsFromStoreUpdate.current = newChildProps
      renderIsScheduled.current = true

      // TODO This is hacky and not how `uSES` is meant to be used
      // Trigger the React `useSyncExternalStore` subscriber
      additionalSubscribeListener()
    }
  }

  // Actually subscribe to the nearest connected ancestor (or store)
  subscription.onStateChange = checkForUpdates
  subscription.trySubscribe()

  // Pull data from the store after first render in case the store has
  // changed since we began.
  checkForUpdates()

  const unsubscribeWrapper = () => {
      throw new Error("STUB");
  }

  return unsubscribeWrapper
}

// Reducer initial state creation for our update reducer
const initStateUpdates = () => { throw new Error("STUB"); }

export interface ConnectProps {
  /** A custom Context instance that the component can use to access the store from an alternate Provider using that same Context instance */
  context?: ReactReduxContextInstance
  /** A Redux store instance to be used for subscriptions instead of the store from a Provider */
  store?: Store
}

interface InternalConnectProps extends ConnectProps {
  reactReduxForwardedRef?: React.ForwardedRef<unknown>
}

function strictEqual(a: unknown, b: unknown) {
    throw new Error("STUB");
}

/**
 * Infers the type of props that a connector will inject into a component.
 */
export type ConnectedProps<TConnector> =
  TConnector extends InferableComponentEnhancerWithProps<
    infer TInjectedProps,
    any
  >
    ? unknown extends TInjectedProps
      ? TConnector extends InferableComponentEnhancer<infer TInjectedProps>
        ? TInjectedProps
        : never
      : TInjectedProps
    : never

export interface ConnectOptions<
  State = unknown,
  TStateProps = {},
  TOwnProps = {},
  TMergedProps = {},
> {
  forwardRef?: boolean
  context?: typeof ReactReduxContext
  areStatesEqual?: (
    nextState: State,
    prevState: State,
    nextOwnProps: TOwnProps,
    prevOwnProps: TOwnProps,
  ) => boolean

  areOwnPropsEqual?: (
    nextOwnProps: TOwnProps,
    prevOwnProps: TOwnProps,
  ) => boolean

  areStatePropsEqual?: (
    nextStateProps: TStateProps,
    prevStateProps: TStateProps,
  ) => boolean
  areMergedPropsEqual?: (
    nextMergedProps: TMergedProps,
    prevMergedProps: TMergedProps,
  ) => boolean
}

/**

 *
 * Connects a React component to a Redux store.
 *
 * - Without arguments, just wraps the component, without changing the behavior / props
 *
 * - If 2 params are passed (3rd param, mergeProps, is skipped), default behavior
 * is to override ownProps (as stated in the docs), so what remains is everything that's
 * not a state or dispatch prop
 *
 * - When 3rd param is passed, we don't know if ownProps propagate and whether they
 * should be valid component props, because it depends on mergeProps implementation.
 * As such, it is the user's responsibility to extend ownProps interface from state or
 * dispatch props or both when applicable
 *
 * @param mapStateToProps
 * @param mapDispatchToProps
 * @param mergeProps
 * @param options
 */
export interface Connect<DefaultState = unknown> {
  // tslint:disable:no-unnecessary-generics
  (): InferableComponentEnhancer<DispatchProp>

  /** mapState only */
  <TStateProps = {}, no_dispatch = {}, TOwnProps = {}, State = DefaultState>(
    mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State>,
  ): InferableComponentEnhancerWithProps<TStateProps & DispatchProp, TOwnProps>

  /** mapDispatch only (as a function) */
  <no_state = {}, TDispatchProps = {}, TOwnProps = {}>(
    mapStateToProps: null | undefined,
    mapDispatchToProps: MapDispatchToPropsNonObject<TDispatchProps, TOwnProps>,
  ): InferableComponentEnhancerWithProps<TDispatchProps, TOwnProps>

  /** mapDispatch only (as an object) */
  <no_state = {}, TDispatchProps = {}, TOwnProps = {}>(
    mapStateToProps: null | undefined,
    mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps, TOwnProps>,
  ): InferableComponentEnhancerWithProps<
    ResolveThunks<TDispatchProps>,
    TOwnProps
  >

  /** mapState and mapDispatch (as a function)*/
  <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState>(
    mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State>,
    mapDispatchToProps: MapDispatchToPropsNonObject<TDispatchProps, TOwnProps>,
  ): InferableComponentEnhancerWithProps<
    TStateProps & TDispatchProps,
    TOwnProps
  >

  /** mapState and mapDispatch (nullish) */
  <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState>(
    mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State>,
    mapDispatchToProps: null | undefined,
  ): InferableComponentEnhancerWithProps<TStateProps, TOwnProps>

  /** mapState and mapDispatch (as an object) */
  <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState>(
    mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State>,
    mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps, TOwnProps>,
  ): InferableComponentEnhancerWithProps<
    TStateProps & ResolveThunks<TDispatchProps>,
    TOwnProps
  >

  /** mergeProps only */
  <no_state = {}, no_dispatch = {}, TOwnProps = {}, TMergedProps = {}>(
    mapStateToProps: null | undefined,
    mapDispatchToProps: null | undefined,
    mergeProps: MergeProps<undefined, DispatchProp, TOwnProps, TMergedProps>,
  ): InferableComponentEnhancerWithProps<TMergedProps, TOwnProps>

  /** mapState and mergeProps */
  <
    TStateProps = {},
    no_dispatch = {},
    TOwnProps = {},
    TMergedProps = {},
    State = DefaultState,
  >(
    mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State>,
    mapDispatchToProps: null | undefined,
    mergeProps: MergeProps<TStateProps, DispatchProp, TOwnProps, TMergedProps>,
  ): InferableComponentEnhancerWithProps<TMergedProps, TOwnProps>

  /** mapDispatch (as a object) and mergeProps */
  <no_state = {}, TDispatchProps = {}, TOwnProps = {}, TMergedProps = {}>(
    mapStateToProps: null | undefined,
    mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps, TOwnProps>,
    mergeProps: MergeProps<undefined, TDispatchProps, TOwnProps, TMergedProps>,
  ): InferableComponentEnhancerWithProps<TMergedProps, TOwnProps>

  /** mapState and options */
  <TStateProps = {}, no_dispatch = {}, TOwnProps = {}, State = DefaultState>(
    mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State>,
    mapDispatchToProps: null | undefined,
    mergeProps: null | undefined,
    options: ConnectOptions<State, TStateProps, TOwnProps>,
  ): InferableComponentEnhancerWithProps<DispatchProp & TStateProps, TOwnProps>

  /** mapDispatch (as a function) and options */
  <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}>(
    mapStateToProps: null | undefined,
    mapDispatchToProps: MapDispatchToPropsNonObject<TDispatchProps, TOwnProps>,
    mergeProps: null | undefined,
    options: ConnectOptions<{}, TStateProps, TOwnProps>,
  ): InferableComponentEnhancerWithProps<TDispatchProps, TOwnProps>

  /** mapDispatch (as an object) and options*/
  <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}>(
    mapStateToProps: null | undefined,
    mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps, TOwnProps>,
    mergeProps: null | undefined,
    options: ConnectOptions<{}, TStateProps, TOwnProps>,
  ): InferableComponentEnhancerWithProps<
    ResolveThunks<TDispatchProps>,
    TOwnProps
  >

  /** mapState,  mapDispatch (as a function), and options */
  <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState>(
    mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State>,
    mapDispatchToProps: MapDispatchToPropsNonObject<TDispatchProps, TOwnProps>,
    mergeProps: null | undefined,
    options: ConnectOptions<State, TStateProps, TOwnProps>,
  ): InferableComponentEnhancerWithProps<
    TStateProps & TDispatchProps,
    TOwnProps
  >

  /** mapState,  mapDispatch (as an object), and options */
  <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState>(
    mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State>,
    mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps, TOwnProps>,
    mergeProps: null | undefined,
    options: ConnectOptions<State, TStateProps, TOwnProps>,
  ): InferableComponentEnhancerWithProps<
    TStateProps & ResolveThunks<TDispatchProps>,
    TOwnProps
  >

  /** mapState, mapDispatch, mergeProps, and options */
  <
    TStateProps = {},
    TDispatchProps = {},
    TOwnProps = {},
    TMergedProps = {},
    State = DefaultState,
  >(
    mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State>,
    mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps, TOwnProps>,
    mergeProps: MergeProps<
      TStateProps,
      TDispatchProps,
      TOwnProps,
      TMergedProps
    >,
    options?: ConnectOptions<State, TStateProps, TOwnProps, TMergedProps>,
  ): InferableComponentEnhancerWithProps<TMergedProps, TOwnProps>
  // tslint:enable:no-unnecessary-generics
}

let hasWarnedAboutDeprecatedPureOption = false

/**
 * @deprecated
 *
 * **We recommend using the `useSelector` and `useDispatch` hooks instead.**
 * See https://react-redux.js.org/api/hooks
 *
 * If you need to use `connect` without this visual deprecation warning,
 * import `legacy_connect` instead:
 *
 * `import { legacy_connect as connect } from 'react-redux'`
 *
 * Connects a React component to a Redux store.
 *
 * - Without arguments, just wraps the component, without changing the behavior / props
 *
 * - If 2 params are passed (3rd param, mergeProps, is skipped), default behavior
 * is to override ownProps (as stated in the docs), so what remains is everything that's
 * not a state or dispatch prop
 *
 * - When 3rd param is passed, we don't know if ownProps propagate and whether they
 * should be valid component props, because it depends on mergeProps implementation.
 * As such, it is the user's responsibility to extend ownProps interface from state or
 * dispatch props or both when applicable
 *
 * @param mapStateToProps A function that extracts values from state
 * @param mapDispatchToProps Setup for dispatching actions
 * @param mergeProps Optional callback to merge state and dispatch props together
 * @param options Options for configuring the connection
 *
 */
function _connect<
  TStateProps = {},
  TDispatchProps = {},
  TOwnProps = {},
  TMergedProps = {},
  State = unknown,
>(
  mapStateToProps?: MapStateToPropsParam<TStateProps, TOwnProps, State>,
  mapDispatchToProps?: MapDispatchToPropsParam<TDispatchProps, TOwnProps>,
  mergeProps?: MergeProps<TStateProps, TDispatchProps, TOwnProps, TMergedProps>,
  {
    // The `pure` option has been removed, so TS doesn't like us destructuring this to check its existence.
    // @ts-ignore
    pure,
    areStatesEqual = strictEqual,
    areOwnPropsEqual = shallowEqual,
    areStatePropsEqual = shallowEqual,
    areMergedPropsEqual = shallowEqual,

    // use React's forwardRef to expose a ref of the wrapped component
    forwardRef = false,

    // the context consumer to use
    context = ReactReduxContext,
  }: ConnectOptions<unknown, unknown, unknown, unknown> = {},
): unknown {
    throw new Error("STUB");
}

/**
 *  * @deprecated
 *
 * **We recommend using the `useSelector` and `useDispatch` hooks instead.**
 * See https://react-redux.js.org/api/hooks
 *
 * If you need to use `connect` without this visual deprecation warning,
 * import `legacy_connect` instead:
 *
 * `import { legacy_connect as connect } from 'react-redux'`
 */
export const connect: Connect = _connect as Connect

/**
 * Connects a React component to a Redux store. Same as `connect` but without
 * the deprecation warning.
 *
 * **We recommend using the `useSelector` and `useDispatch` hooks instead.**
 * See https://react-redux.js.org/api/hooks
 */
export const legacy_connect: Connect = _connect as Connect
