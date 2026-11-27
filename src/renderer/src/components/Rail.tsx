import { TerminalSquare } from 'lucide-react'
import { useState } from 'react'
import { changedFiles, initialTodos } from '../sample'
import { SideTabs } from './SideTabs'

export function Rail() {
  const [todos, setTodos] = useState(initialTodos)
  const [terminalOpen, setTerminalOpen] = useState(false)

  return (
    <aside className="w-[240px] shrink-0 pt-5 pr-[13px] pb-8 pl-[13px]">
      <SideTabs />

      <h2 className="mt-7 mb-3 flex items-center gap-2 text-[14px] text-ink">
        <span className="inline-block h-3.5 w-1 rounded-full bg-[#7eb8cc]" />
        时光机
      </h2>
      <ol className="relative ml-[7px] border-l border-[#c5dbe3]">
        {todos.map((todo) => (
          <li key={todo.id} className="relative mb-4 pl-4">
            <button
              type="button"
              onClick={() => setTodos((list) => list.map((item) => (item.id === todo.id ? { ...item, done: !item.done } : item)))}
              className="block w-full text-left"
            >
              <span className={`absolute top-1.5 -left-[5px] h-[9px] w-[9px] rounded-full border-2 border-[#7eb8cc] ${todo.done ? 'bg-[#7eb8cc]' : 'bg-sky'}`} />
              <span className="block text-[12px] text-[#a0a0a0]">{todo.time}</span>
              <span className={`mt-0.5 block text-[13px] leading-6 ${todo.done ? 'text-[#b0b0b0] line-through' : ''}`}>{todo.text}</span>
            </button>
          </li>
        ))}
      </ol>

      <h2 className="mb-2 text-[14px]">本次改动</h2>
      <ul className="flex flex-col gap-1 text-[13px]">
        {changedFiles.map((file) => (
          <li key={file.path} className="flex justify-between gap-2">
            <span className="min-w-0 truncate">{file.path.split('/').pop()}</span>
            <span className="shrink-0 font-mono text-[12px]">
              <span className="text-[#1d7a45]">+{file.add}</span> <span className="text-[#b34040]">-{file.del}</span>
            </span>
          </li>
        ))}
      </ul>

      <button type="button" onClick={() => setTerminalOpen((open) => !open)} className="mt-5 inline-flex items-center gap-2 text-[13px] text-[#8a8a8a]">
        <TerminalSquare size={14} strokeWidth={1.75} />
        {terminalOpen ? '收起终端' : '终端'}
      </button>
      {terminalOpen ? (
        <pre className="mt-2 overflow-x-auto rounded-[6px] bg-[#243038] px-3 py-2 font-mono text-[12px] leading-6 text-[#d7e2e8]">内核还没接上，终端稍后可用。</pre>
      ) : null}
    </aside>
  )
}
