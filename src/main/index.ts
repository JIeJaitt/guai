import { app, BrowserWindow, nativeImage, shell } from 'electron'
import { join } from 'path'

const iconPath = join(__dirname, '../../resources/icon.ico')
const icon = nativeImage.createFromPath(join(__dirname, '../../resources/icon.png'))

if (process.platform === 'win32') {
  app.setAppUserModelId('com.jiejeitt.guai.desktop')
}

function createWindow(): void {
  const win = new BrowserWindow({
    width: 1280,
    height: 840,
    minWidth: 960,
    minHeight: 640,
    show: false,
    autoHideMenuBar: true,
    title: 'Guai',
    icon,
    backgroundColor: '#d7e7ef',
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#d7e7ef',
      symbolColor: '#505050',
      height: 50
    },
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: true,
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  win.on('ready-to-show', () => {
    win.show()
  })

  if (process.platform === 'win32') {
    win.setAppDetails({
      appId: 'com.jiejeitt.guai.desktop',
      appIconPath: iconPath,
      appIconIndex: 0
    })
  }

  win.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (process.env.ELECTRON_RENDERER_URL) {
    win.loadURL(process.env.ELECTRON_RENDERER_URL)
  } else {
    win.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
