<template>
  <div>
    <div class="geelist-header">
      <div>
        <el-input
          size="mini"
          style="width:250px"
          v-model="searchParams.keyword"
          placeholder="输入关键词搜索"
        ></el-input>
      </div>
      <div v-if="option.exportExcel">
        <el-button size="mini" @click="exportCsv">导出 Excel</el-button>
      </div>
    </div>
    <table class="geelist-table">
      <thead>
        <tr>
          <th
            v-for="(column,i) in displayColumns"
            :key="column.label"
            :style="column.style"
            :rowspan="filterColunmList[i].type==='None' ? 2 : 1"
          >
            {{column.label}}
            <el-tooltip
              v-if="column.description"
              effect="dark"
              placement="bottom"
              :content="column.description"
            >
              <i class="el-icon-question"></i>
            </el-tooltip>
          </th>
        </tr>
        <tr>
          <th v-for="(column,i) in displayFilterThList" :key="column.label">
            <el-input
              size="mini"
              v-if="filterColunmList[i].type==='Input'"
              v-model="filterColunmList[i].value"
              placeholder="检索"
            ></el-input>
            <el-popover
              v-if="filterColunmList[i].type==='Select'"
              placement="bottom"
              width="240"
              trigger="click"
            >
              <el-checkbox-group v-model="filterColunmList[i].values">
                <el-checkbox
                  v-for="option in filterColunmList[i].selectOptions"
                  :key="option"
                  :label="option"
                  style="margin-left:0;margin-right:15px"
                ></el-checkbox>
              </el-checkbox-group>
              <a
                slot="reference"
                class="select-span"
                :class="{'text-blue':filterColunmList[i].values.length>0}"
              >
                <i class="el-icon-caret-bottom"></i>
                筛选
              </a>
            </el-popover>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in displayList" :key="row[option.rowKey]">
          <td v-for="column in displayColumns" :key="column.label" :style="column.style">
            <el-tooltip effect="dark" placement="bottom-start" v-if="column.tooltip">
              <div slot="content" style="max-width: 350px">{{getToolTipContent(row,column)}}</div>
              <span>{{getContent(row,column)}}</span>
            </el-tooltip>
            <el-tag
              v-if="column.tags"
              :type="getTagOption(row,column).type"
              :color="getTagOption(row,column).color"
            >{{getContent(row,column)}}</el-tag>
            <slot v-if="column.slot" :name="column.slot" :row="row"></slot>
            <el-button
              v-for="action in column.actions || []"
              :key="getActionXXX(row,action,'text')"
              :type="getActionXXX(row,action,'type')"
              :plain="getActionXXX(row,action,'plain')"
              :circle="getActionXXX(row,action,'circle')"
              :disabled="getActionXXX(row,action,'disabled')"
              :size="getActionXXX(row,action,'size')"
              @click="doAction(row,action)"
            >{{getActionXXX(row,action,'text')}}</el-button>
            <span
              v-if="!column.tooltip && !column.tags && !column.slot && !column.actions"
            >{{getContent(row,column)}}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <div style="margin:10px;text-align:center" v-if="!option.disablePagination">
      <el-pagination
        background
        :current-page.sync="searchParams.currentPage"
        :page-sizes="[5, 10, 20, 50]"
        :page-size.sync="searchParams.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="filterList.length"
      ></el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import {
  GeelistColumnOption,
  GeelistOption,
  GeelistTagOption,
  GeelistActionOption,
  GeelistFilterColumn
} from "./interface";
const CsvExportor = require("csv-exportor");
function IndexByIndex(obj: any, indexes = ""): string | boolean {
  let levels = indexes.split(".");
  if (levels.length === 0) return "";
  const index = levels[0];
  levels.splice(0, 1);
  if (!obj.hasOwnProperty(index)) return "";
  else if (levels.length === 0) return obj[index];
  else {
    indexes = levels.join(".");
    obj = obj[index];
    return IndexByIndex(obj, indexes);
  }
}

@Component({
  name: "Geelist"
})
export default class Geelist extends Vue {
  @Prop({ required: true, type: Array })
  private list!: any[];
  @Prop({ required: true, type: Object })
  private option!: GeelistOption<any>;

