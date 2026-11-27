import { useState } from 'react'
import { Article } from './components/Article'
import { Rail } from './components/Rail'
import { Sidebar, type NavId } from './components/Sidebar'
import { posts as seedPosts, type Post, type Turn } from './sample'

const pages: Record<Exclude<NavId, 'home' | 'new'>, { title: string; body: string }> = {
  workspace: {
    title: '工作区',
    body: '当前目录是 D:\\Work\\guai。内核接上之后，从这里打开要交给 guai 的文件夹。'
  },
  skills: {
    title: '技能',
    body: '还没有技能。仓库里的 SKILL.md 之后会列在这里。'
  },
  settings: {
    title: '设置',
    body: '模型走 OpenAI 兼容端点，DeepSeek 作为第一组预设。地址还没填。'
  }
}

export default function App() {
  const [nav, setNav] = useState<NavId>('home')
  const [list, setList] = useState<Post[]>(seedPosts)
  const [openedId, setOpenedId] = useState<string | null>(null)
  const [draft, setDraft] = useState('')
  const [query, setQuery] = useState('')

  const visible = list.filter((post) => post.title.includes(query.trim()) || post.excerpt.includes(query.trim()))
  const opened = list.find((post) => post.id === openedId) ?? null

  function navigate(id: NavId) {
    setNav(id)
    setOpenedId(null)
    setDraft('')
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
    <div className="flex h-full flex-col bg-sky text-ink">
      <header className="window-drag flex h-[50px] shrink-0">
        <div className="flex h-full w-[220px] shrink-0 items-center gap-2 bg-aside px-6 text-[18px] tracking-wide">
          <span className="inline-block h-4 w-4 rounded-sm bg-[#505050]" />
          guai
        </div>
        <div className="flex min-w-0 flex-1 items-center px-7">
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
      <div className="flex min-h-0 flex-1">
        <Sidebar current={opened ? 'home' : nav} onNavigate={navigate} />
        <div className="flex min-h-0 min-w-0 flex-1 overflow-y-auto">
          {browsing ? (
            <Article posts={visible} opened={opened} onOpen={setOpenedId} draft={draft} onDraft={setDraft} onSend={send} />
          ) : (
            <div className="min-w-0 flex-1 px-7 pt-6">
              <h1 className="text-[22px] font-bold">{pages[nav].title}</h1>
              <article className="mt-4 rounded-[6px] bg-card px-5 py-4 text-[15px] leading-[1.85] shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
                {pages[nav].body}
              </article>
            </div>
          )}
          <Rail />
        </div>
      </div>
    </div>
  )
}
