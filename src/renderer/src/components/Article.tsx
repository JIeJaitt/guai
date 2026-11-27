import { MessageCircle, UserRound } from 'lucide-react'
import { useState } from 'react'
import { Cover } from './Cover'
import type { PatchLine, Post, Turn } from '../sample'

type Props = {
  posts: Post[]
  opened: Post | null
  onOpen: (id: string) => void
  draft: string
  onDraft: (value: string) => void
  onSend: () => void
}

export function Article({ posts, opened, onOpen, draft, onDraft, onSend }: Props) {
  if (opened) return <Detail post={opened} draft={draft} onDraft={onDraft} onSend={onSend} />
  return <Feed posts={posts} onOpen={onOpen} draft={draft} onDraft={onDraft} onSend={onSend} />
}

function Feed({
  posts,
  onOpen,
  draft,
  onDraft,
  onSend
}: {
  posts: Post[]
  onOpen: (id: string) => void
  draft: string
  onDraft: (value: string) => void
  onSend: () => void
}) {
  const list = Array.isArray(posts) ? posts : []
  const [featured, ...rest] = list
  return (
    <div className="min-w-0 flex-1 px-7 pt-6 pb-8">
      <h1 className="text-[22px] font-bold leading-none text-ink">guai</h1>
      <p className="mt-2 text-[14px] text-[#8a8a8a]">把事情放在这里，它会接着做完。</p>
      {featured ? (
        <button
          type="button"
          onClick={() => onOpen(featured.id)}
          className="relative mt-4 block h-[230px] w-full overflow-hidden rounded-[6px] text-left shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
        >
          <Cover />
          <span className="absolute top-4 left-4 rounded-[3px] bg-[#f28b82] px-1.5 py-0.5 text-[12px] text-white">置顶</span>
          <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 to-transparent px-5 pt-12 pb-4 text-left text-[20px] text-white">
            {featured.title}
          </span>
        </button>
      ) : null}
      <div className="mt-4 grid grid-cols-2 gap-4">
        {rest.map((post) => (
          <button
            key={post.id}
            type="button"
            onClick={() => onOpen(post.id)}
            className="flex min-h-[148px] flex-col overflow-hidden rounded-[6px] bg-card text-left shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
          >
            <span className="truncate px-4 pt-3 text-[15px] font-bold text-ink">{post.title}</span>
            <span className="line-clamp-2 px-4 py-2 text-[13px] leading-6 text-[#9a9a9a]">{post.excerpt}</span>
            <span className="mt-auto flex items-center gap-3 bg-[#f6fafb] px-4 py-2 text-[12px] text-[#a0a0a0]">
              <UserRound size={13} />
              <span>guai</span>
              <span>{post.date}</span>
              <MessageCircle size={13} />
              <span>{post.comments}</span>
            </span>
          </button>
        ))}
      </div>
      <Composer draft={draft} onDraft={onDraft} onSend={onSend} />
    </div>
  )
}

function Detail({
  post,
  draft,
  onDraft,
  onSend
}: {
  post: Post
  draft: string
  onDraft: (value: string) => void
  onSend: () => void
}) {
  return (
    <div className="min-w-0 flex-1 px-7 pt-6 pb-8">
      <div className="relative h-[230px] overflow-hidden rounded-[6px] shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
        <Cover />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 to-transparent px-5 pt-12 pb-4 text-[22px] text-white">
          {post.title}
        </div>
      </div>
      <article className="mt-4 rounded-[6px] bg-card px-6 pt-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
        {post.turns.map((turn) => (
          <TurnBlock key={turn.id} turn={turn} />
        ))}
        <Composer draft={draft} onDraft={onDraft} onSend={onSend} embedded />
      </article>
    </div>
  )
}

function TurnBlock({ turn }: { turn: Turn }) {
  return (
    <div className="mb-6">
      <div className="text-[13px] text-[#9a9a9a]">{turn.role === 'user' ? '你' : 'guai'}</div>
      <p className="mt-1 text-[15px] leading-[1.85]">{turn.text}</p>
      {turn.tools?.map((tool) => (
        <ToolBlock key={tool.name + tool.detail} name={tool.name} detail={tool.detail} body={tool.body} />
      ))}
      {turn.patch ? <Patch path={turn.patch.path} lines={turn.patch.lines} /> : null}
    </div>
  )
}

function ToolBlock({ name, detail, body }: { name: string; detail: string; body: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="my-3 overflow-hidden rounded-[6px] border border-[#e8eef1]">
      <button type="button" onClick={() => setOpen((value) => !value)} className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] text-[#8a8a8a]">
        <span className="text-[#3d7f9a]">{name}</span>
        <span className="truncate">{detail}</span>
        <span className="ml-auto">{open ? '收起' : '展开'}</span>
      </button>
      {open ? <pre className="overflow-x-auto border-t border-[#e8eef1] bg-[#f7fbfc] px-3 py-2 font-mono text-[12px] leading-6">{body}</pre> : null}
    </div>
  )
}

function Patch({ path, lines }: { path: string; lines: PatchLine[] }) {
  return (
    <div className="my-3 overflow-hidden rounded-[6px] border border-[#e8eef1]">
      <div className="border-b border-[#e8eef1] px-3 py-2 font-mono text-[12px] text-[#9a9a9a]">{path}</div>
      <pre className="overflow-x-auto bg-[#f7fbfc] px-3 py-2 font-mono text-[12px] leading-6">
        {lines.map((line, index) => (
          <div key={index} className={line.kind === 'add' ? 'bg-[#e9f8ef] text-[#1d7a45]' : line.kind === 'del' ? 'bg-[#fdecec] text-[#b34040]' : ''}>
            {line.kind === 'add' ? '+ ' : line.kind === 'del' ? '- ' : '  '}
            {line.text}
          </div>
        ))}
      </pre>
    </div>
  )
}

function Composer({
  draft,
  onDraft,
  onSend,
  embedded
}: {
  draft: string
  onDraft: (value: string) => void
  onSend: () => void
  embedded?: boolean
}) {
  return (
    <form
      className={
        embedded
          ? 'flex items-end gap-3 border-t border-[#f2f6f8] py-3'
          : 'mt-4 flex items-end gap-3 rounded-[6px] bg-card px-4 py-2.5 shadow-[0_1px_3px_rgba(0,0,0,0.05)]'
      }
      onSubmit={(event) => {
        event.preventDefault()
        onSend()
      }}
    >
      <textarea
        value={draft}
        onChange={(event) => onDraft(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault()
            onSend()
          }
        }}
        rows={1}
        placeholder="写下来…"
        className="max-h-24 min-h-[28px] flex-1 resize-none bg-transparent text-[15px] leading-7 outline-none placeholder:text-[#b0b0b0]"
      />
      <button
        type="submit"
        disabled={draft.trim() === ''}
        className="mb-0.5 h-7 shrink-0 rounded-[4px] bg-[#6aa8c2] px-4 text-[13px] text-white disabled:opacity-40"
      >
        发送
      </button>
    </form>
  )
}
