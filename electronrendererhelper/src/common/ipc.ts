import { JabraTypeEvents, DeviceTypeEvents } from '@gnaudio/jabra-node-sdk';

/**
 * Send when the client is initializing asking the Api server for meta data.
 */
export const createApiClientInitEventName = "jabraApiClientIntializing";

/**
 * Event channel name for executing methods against a specific device.
 */
export function getExecuteDeviceTypeApiMethodEventName(deviceID: number) {
    return 'executeDeviceApiMethod:' + deviceID.toString();
}

/**
 * Event channel name for responding with results to executing methods against a specific device.
 */
export function getExecuteDeviceTypeApiMethodResponseEventName(deviceID: number) {
    return 'executeDeviceApiMethodResponse:' + deviceID.toString();
}

/**
 * Event channel name for receiving events for a specific device.
 */
export function getDeviceTypeApiCallabackEventName(eventName: DeviceTypeEvents, deviceID: number) {
    return eventName + ':' + deviceID.toString();
}

/**
 * Event channel name for executing general methods on the jabra sdk (not device specific).
 */
export function getExecuteJabraTypeApiMethodEventName() {
    return 'executeJabraApiMethod';
}

/**
 * Event channel name for responding with results to executing methods on the jabra sdk (not device specific).
 */
export function getExecuteJabraTypeApiMethodResponseEventName() {
    return 'executeJabraApiMethodResponse';
}

/**
 * Event channel name for receiving general (not device specific) jabra sdk events.
 */
export function getJabraTypeApiCallabackEventName(eventName: JabraTypeEvents) {
    return eventName;
}

