import { Eye } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { latestComments, posts, type Post } from '../sample'

type FeatherName = 'thumbs-up' | 'message-square' | 'gift'

// The three tabs on ihewro.com's right sidebar, in the same order, with the same Feather icons.
// Icon paths are copied from the site's function.js.
const FEATHER_PATHS: Record<FeatherName, ReactNode> = {
  'thumbs-up': <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />,
  'message-square': <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
  gift: (
    <>
      <polyline points="20 12 20 22 4 22 4 12" />
      <rect x="2" y="7" width="20" height="5" />
      <line x1="12" y1="22" x2="12" y2="7" />
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </>
  )
}

const TABS: { name: FeatherName; label: string }[] = [
  { name: 'thumbs-up', label: '热门文章' },
  { name: 'message-square', label: '最新评论' },
  { name: 'gift', label: '随机文章' }
]

export function SideTabs() {
  const [active, setActive] = useState(0)
  const [randomPosts] = useState(() => shuffle(posts))

  return (
    <section>
      <div className="relative rounded-[5px] bg-[#e9f4f7]">
        <div role="tablist" className="relative flex">
          {TABS.map((tab, index) => (
            <button
              key={tab.name}
              type="button"
              role="tab"
              title={tab.label}
              aria-selected={active === index}
              onClick={() => setActive(index)}
              className={`relative z-10 flex flex-1 justify-center py-[3px] ${
                active === index ? 'cursor-default text-[#555]' : 'cursor-pointer text-ink'
              }`}
            >
              <span className="mb-[3px] flex">
                <svg
                  width="15"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {FEATHER_PATHS[tab.name]}
                </svg>
              </span>
              <span className="sr-only">{tab.label}</span>
            </button>
          ))}
        </div>
        {/* Sliding highlight behind the active tab, same geometry and easing as the site's .navs-slider-bar */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-[2px] w-[33%] rounded-[5px] bg-card"
          style={{
            left: active === 0 ? '2px' : '0px',
            height: 'calc(100% - 4px)',
            transform: `translateX(${active * 100}%)`,
            transition: 'transform 0.3s cubic-bezier(.645,.045,.355,1)'
          }}
        />
      </div>
      <div className="px-[15px] pt-[10px] pb-[15px]">
        {active === 0 ? <HotList /> : active === 1 ? <CommentList /> : <PostList list={randomPosts} />}
      </div>
    </section>
  )
}

function HotList() {
  const hot = [...posts].sort((a, b) => Number(b.views) - Number(a.views))
  return <PostList list={hot} />
}

function PostList({ list }: { list: Post[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {list.slice(0, 4).map((post) => (
        <li key={post.id} className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[13px] shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            {post.title.slice(0, 1)}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[13px] leading-5">{post.title}</span>
            <span className="mt-0.5 flex items-center gap-1 text-[12px] text-[#a0a0a0]">
              <Eye size={12} />
              {post.views}
            </span>
          </span>
        </li>
      ))}
    </ul>
  )
}

function CommentList() {
  return (
    <ul className="flex flex-col gap-3">
      {latestComments.map((comment) => {
        const post = posts.find((item) => item.id === comment.postId)
        return (
          <li key={comment.id} className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[13px] shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
              {comment.author.slice(0, 1)}
            </span>
            <span className="min-w-0">
              <span className="line-clamp-2 block text-[13px] leading-5">{comment.text}</span>
              <span className="mt-0.5 block truncate text-[12px] text-[#a0a0a0]">
                {post?.title} · {comment.date}
              </span>
            </span>
          </li>
        )
      })}
    </ul>
  )
}

// Random order is picked once per app load, like the site's server-rendered random list.
function shuffle<T>(items: T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = copy[i]
    copy[i] = copy[j]
    copy[j] = tmp
  }
  return copy
}
