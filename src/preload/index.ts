import { contextBridge } from 'electron'

contextBridge.exposeInMainWorld('guai', {
  shell: 'electron'
})
