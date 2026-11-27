const levels = ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127']
const weekdays = ['日', '一', '二', '三', '四', '五', '六']

type Cell = {
  key: string
  label: string
  count: number
}

type Week = {
  label: string
  cells: Cell[]
}

function day(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function stamp(date: Date): number {
  return date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate()
}

function shift(date: Date, days: number): Date {
  const next = new Date(date)
  next.setDate(next.getDate() + days)
  return next
}

function marks(end: Date): Map<number, number> {
  const counts = new Map<number, number>()
  for (const [offset, count] of [
    [3, 1],
    [18, 1],
    [46, 1],
    [67, 2],
    [98, 1],
    [140, 1]
  ] as const) {
    counts.set(stamp(shift(end, -offset)), count)
  }
  return counts
}

function monthLabels(weeks: Week[]): { text: string; left: number }[] {
  const labels: { text: string; left: number }[] = []
  let last = -100
  weeks.forEach((week, index) => {
    if (!week.label) return
    const left = Math.max(index * 13, last + 24)
    labels.push({ text: week.label, left })
    last = left
  })
  return labels
}

function buildWeeks(today: Date): Week[] {
  const end = day(today)
  const start = new Date(end)
  start.setMonth(start.getMonth() - 9)
  const cursor = day(start)
  cursor.setDate(cursor.getDate() - cursor.getDay())
  const last = day(end)
  last.setDate(last.getDate() + (6 - last.getDay()))
  const counted = marks(end)
  const weeks: Week[] = []

  while (cursor <= last) {
    const cells: Cell[] = []
    let label = ''
    for (let index = 0; index < 7; index += 1) {
      const current = new Date(cursor)
      const key = stamp(current)
      const count = counted.get(key) ?? 0
      if (current >= start && current <= end && (current.getDate() === 1 || current.getTime() === start.getTime())) {
        label = `${current.getMonth() + 1}月`
      }
      cells.push({
        key: String(key),
        label: `${current.getMonth() + 1}月${current.getDate()}日：${count}`,
        count
      })
      cursor.setDate(cursor.getDate() + 1)
    }
    weeks.push({ label, cells })
  }
  return weeks
}

export function Heatmap() {
  const weeks = buildWeeks(new Date())

  return (
    <div>
      <h2 className="text-[15px] font-bold text-ink">动态日历</h2>
      <p className="mt-1 text-[12px] text-[#9a9a9a]">近 10 个月的会话</p>
      <div className="mt-3 flex">
        <div className="mt-4 mr-1.5 flex flex-col gap-0.5 text-[11px] leading-[11px] text-[#9aa0a6]">
          {weekdays.map((name) => (
            <span key={name} className="flex h-[11px] items-center">
              {name}
            </span>
          ))}
        </div>
        <div>
          <div className="relative h-4">
            {monthLabels(weeks).map((item) => (
              <span key={item.text} className="absolute top-0 text-[11px] leading-4 whitespace-nowrap text-[#9aa0a6]" style={{ left: item.left }}>
                {item.text}
              </span>
            ))}
          </div>
          <div className="flex gap-0.5">
            {weeks.map((week) => (
              <div key={week.cells[0]?.key} className="flex flex-col gap-0.5">
                {week.cells.map((cell) => (
                  <span
                    key={cell.key}
                    title={cell.label}
                    className="block h-[11px] w-[11px]"
                    style={{ background: levels[Math.min(cell.count, levels.length - 1)] }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
