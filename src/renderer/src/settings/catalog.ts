import {
  ChartColumn,
  Database,
  Download,
  EyeOff,
  FishingHook,
  Globe,
  Keyboard,
  List,
  MessageSquareText,
  Palette,
  Plug,
  Puzzle,
  ScrollText,
  ShieldAlert,
  Sparkles,
  Terminal,
  Users,
  type LucideIcon
} from 'lucide-react'

export type SettingId =
  | 'api'
  | 'proxy'
  | 'codebase'
  | 'prompt'
  | 'personal'
  | 'headers'
  | 'mcp'
  | 'import'
  | 'skills'
  | 'subagent'
  | 'sensitive'
  | 'hooks'
  | 'theme'
  | 'terminal'
  | 'shortcuts'
  | 'privacy'
  | 'usage'
  | 'logs'

export type SettingControl = {
  id: string
  label: string
  hint?: string
  kind: 'text' | 'password' | 'select' | 'toggle' | 'textarea' | 'file'
  value: string | boolean
  placeholder?: string
  button?: string
  options?: { value: string; label: string }[]
  rows?: number
}

export type SettingSection = {
  title: string
  controls: SettingControl[]
}

export type SettingItem = {
  id: SettingId
  label: string
  icon: LucideIcon
  summary: string
  sections: SettingSection[]
}

const choice = (label: string): { value: string; label: string } => ({ value: label, label })

