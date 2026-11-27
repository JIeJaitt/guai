import { FolderClosed, Home, Plus, Settings, Sparkles } from 'lucide-react'

export type NavId = 'home' | 'new' | 'workspace' | 'skills' | 'settings'

const items: { id: NavId; label: string; icon: typeof Home }[] = [
  { id: 'home', label: '首页', icon: Home },
  { id: 'new', label: '新会话', icon: Plus },
  { id: 'workspace', label: '工作区', icon: FolderClosed },
  { id: 'skills', label: '技能', icon: Sparkles },
  { id: 'settings', label: '设置', icon: Settings }
]

type Props = {
  current: NavId
  onNavigate: (id: NavId) => void
}

export function Sidebar({ current, onNavigate }: Props) {
  return (
    <aside className="flex w-[220px] shrink-0 flex-col bg-aside">
      <div className="flex justify-center pt-6 pb-5">
        <div className="flex h-[58px] w-[58px] items-center justify-center rounded-full bg-white text-[20px] text-ink shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
          g
        </div>
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
    </aside>
  )
}
