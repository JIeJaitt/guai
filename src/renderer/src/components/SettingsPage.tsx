import { useRef, useState } from 'react'
import { initialSettingValues, settings, type SettingId } from '../settings/catalog'

type Values = Record<string, string | boolean>

export function SettingsPage({ settingId }: { settingId: SettingId }) {
  const [values, setValues] = useState<Values>(initialSettingValues)
  const fileRef = useRef<HTMLInputElement>(null)
  const item = settings.find((entry) => entry.id === settingId) ?? settings[0]

  function setValue(id: string, value: string | boolean) {
    setValues((current) => ({ ...current, [id]: value }))
  }

  return (
    <div className="min-w-0 flex-1 px-8 pt-6 pb-10">
      <h1 className="text-[22px] font-bold">{item.label}</h1>
      <p className="mt-1 text-[14px] text-[#7f97a3]">{item.summary}</p>
      {item.id === 'api' ? <ApiSummary values={values} /> : null}
      <div className="mt-5 flex max-w-[720px] flex-col gap-4">
        {item.sections.map((section) => (
          <section key={section.title} className="rounded-[6px] bg-card px-5 py-4 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
            <h2 className="text-[13px] text-[#7f97a3]">{section.title}</h2>
            <div className="mt-3 flex flex-col gap-4">
              {section.controls.map((control) => {
                const value = values[control.id]
                if (control.kind === 'toggle') {
                  const on = value === true
                  return (
                    <div key={control.id} className="flex items-center justify-between gap-4">
                      <div>
                        <div className="text-[14px]">{control.label}</div>
                        {control.hint ? <div className="mt-0.5 text-[12px] leading-5 text-[#8aa0aa]">{control.hint}</div> : null}
                      </div>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={on}
                        aria-label={control.label}
                        onClick={() => setValue(control.id, !on)}
                        className={`relative h-5 w-9 shrink-0 rounded-full ${on ? 'bg-[#6aa8c2]' : 'bg-[#d5e0e6]'}`}
                      >
                        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white ${on ? 'left-4' : 'left-0.5'}`} />
                      </button>
                    </div>
                  )
                }
                return (
                  <label key={control.id} className="block">
                    <span className="text-[14px]">{control.label}</span>
                    {control.hint ? <span className="mt-0.5 block text-[12px] leading-5 text-[#8aa0aa]">{control.hint}</span> : null}
                    {control.kind === 'select' ? (
                      <select
                        value={String(value ?? '')}
                        onChange={(event) => setValue(control.id, event.target.value)}
                        className="mt-2 h-9 w-full rounded-[6px] border border-[#e4eef2] bg-[#f7fbfc] px-3 text-[14px] outline-none"
                      >
                        {control.options?.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : null}
                    {control.kind === 'textarea' ? (
                      <textarea
                        value={String(value ?? '')}
                        rows={control.rows ?? 4}
                        placeholder={control.placeholder}
                        onChange={(event) => setValue(control.id, event.target.value)}
                        className="mt-2 w-full resize-y rounded-[6px] border border-[#e4eef2] bg-[#f7fbfc] px-3 py-2 text-[14px] leading-6 outline-none"
                      />
                    ) : null}
                    {control.kind === 'text' || control.kind === 'password' ? (
                      <input
                        type={control.kind === 'password' ? 'password' : 'text'}
                        value={String(value ?? '')}
                        placeholder={control.placeholder}
                        onChange={(event) => setValue(control.id, event.target.value)}
                        className="mt-2 h-9 w-full rounded-[6px] border border-[#e4eef2] bg-[#f7fbfc] px-3 text-[14px] outline-none"
                      />
                    ) : null}
                    {control.kind === 'file' ? (
                      <div className="mt-2 flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => fileRef.current?.click()}
                          className="h-8 rounded-[6px] bg-[#e7f2f6] px-3 text-[13px] text-ink"
                        >
                          {control.button}
                        </button>
                        <span className="text-[13px] text-[#8aa0aa]">{String(value || '还没有选择文件')}</span>
                        <input
                          ref={fileRef}
                          type="file"
                          accept="application/json,.json"
                          className="hidden"
                          onChange={(event) => {
                            const file = event.target.files?.[0]
                            setValue(control.id, file ? file.name : '')
                          }}
                        />
                      </div>
                    ) : null}
                  </label>
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

function ApiSummary({ values }: { values: Values }) {
  const cards = [
    { label: '配置项', value: '1' },
    { label: '接口地址', value: String(values['api.baseUrl'] || '还没填写') },
    { label: '主模型', value: String(values['api.model'] || '—') }
  ]
  return (
    <div className="mt-5 grid max-w-[720px] grid-cols-3 gap-3">
      {cards.map((card) => (
        <div key={card.label} className="rounded-[6px] bg-card px-4 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
          <div className="truncate text-[14px]">{card.value}</div>
          <div className="mt-1 text-[12px] text-[#8aa0aa]">{card.label}</div>
        </div>
      ))}
    </div>
  )
}