export const settings: SettingItem[] = [
  {
    id: 'api',
    label: 'API 设置',
    icon: Plug,
    summary: '配置服务商、模型和凭证。',
    sections: [
      {
        title: '基础',
        controls: [
          {
            id: 'api.provider',
            label: '服务商',
            kind: 'select',
            value: 'DeepSeek',
            options: [choice('DeepSeek'), choice('OpenAI'), choice('兼容接口')]
          },
          {
            id: 'api.baseUrl',
            label: '接口地址',
            kind: 'text',
            value: '',
            placeholder: 'https://api.deepseek.com'
          },
          { id: 'api.key', label: '密钥', kind: 'password', value: '', placeholder: 'sk-…' }
        ]
      },
      {
        title: '模型',
        controls: [
          { id: 'api.model', label: '主模型', kind: 'text', value: 'deepseek-chat' },
          { id: 'api.fallback', label: '备用模型', kind: 'text', value: '', placeholder: '留空则不切换' },
          { id: 'api.timeout', label: '超时（秒）', kind: 'text', value: '60' },
          { id: 'api.stream', label: '流式输出', kind: 'toggle', value: true, hint: '边生成边显示回复。' }
        ]
      }
    ]
  },
  {
    id: 'proxy',
    label: '代理设置',
    icon: Globe,
    summary: '访问模型接口时走的代理。',
    sections: [
      {
        title: '连接',
        controls: [
          { id: 'proxy.enabled', label: '使用代理', kind: 'toggle', value: false },
          {
            id: 'proxy.protocol',
            label: '协议',
            kind: 'select',
            value: 'HTTP',
            options: [choice('HTTP'), choice('SOCKS5')]
          },
          { id: 'proxy.host', label: '主机', kind: 'text', value: '127.0.0.1' },
          { id: 'proxy.port', label: '端口', kind: 'text', value: '7890' },
          { id: 'proxy.user', label: '用户名', kind: 'text', value: '', placeholder: '不需要可留空' },
          { id: 'proxy.password', label: '密码', kind: 'password', value: '' }
        ]
      },
      {
        title: '绕过',
        controls: [
          {
            id: 'proxy.bypass',
            label: '不走代理的地址',
            kind: 'textarea',
            value: 'localhost\n127.0.0.1',
            rows: 4,
            hint: '每行一个主机名。'
          }
        ]
      }
    ]
  },
  {
    id: 'codebase',
    label: '代码库设置',
    icon: Database,
    summary: '工作区索引，供会话检索当前目录。',
    sections: [
      {
        title: '索引',
        controls: [
          { id: 'code.index', label: '为工作区建立索引', kind: 'toggle', value: true },
          {
            id: 'code.embed',
            label: '嵌入模型',
            kind: 'select',
            value: '跟随主模型',
            options: [choice('跟随主模型'), choice('本地小模型')]
          },
          {
            id: 'code.ignore',
            label: '忽略规则',
            kind: 'textarea',
            value: 'node_modules\ndist\n.git',
            rows: 5,
            hint: '每行一条，写法与 gitignore 相同。'
          }
        ]
      }
    ]
  },
  {
    id: 'prompt',
    label: '系统提示词',
    icon: MessageSquareText,
    summary: '每次会话开始时附上的说明。',
    sections: [
      {
        title: '提示词',
        controls: [
          { id: 'prompt.enabled', label: '使用系统提示词', kind: 'toggle', value: true },
          {
            id: 'prompt.text',
            label: '内容',
            kind: 'textarea',
            value: '你是 guai，跑在这台电脑上的本地助手。先看工作区，再改文件。',
            rows: 8
          }
        ]
      }
    ]
  },
  {
    id: 'personal',
    label: '个性化与规则',
    icon: ScrollText,
    summary: '称呼、语言，以及这个工作区要遵守的规则。',
    sections: [
      {
        title: '偏好',
        controls: [
          { id: 'personal.name', label: '怎么称呼你', kind: 'text', value: '' },
          {
            id: 'personal.lang',
            label: '回复语言',
            kind: 'select',
            value: '中文',
            options: [choice('中文'), choice('English')]
          },
          {
            id: 'personal.length',
            label: '回答长度',
            kind: 'select',
            value: '适中',
            options: [choice('简短'), choice('适中'), choice('详细')]
          }
        ]
      },
      {
        title: '规则',
        controls: [
          {
            id: 'personal.rules',
            label: '项目规则',
            kind: 'textarea',
            value: '',
            rows: 6,
            placeholder: '例如：提交说明用英文，不要改无关文件。',
            hint: '对当前工作区生效。'
          }
        ]
      }
    ]
  },
  {
    id: 'headers',
    label: '自定义请求头',
    icon: List,
    summary: '调用模型接口时附加的请求头。',
    sections: [
      {
        title: '请求头',
        controls: [
          { id: 'headers.enabled', label: '启用', kind: 'toggle', value: false },
          {
            id: 'headers.list',
            label: '列表',
            kind: 'textarea',
            value: '',
            rows: 6,
            placeholder: 'X-Title: guai',
            hint: '每行一个，写成 名称: 值。'
          }
        ]
      }
    ]
  },
  {
    id: 'mcp',
    label: 'MCP 设置',
    icon: Puzzle,
    summary: '要挂上的 MCP 服务。',
    sections: [
      {
        title: '服务',
        controls: [
          { id: 'mcp.enabled', label: '启用 MCP', kind: 'toggle', value: false },
          {
            id: 'mcp.config',
            label: '配置',
            kind: 'textarea',
            value: '',
            rows: 8,
            placeholder: '{\n  "mcpServers": {}\n}',
            hint: 'JSON。内核接上之后才会真正启动这些服务。'
          }
        ]
      }
    ]
  },
  {
    id: 'import',
    label: '第三方配置',
    icon: Download,
    summary: '从别的工具带进模型配置。',
    sections: [
      {
        title: '导入',
        controls: [
          {
            id: 'import.file',
            label: '配置文件',
            kind: 'file',
            value: '',
            button: '选择文件',
            hint: '支持 JSON。选中后先记在这里，还不会覆盖正在使用的接口。'
          },
          { id: 'import.replace', label: '导入后改用这份配置', kind: 'toggle', value: false }
        ]
      }
    ]
  },
  {
    id: 'skills',
    label: 'Skills 设置',
    icon: Sparkles,
    summary: '会话可以调用的技能目录。',
    sections: [
      {
        title: '加载',
        controls: [
          { id: 'skills.autoload', label: '启动时加载技能', kind: 'toggle', value: true },
          { id: 'skills.dir', label: '技能目录', kind: 'text', value: '', placeholder: '例如 D:\\Work\\guai\\skills' },
          { id: 'skills.project', label: '允许工作区里的技能', kind: 'toggle', value: true, hint: '读取当前目录下的 SKILL.md。' }
        ]
      }
    ]
  },
  {
    id: 'subagent',
    label: '子代理设置',
    icon: Users,
    summary: '把一部分工作交给同时跑的子代理。',
    sections: [
      {
        title: '并发',
        controls: [
          { id: 'sub.enabled', label: '允许子代理', kind: 'toggle', value: false },
          {
            id: 'sub.limit',
            label: '同时运行的上限',
            kind: 'select',
            value: '2',
            options: [choice('1'), choice('2'), choice('3'), choice('4')]
          },
          { id: 'sub.model', label: '子代理使用的模型', kind: 'text', value: '', placeholder: '留空则跟随主模型' }
        ]
      }
    ]
  },
  {
    id: 'sensitive',
    label: '敏感命令',
    icon: ShieldAlert,
    summary: '这些命令在执行前会先停下来问你。',
    sections: [
      {
        title: '确认',
        controls: [
          { id: 'sensitive.ask', label: '执行前先问我', kind: 'toggle', value: true },
          {
            id: 'sensitive.rules',
            label: '规则',
            kind: 'textarea',
            value: 'rm -rf\ngit push --force\nmkfs',
            rows: 6,
            hint: '每行一条。命令里出现这些字样就会拦住。'
          }
        ]
      }
    ]
  },
  {
    id: 'hooks',
    label: 'Hooks 设置',
    icon: FishingHook,
    summary: '会话开始和结束时要跑的命令。',
    sections: [
      {
        title: '命令',
        controls: [
          { id: 'hooks.enabled', label: '启用', kind: 'toggle', value: false },
          { id: 'hooks.start', label: '会话开始', kind: 'textarea', value: '', rows: 3, placeholder: '每行一条命令' },
          { id: 'hooks.end', label: '会话结束', kind: 'textarea', value: '', rows: 3, placeholder: '每行一条命令' }
        ]
      }
    ]
  },
  {
    id: 'theme',
    label: '主题设置',
    icon: Palette,
    summary: '窗口的外观。',
    sections: [
      {
        title: '外观',
        controls: [
          {
            id: 'theme.mode',
            label: '主题',
            kind: 'select',
            value: '浅色',
            options: [choice('浅色'), choice('跟随系统')]
          },
          {
            id: 'theme.size',
            label: '正文字号',
            kind: 'select',
            value: '15',
            options: [choice('14'), choice('15'), choice('16')]
          },
          { id: 'theme.mono', label: '代码字体', kind: 'text', value: 'Cascadia Code' }
        ]
      }
    ]
  },
  {
    id: 'terminal',
    label: '终端设置',
    icon: Terminal,
    summary: '会话里打开的终端。',
    sections: [
      {
        title: '显示',
        controls: [
          { id: 'term.font', label: '字体', kind: 'text', value: 'Cascadia Code' },
          {
            id: 'term.size',
            label: '字号',
            kind: 'select',
            value: '13',
            options: [choice('12'), choice('13'), choice('14')]
          },
          {
            id: 'term.cursor',
            label: '光标',
            kind: 'select',
            value: '方块',
            options: [choice('方块'), choice('竖线'), choice('下划线')]
          },
          { id: 'term.scrollback', label: '滚动行数', kind: 'text', value: '1000' }
        ]
      }
    ]
  },
  {
    id: 'shortcuts',
    label: '快捷键',
    icon: Keyboard,
    summary: '窗口里的按键。',
    sections: [
      {
        title: '按键',
        controls: [
          { id: 'key.search', label: '搜索', kind: 'text', value: 'Ctrl + K' },
          { id: 'key.new', label: '新会话', kind: 'text', value: 'Ctrl + N' },
          { id: 'key.settings', label: '打开设置', kind: 'text', value: 'Ctrl + ,' },
          { id: 'key.close', label: '关闭浮层', kind: 'text', value: 'Esc' }
        ]
      }
    ]
  },
  {
    id: 'privacy',
    label: '隐私设置',
    icon: EyeOff,
    summary: '日志和工具输出里要藏起来的内容。',
    sections: [
      {
        title: '过滤',
        controls: [
          { id: 'privacy.keys', label: '日志里隐藏密钥', kind: 'toggle', value: true },
          { id: 'privacy.tools', label: '发送前过滤工具输出', kind: 'toggle', value: false },
          { id: 'privacy.local', label: '会话只留在这台电脑', kind: 'toggle', value: true }
        ]
      }
    ]
  },
  {
    id: 'usage',
    label: '用量统计',
    icon: ChartColumn,
    summary: '模型调用的计数。',
    sections: [
      {
        title: '统计',
        controls: [
          { id: 'usage.show', label: '在顶栏显示用量', kind: 'toggle', value: false },
          {
            id: 'usage.range',
            label: '统计范围',
            kind: 'select',
            value: '今天',
            options: [choice('本次会话'), choice('今天'), choice('全部')]
          }
        ]
      }
    ]
  },
  {
    id: 'logs',
    label: '系统日志',
    icon: ScrollText,
    summary: '本机写下的运行日志。',
    sections: [
      {
        title: '记录',
        controls: [
          {
            id: 'logs.level',
            label: '级别',
            kind: 'select',
            value: '信息',
            options: [choice('错误'), choice('警告'), choice('信息'), choice('调试')]
          },
          {
            id: 'logs.days',
            label: '保留天数',
            kind: 'select',
            value: '7',
            options: [choice('3'), choice('7'), choice('30')]
          },
          { id: 'logs.dir', label: '日志目录', kind: 'text', value: '', placeholder: '内核接上之后显示实际路径' }
        ]
      }
    ]
  }
]

export function initialSettingValues(): Record<string, string | boolean> {
  const values: Record<string, string | boolean> = {}
  for (const item of settings) {
    for (const section of item.sections) {
      for (const control of section.controls) values[control.id] = control.value
    }
  }
  return values
}
