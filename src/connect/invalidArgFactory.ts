import type { Action, Dispatch } from 'redux'

export function createInvalidArgFactory(arg: unknown, name: string) {
    throw new Error("STUB");
}
