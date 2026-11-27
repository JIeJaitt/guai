export type PatchLine = {
  kind: 'ctx' | 'add' | 'del'
  text: string
}

export type ToolCall = {
  name: string
  detail: string
  body: string
}

export type Turn = {
  id: string
  role: 'user' | 'guai'
  text: string
  tools?: ToolCall[]
  patch?: {
    path: string
    lines: PatchLine[]
  }
}

export type Post = {
  id: string
  title: string
  excerpt: string
  date: string
  comments: string
  views: string
  turns: Turn[]
}

export const sampleTitle = '把登录超时的提示改清楚'

const loginTurns: Turn[] = [
  {
    id: 'u1',
    role: 'user',
    text: '登录超过 15 分钟没有任何提示，用户不知道要重新登录。把文案改成能看懂的一句，并在超时后回到登录页。'
  },
  {
    id: 'g1',
    role: 'guai',
    text: '超时后现在只把 token 清掉，页面停在原地。我补了一句提示，并跳回登录页。',
    tools: [
      {
        name: 'Read',
        detail: 'src/auth/session.ts',
        body: 'export function onExpired() {\n  clearToken()\n}'
      }
    ],
    patch: {
      path: 'src/auth/session.ts',
      lines: [
        { kind: 'ctx', text: 'export function onExpired() {' },
        { kind: 'del', text: '  clearToken()' },
        { kind: 'add', text: '  clearToken()' },
        { kind: 'add', text: '  toast("登录已过期，请重新登录")' },
        { kind: 'add', text: '  location.assign("/login")' },
        { kind: 'ctx', text: '}' }
      ]
    }
  }
]

export const posts: Post[] = [
  {
    id: 'p1',
    title: sampleTitle,
    excerpt: '超时后回到登录页，并把提示写成一句人话。现在只清 token，页面停在原地。',
    date: '刚刚',
    comments: '2 条',
    views: '128',
    turns: loginTurns
  },
  {
    id: 'p2',
    title: '对账脚本看了一眼',
    excerpt: '日对账和月对账还是两条任务。先把差异写进同一张表，再决定要不要合并入口。',
    date: '昨天',
    comments: '暂无',
    views: '86',
    turns: [
      {
        id: 'p2u',
        role: 'user',
        text: '日对账和月对账的差异，先列出来，先别改代码。'
      },
      {
        id: 'p2g',
        role: 'guai',
        text: '两边都读同一批订单，月对账多了跨月的退款。入口先保持两个。'
      }
    ]
  },
  {
    id: 'p3',
    title: '工作区还没打开',
    excerpt: '当前目录是 D:\\Work\\guai。内核接上之后，从这里打开要交给它的文件夹。',
    date: '11 月 26 日',
    comments: '暂无',
    views: '41',
    turns: [
      {
        id: 'p3g',
        role: 'guai',
        text: '工作区还是空的。选一个文件夹之后，读文件和改文件都会落在那里。'
      }
    ]
  },
  {
    id: 'p4',
    title: '技能列表是空的',
    excerpt: '仓库里的 SKILL.md 之后会列在这里。现在没有任何一条技能。',
    date: '11 月 25 日',
    comments: '暂无',
    views: '23',
    turns: [
      {
        id: 'p4g',
        role: 'guai',
        text: '还没有技能。放进仓库的 SKILL.md 会在这里出现。'
      }
    ]
  }
]

export type CommentItem = {
  id: string
  author: string
  text: string
  postId: string
  date: string
}

// Placeholder comments for the "最新评论" tab. Replace with real data later.
export const latestComments: CommentItem[] = [
  { id: 'c1', author: 'guai', text: '超时之后，没发出去的内容要不要先存下来？', postId: 'p1', date: '刚刚' },
  { id: 'c2', author: '你', text: '对账入口先别合并，等差异列完再说。', postId: 'p2', date: '昨天' },
  { id: 'c3', author: 'guai', text: '工作区选好以后，读写都会落在那个文件夹里。', postId: 'p3', date: '11 月 26 日' }
]

export const changedFiles = [
  { path: 'src/auth/session.ts', add: 3, del: 1 },
  { path: 'src/pages/login.tsx', add: 4, del: 0 }
]

export const initialTodos = [
  { id: 't1', text: '找到超时判断', time: '刚刚', done: true },
  { id: 't2', text: '改提示文案', time: '刚刚', done: false },
  { id: 't3', text: '超时后回到登录页', time: '昨天', done: false }
]
