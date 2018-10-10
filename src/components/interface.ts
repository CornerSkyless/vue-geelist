export interface GeelistOption<T> {
    rowKey:string | number; // 唯一键
    showColumnFilter?:boolean;
    columnOptions:GeelistColumnOption<T>[],
}

export interface GeelistColumnOption<T> {
    label:string; // 标题
    description?:string; // 列简介
    index?:string; // 索引
    style?:any;
    wrap?:boolean; // 强制换行
    tooltip?:boolean; // 文字提示
    tooltipText?(row:T):string; // 文字提示内容
    filterText?(row:T):string; // 筛选时所表现的文本内容
}