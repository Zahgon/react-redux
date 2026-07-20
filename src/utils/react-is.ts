import type { ElementType, MemoExoticComponent, ReactElement } from 'react'
import { React } from './react'

// Directly ported from:
// https://unpkg.com/browse/react-is@19.0.0/cjs/react-is.production.js
// It's very possible this could change in the future, but given that
// we only use these in `connect`, this is a low priority.

export const IS_REACT_19 = /* @__PURE__ */ React.version.startsWith('19')

const REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for(
  IS_REACT_19 ? 'react.transitional.element' : 'react.element',
)
const REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for('react.portal')
const REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for('react.fragment')
const REACT_STRICT_MODE_TYPE = /* @__PURE__ */ Symbol.for('react.strict_mode')
const REACT_PROFILER_TYPE = /* @__PURE__ */ Symbol.for('react.profiler')
const REACT_CONSUMER_TYPE = /* @__PURE__ */ Symbol.for('react.consumer')
const REACT_CONTEXT_TYPE = /* @__PURE__ */ Symbol.for('react.context')
const REACT_FORWARD_REF_TYPE = /* @__PURE__ */ Symbol.for('react.forward_ref')
const REACT_SUSPENSE_TYPE = /* @__PURE__ */ Symbol.for('react.suspense')
const REACT_SUSPENSE_LIST_TYPE = /* @__PURE__ */ Symbol.for(
  'react.suspense_list',
)
const REACT_MEMO_TYPE = /* @__PURE__ */ Symbol.for('react.memo')
const REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for('react.lazy')
const REACT_OFFSCREEN_TYPE = /* @__PURE__ */ Symbol.for('react.offscreen')
const REACT_CLIENT_REFERENCE = /* @__PURE__ */ Symbol.for(
  'react.client.reference',
)

export const ForwardRef = REACT_FORWARD_REF_TYPE
export const Memo = REACT_MEMO_TYPE

export function isValidElementType(type: any): type is ElementType {
    throw new Error("STUB");
}

function typeOf(object: any): symbol | undefined {
    throw new Error("STUB");
}

export function isContextConsumer(object: any): object is ReactElement {
    throw new Error("STUB");
}

export function isMemo(object: any): object is MemoExoticComponent<any> {
    throw new Error("STUB");
}
