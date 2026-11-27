import { ChevronDown, Clock } from 'lucide-react'
import { useState } from 'react'
import { Article } from './components/Article'
import { Heatmap } from './components/Heatmap'
import { Logo } from './components/Logo'
import { Rail } from './components/Rail'
import { Sidebar, type NavId } from './components/Sidebar'
import { SettingsPage } from './components/SettingsPage'
import { posts as seedPosts, type Post, type Turn } from './sample'
import type { SettingId } from './settings/catalog'

const pages: Record<Exclude<NavId, 'home' | 'new'>, { title: string; body: string }> = {
  workspace: {
    title: '工作区',
    body: '当前目录是 D:\\Work\\guai。内核接上之后，从这里打开要交给 guai 的文件夹。'
  },
  skills: {
    title: '技能',
    body: '还没有技能。仓库里的 SKILL.md 之后会列在这里。'
  }
}

export default function App() {
  const [nav, setNav] = useState<NavId>('home')
  const [list, setList] = useState<Post[]>(seedPosts)
  const [openedId, setOpenedId] = useState<string | null>(null)
  const [draft, setDraft] = useState('')
  const [query, setQuery] = useState('')
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [settingId, setSettingId] = useState<SettingId>('api')

  const visible = list.filter((post) => post.title.includes(query.trim()) || post.excerpt.includes(query.trim()))
  const opened = list.find((post) => post.id === openedId) ?? null

  function navigate(id: NavId) {
    setNav(id)
    setOpenedId(null)
    setDraft('')
    setCalendarOpen(false)
    setSettingsOpen(false)
  }

  function openSettings() {
    setSettingsOpen(true)
    setSettingId('api')
    setOpenedId(null)
    setCalendarOpen(false)
  }

  function send() {
    const text = draft.trim()
    if (text === '') return
    const userTurn: Turn = { id: crypto.randomUUID(), role: 'user', text }
    const reply: Turn = {
      id: crypto.randomUUID(),
      role: 'guai',
      text: '界面已经在了。内核还没接上，这句话先留在这张卡片里。'
    }
    if (opened) {
      setList((items) =>
        items.map((post) => (post.id === opened.id ? { ...post, turns: [...post.turns, userTurn, reply] } : post))
      )
    } else {
      const id = crypto.randomUUID()
      const post: Post = {
        id,
        title: text.slice(0, 18),
        excerpt: text,
        date: '刚刚',
        comments: '1 条',
        views: '1',
        turns: [
          userTurn,
          reply
        ]
      }
      setList((items) => [post, ...items])
      setOpenedId(id)
    }
    setDraft('')
  }

  const browsing = nav === 'home' || nav === 'new'

  return (
    <div className="relative flex h-full flex-col bg-sky text-ink">
      <header className="window-drag flex h-[50px] shrink-0">
        <div className="flex h-full w-[220px] shrink-0 items-center gap-2 bg-aside px-6 text-[18px] tracking-wide">
          <Logo className="h-7 w-7" />
          guai
        </div>
        <div className="flex min-w-0 flex-1 items-center gap-3 px-7">
          <button
            type="button"
            aria-label="动态日历"
            aria-expanded={calendarOpen}
            onClick={() => setCalendarOpen((open) => !open)}
            className="flex h-8 items-center gap-0.5 rounded-full bg-[#f4f7f8] px-2 text-[#6d7c84]"
          >
            <Clock size={15} strokeWidth={1.7} />
            <ChevronDown size={14} strokeWidth={1.7} className={calendarOpen ? 'rotate-180' : ''} />
          </button>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索"
            className="h-[32px] w-[220px] rounded-full border border-white/80 bg-[#f4f7f8] px-4 text-[13px] outline-none placeholder:text-[#b0b0b0]"
          />
        </div>
        <div className="flex w-[240px] shrink-0 items-center justify-end pr-4 text-[13px] text-[#8a8a8a]">DeepSeek · 刚刚</div>
        <div className="w-[138px] shrink-0" />
      </header>
      {calendarOpen ? (
        <>
          <button type="button" aria-label="关闭动态日历" className="absolute top-[50px] right-0 bottom-0 left-0 z-10 cursor-default" onClick={() => setCalendarOpen(false)} />
          <div className="absolute top-[58px] left-[248px] z-20 rounded-[8px] bg-card px-5 py-4 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
            <Heatmap />
          </div>
        </>
      ) : null}
      <div className="flex min-h-0 flex-1">
        <Sidebar
          current={opened ? 'home' : nav}
          settingsOpen={settingsOpen}
          settingId={settingId}
          onNavigate={navigate}
          onOpenSettings={openSettings}
          onCloseSettings={() => setSettingsOpen(false)}
          onSelectSetting={setSettingId}
        />
        <div className="flex min-h-0 min-w-0 flex-1 overflow-y-auto">
          {settingsOpen ? (
            <SettingsPage settingId={settingId} />
          ) : browsing ? (
            <Article posts={visible} opened={opened} onOpen={setOpenedId} draft={draft} onDraft={setDraft} onSend={send} />
          ) : (
            <div className="min-w-0 flex-1 px-7 pt-6">
              <h1 className="text-[22px] font-bold">{pages[nav].title}</h1>
              <article className="mt-4 rounded-[6px] bg-card px-5 py-4 text-[15px] leading-[1.85] shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
                {pages[nav].body}
              </article>
            </div>
          )}
          {settingsOpen ? null : <Rail />}
        </div>
      </div>
    </div>
  )
}