  private filterColunmList: GeelistFilterColumn[] = [];

  searchParams = {
    keyword: "",
    currentPage: 1,
    pageSize: this.option.pageSize || 10
  };

  @Watch("option", { deep: true })
  optionHandler() {
    this.initOption();
  }

  @Watch("list", { deep: true })
  listHandler() {
    this.initOption();
  }

  // 获取原始字段值
  getRawContent(
    row: any,
    columnOption: GeelistColumnOption<any>
  ): string | boolean | number {
    if (typeof columnOption.content === "string") {
      if (IndexByIndex(row, columnOption.content) === false) return false;
      return (
        IndexByIndex(row, columnOption.content) ||
        this.getEmptyMessage(columnOption)
      );
    }
    if (typeof columnOption.content === "function")
      return columnOption.content(row);
    return "";
  }

  getActionXXX(row: any, actionOption: any, XXX: string): string {
    if (typeof actionOption[XXX] === "function") return actionOption[XXX](row);
    else return actionOption[XXX];
  }

  doAction(row: any, actionOption: GeelistActionOption<any>) {
    if (typeof actionOption.handler === "function") actionOption.handler(row);
    else this.$emit(actionOption.handler, row);
  }

  // 获取展示的字段内容
  getContent(row: any, columnOption: GeelistColumnOption<any>): string {
    const rawContent = this.getRawContent(row, columnOption);
    if (columnOption.tags) {
      const tagOption = this.getTagOption(row, columnOption);
      if (tagOption && tagOption.text) return tagOption.text;
    }
    if (columnOption.bool) {
      return rawContent ? columnOption.bool.yText : columnOption.bool.nText;
    }
    if (rawContent === false) return "false";
    if (rawContent === true) return "true";
    if (typeof rawContent === "number") return rawContent.toFixed();
    return rawContent || this.getEmptyMessage(columnOption);
  }

  /**
   * 找到当前列对应的标签选项
   */
  getTagOption(
    row: any,
    columnOption: GeelistColumnOption<any>
  ): GeelistTagOption {
    if (!columnOption.tags) throw new Error("columnOption.tags is required");
    const rawContent = this.getRawContent(row, columnOption);
    let tagOption = columnOption.tags.find(
      (tag: GeelistTagOption) =>
        !!(tag.case === rawContent) || !!(tag.in && tag.in.includes(rawContent))
    );
    if (!tagOption) {
      const defaultTagOption = columnOption.tags.find(
        tag => !tag.case && !tag.in
      );
      if (!defaultTagOption)
        throw new Error("Could not find tag option or default tag option");
      return defaultTagOption;
    }
    return tagOption;
  }

  getToolTipContent(
    row: any,
    columnOption: GeelistColumnOption<any>
  ): string | boolean {
    if (columnOption.tooltipText) {
      return columnOption.tooltipText(row);
    } else {
      return this.getContent(row, columnOption);
    }
  }

  getEmptyMessage(columnOption: GeelistColumnOption<any>): string {
    if (columnOption.emptyText) return columnOption.emptyText;
    else if (this.option.emptyText) {
      return this.option.emptyText;
    } else return "-";
  }

  exportCsv() {
    const header = [];
    for (const column of this.option.columnOptions) {
      if (!column.actions) header.push(column.label);
    }
    const tableData: string[][] = [];
    for (const row of this.list) {
      const data = [];
      for (const column of this.option.columnOptions) {
        if (!column.actions) data.push(this.getContent(row, column));
      }
      tableData.push(data);
    }
    CsvExportor.downloadCsv(
      tableData,
      { header },
      this.option.exportExcel + ".csv"
    );
  }

  get displayColumns(): GeelistColumnOption<any>[] {
    return this.option.columnOptions.map((co: GeelistColumnOption<any>) => {
      const style: any = co.style || {};
      if (co.wrap) {
        style["text-overflow"] = "inherit";
        style["overflow"] = "auto";
        style["white-space"] = "normal";
      }
      co.style = style;
      return co;
    });
  }

