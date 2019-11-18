export interface GeelistOption<T> {
  rowKey: string // 唯一键
  showColumnFilter?: boolean;
  disableGlobalSearch?: boolean;
  hideHeader?:boolean;
  emptyText?: string
  pageSize?: number
  pageSizes?: number[]
  columnOptions: GeelistColumnOption<T>[]
  exportExcel?: string
  disablePagination?: boolean
  checkbox?: boolean,
  classNames?: ((row: T) => string[]) | string[] // 自定义背景
}

export interface GeelistTagOption {
  case?: any // 当值为这个时
  in?: any[] // 当值在这些里面时
  text?: string // 对应的文字
  type?: string // 标签类型
  color?: string // 自定义颜色
}

export interface GeelistActionOption<T> {
  handler: ((row: T) => any) | string
  text: ((row: T) => string) | string // 按钮上的文字
  type?: string // el-button 的 type 属性
  plain?: boolean // el-button 的 plain 属性
  round?: string // el-button 的 round 属性
  circle?: string // el-button 的 circle 属性
  disabled?: ((row: T) => boolean) | boolean // el-button 的 disabled 属性
  size?: string // el-button 的 size 属性
}

export interface GeelistColumnOption<T> {
  label: string // 标题
  description?: string // 列简介
  content?: ((row: T) => string) | string // 自定义文字内容
  sumUp?: (row: T) => number
  classNames?: ((row: T) => string[]) | string[] // 自定义背景
  style?: any // 默认样式
  slot?: string
  wrap?: boolean // 强制换行
  tooltip?: boolean // 文字提示
  emptyText?: string // 空值提示
  tooltipText?(row: T): string // 文字提示内容, 默认为 content 的内容
  filterText?(row: T): string // 筛选时所表现的文本内容, 默认为 content 的内容
  bool?: {
    yText: string // 为 true 时的值
    nText: string // 为 false 时的值
  }
  tags?: GeelistTagOption[]
  actions?: GeelistActionOption<T>[]
  input?: boolean
  select?: boolean
  defaultHide?: boolean
  rowspan?: string
  colspan?: string,
  sort?: ((a: T,b: T) => number) | boolean // 自定义文字内容
}
type GeelistFilterColumnType = "None" | "Input" | "Select"
export interface GeelistFilterColumn {
  type: GeelistFilterColumnType
  value: string
  values: string[]
  selectOptions: string[]
}
