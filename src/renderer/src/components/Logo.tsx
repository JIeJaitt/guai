// Header mark. A split kite: the cover's kite reduced to two faces and a tail bow.
// The gap down the middle is the spine, so it still reads at header size.
export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path fill="#f4cfc8" d="M14.6 3 5.5 14.2 14.6 23.2Z" />
      <path fill="#e57b73" d="M17.4 3 26.5 14.2 17.4 23.2Z" />
      <path fill="#e57b73" d="M16 25.2 18.1 27.3 16 29.4 13.9 27.3Z" />
    </svg>
  )
}
