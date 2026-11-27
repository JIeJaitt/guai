import { ArrowLeft, CircleHelp, FolderClosed, Home, Plus, Settings, Sparkles } from 'lucide-react'
import { useState } from 'react'
import avatar from '../assets/avatar.png'
import { settings, type SettingId } from '../settings/catalog'

export type NavId = 'home' | 'new' | 'workspace' | 'skills'

const items: { id: NavId; label: string; icon: typeof Home }[] = [
  { id: 'home', label: '首页', icon: Home },
  { id: 'new', label: '新会话', icon: Plus },
  { id: 'workspace', label: '工作区', icon: FolderClosed },
  { id: 'skills', label: '技能', icon: Sparkles }
]

type Props = {
  current: NavId
  settingsOpen: boolean
  settingId: SettingId
  onNavigate: (id: NavId) => void
  onOpenSettings: () => void
  onCloseSettings: () => void
  onSelectSetting: (id: SettingId) => void
}

export function Sidebar({ current, settingsOpen, settingId, onNavigate, onOpenSettings, onCloseSettings, onSelectSetting }: Props) {
  const [helpOpen, setHelpOpen] = useState(false)

  if (settingsOpen) {
    return (
      <aside className="flex h-full w-[220px] shrink-0 flex-col bg-aside">
        <div className="flex items-center gap-2 px-3 pt-4 pb-2">
          <button
            type="button"
            aria-label="返回"
            onClick={onCloseSettings}
            className="flex h-7 w-7 items-center justify-center rounded-[4px] text-ink hover:bg-white/70"
          >
            <ArrowLeft size={16} strokeWidth={1.7} />
          </button>
          <span className="text-[15px]">设置</span>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-4">
          <div className="flex flex-col gap-0.5">
            {settings.map((item) => {
              const Icon = item.icon
              const active = item.id === settingId
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectSetting(item.id)}
                  className={`flex items-center gap-3 rounded-[4px] px-3 py-[7px] text-left text-[14px] text-ink ${
                    active ? 'bg-[#d5e3ea]' : 'hover:bg-white/60'
                  }`}
                >
                  <Icon size={16} strokeWidth={1.7} className="shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              )
            })}
          </div>
          <div className="mt-5 px-3">
            <div className="text-[12px] text-[#8aa0aa]">关于</div>
            <div className="mt-1 text-[13px]">guai 0.1.0</div>
          </div>
        </div>
      </aside>
    )
  }

  return (
    <aside className="relative flex h-full w-[220px] shrink-0 flex-col bg-aside">
      <div className="flex justify-center pt-6 pb-5">
        <img
          src={avatar}
          alt=""
          className="h-[58px] w-[58px] rounded-full object-cover object-[center_28%] shadow-[0_1px_2px_rgba(0,0,0,0.08)]"
        />
      </div>
      <nav className="flex flex-col gap-0.5 px-3">
        {items.map((item) => {
          const Icon = item.icon
          const active = current === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`flex items-center gap-3 rounded-[4px] px-3 py-[7px] text-left text-[14px] text-ink ${
                active ? 'bg-[#d5e3ea]' : 'hover:bg-white/60'
              }`}
            >
              <Icon size={16} strokeWidth={1.7} />
              {item.label}
            </button>
          )
        })}
      </nav>
      <div className="mt-auto flex items-center justify-between px-3 py-3">
        <button
          type="button"
          onClick={onOpenSettings}
          className="flex items-center gap-3 rounded-[4px] px-3 py-[7px] text-[14px] text-ink hover:bg-white/60"
        >
          <Settings size={16} strokeWidth={1.7} />
          设置
        </button>
        <button
          type="button"
          aria-label="帮助"
          aria-expanded={helpOpen}
          onClick={() => setHelpOpen((open) => !open)}
          className="flex h-7 w-7 items-center justify-center rounded-full text-[#7f97a3] hover:bg-white/70"
        >
          <CircleHelp size={18} strokeWidth={1.6} />
        </button>
      </div>
      {helpOpen ? (
        <div className="absolute right-3 bottom-14 z-10 w-[188px] rounded-[6px] bg-card px-3 py-2 text-[13px] leading-6 text-ink shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          在首页写下要做的事。点开头图或卡片，可以看这一次会话。
        </div>
      ) : null}
    </aside>
  )
}