  get filterList(): any[] {
    return this.list
      .filter(row => {
        const keyword = this.searchParams.keyword.trim();
        let keywordFound = false;
        for (const column of this.displayColumns) {
          if (keyword && !keywordFound) {
            try {
              if (this.getContent(row, column).includes(keyword))
                keywordFound = true;
            } catch (e) {
              console.log(this.getContent(row, column));
            }
          }
        }
        if (keyword && !keywordFound) return false;
        return true;
      })
      .filter(row => {
        for (let i = 0; i < this.displayColumns.length; i++) {
          const filterColunm = this.filterColunmList[i];
          const colunm = this.displayColumns[i];
          if (filterColunm.type === "Input" && filterColunm.value) {
            if (!this.getContent(row, colunm).includes(filterColunm.value))
              return false;
          }
          if (
            filterColunm.type === "Select" &&
            filterColunm.values.length > 0
          ) {
            if (!filterColunm.values.includes(this.getContent(row, colunm)))
              return false;
          }
        }
        return true;
      });
  }

  get displayList(): any[] {
    if (this.option.disablePagination) return this.filterList;

    const start =
      (this.searchParams.currentPage - 1) * this.searchParams.pageSize;
    const end = start + this.searchParams.pageSize;
    return this.filterList.slice(start, end);
  }

  get displayFilterThList(): any[] {
    return this.displayColumns.filter((column, i) => {
      return this.filterColunmList[i].type !== "None";
    });
  }

  initOption() {
    this.filterColunmList = this.option.columnOptions.map(
      (column): GeelistFilterColumn => {
        if (column.input)
          return {
            type: "Input",
            value: "",
            values: [],
            selectOptions: []
          };
        if (column.select) {
          const selectOptions: string[] = [];
          this.list.forEach(row => {
            const content = this.getContent(row, column);
            if (!selectOptions.includes(content)) selectOptions.push(content);
          });
          return {
            type: "Select",
            value: "",
            values: [],
            selectOptions
          };
        }
        return {
          type: "None",
          value: "",
          values: [],
          selectOptions: []
        };
      }
    );
  }

  created() {
    this.initOption();
  }
}
</script>

<style lang="scss">
.text-blue {
  color: #409eff;
  user-select: none;
}
.select-span {
  cursor: pointer;
  user-select: none;
}

.geelist-header {
  border: 1px solid #e8e8e8;
  border-bottom: 0;
  background: #fafafa;
  color: #909399;
  padding: 10px;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-input__inner {
    height: 30px;
    font-size: 12px;
    border: 1px solid #e8e8e8;
  }
}

.geelist-table {
  border-collapse: collapse;
  border-spacing: 0;
  border: 1px solid #e8e8e8 !important;
  background: #f1f3f5;
  thead {
    width: 100%;
    table-layout: fixed;
    display: table;
    tr:nth-child(1) {
      th {
        border-top: 0;
      }
    }
    th:nth-child(1) {
      border-left: 0;
    }
    th:nth-child(-1) {
      border-right: 0;
    }
    th {
      text-align: center;
      font-size: 12px;
      padding: 8px 5px;
      border: 1px solid #e8e8e8;
      background: #fafafa;
      color: rgba(0, 0, 0, 0.5);
      .el-input__inner {
        border: 1px solid #e8e8e8;
      }
      label {
        margin-left: 0 !important;
      }
    }
  }
  tbody {
    overflow-y: scroll;
    tr:nth-child(-1) {
      border-bottom: 0;
    }
    tr {
      display: table;
      width: 100%;
      table-layout: fixed;
      td {
        border: 1px solid #e8e8e8;
        border-top: 0;
        color: #303133;
        padding: 5px;
        text-align: center;
        font-size: 12px;
        background: white;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        .el-tag {
          line-height: 18px;
          height: 20px;
        }
      }
      td:nth-child(1) {
        border-left: 0;
      }
      .actions-cell {
        padding: 0;
        .el-button {
          padding: 3px 10px;
        }
      }
      &:hover {
        td {
          background: #f5f7fa;
        }
      }
    }
  }
  .popperClass {
    width: 200px !important;
  }
}
</style>
