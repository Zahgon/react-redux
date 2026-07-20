import type { useSyncExternalStore } from 'use-sync-external-store'
import type { useSyncExternalStoreWithSelector } from 'use-sync-external-store/with-selector'

export const notInitialized = () => {
    throw new Error("STUB");
}

export type uSES = typeof useSyncExternalStore
export type uSESWS = typeof useSyncExternalStoreWithSelector
