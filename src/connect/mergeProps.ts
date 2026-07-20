import type { Action, Dispatch } from 'redux'
import verifyPlainObject from '../utils/verifyPlainObject'
import { createInvalidArgFactory } from './invalidArgFactory'
import type { MergeProps } from './selectorFactory'
import type { EqualityFn } from '../types'

function defaultMergeProps<
  TStateProps,
  TDispatchProps,
  TOwnProps,
  TMergedProps,
>(
  stateProps: TStateProps,
  dispatchProps: TDispatchProps,
  ownProps: TOwnProps,
): TMergedProps {
    throw new Error("STUB");
}

function wrapMergePropsFunc<
  TStateProps,
  TDispatchProps,
  TOwnProps,
  TMergedProps,
>(
  mergeProps: MergeProps<TStateProps, TDispatchProps, TOwnProps, TMergedProps>,
): (
  dispatch: Dispatch<Action<string>>,
  options: {
    readonly displayName: string
    readonly areMergedPropsEqual: EqualityFn<TMergedProps>
  },
) => MergeProps<TStateProps, TDispatchProps, TOwnProps, TMergedProps> {
    throw new Error("STUB");
}

export function mergePropsFactory<
  TStateProps,
  TDispatchProps,
  TOwnProps,
  TMergedProps,
>(
  mergeProps?: MergeProps<TStateProps, TDispatchProps, TOwnProps, TMergedProps>,
) {
    throw new Error("STUB");
}
