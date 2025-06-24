export enum IpcEvents {
  PING = 'ping',
}

export const ipcMainEvents = [
  IpcEvents.PING,
]

export const WEBCONTENTS_READY_FOR_IPC_SIGNAL =
  'WEBCONTENTS_READY_FOR_IPC_SIGNAL'; 