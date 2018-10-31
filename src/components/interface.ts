export interface GeelistOption<T> {
    rowKey: string; // 唯一键
    showColumnFilter?: boolean;
    emptyText?: string;
    columnOptions: GeelistColumnOption<T>[],
}

export interface GeelistTagOption {
    case?: any, // 当值为这个时
    in?: any[], // 当值在这些里面时
    text?: string, // 对应的文字
    type?: string, // 标签类型
    color?: string // 自定义颜色
}

export interface GeelistColumnOption<T> {
    label: string; // 标题
    description?: string; // 列简介
    index?: string; // 索引
    content?(row: T): string; // 自定义文字内容
    style?: any; // 默认样式
    slot?: string;
    wrap?: boolean; // 强制换行
    tooltip?: boolean; // 文字提示
    emptyText?: string; // 空值提示
    tooltipText?(row: T): string; // 文字提示内容
    filterText?(row: T): string; // 筛选时所表现的文本内容
    bool?: {
        yText: string; // 为 true 时的值
        nText: string; // 为 false 时的值
    },
    tags?: GeelistTagOption[]
}