import type { Action, Dispatch } from 'redux'
import bindActionCreators from '../utils/bindActionCreators'
import { wrapMapToPropsConstant, wrapMapToPropsFunc } from './wrapMapToProps'
import { createInvalidArgFactory } from './invalidArgFactory'
import type { MapDispatchToPropsParam } from './selectorFactory'

export function mapDispatchToPropsFactory<TDispatchProps, TOwnProps>(
  mapDispatchToProps:
    | MapDispatchToPropsParam<TDispatchProps, TOwnProps>
    | undefined,
) {
    throw new Error("STUB");
}
