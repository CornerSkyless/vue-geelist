<template>
    <div>
        <div class="geelist-header">
          <el-input size="mini" style="width:250px" placeholder="输入关键词搜索"></el-input>
        </div>
        <table class="geelist-table">
            <thead>
            <tr>
                <th v-for="column in displayColumns" :key="column.label" :style="column.style">
                    {{column.label}}
                    <el-tooltip v-if="column.description"
                                effect="dark" placement="bottom" :content="column.description">
                        <i class="el-icon-question"></i>
                    </el-tooltip>
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
                    <el-tag v-if="column.tags"
                            :type="getTagOption(row,column).type"
                            :color="getTagOption(row,column).color">
                        {{getContent(row,column)}}
                    </el-tag>
                    <slot v-if="column.slot" :name="column.slot" :row="row"></slot>
                    <el-button v-for="action in column.actions || []"
                      :key="getActionXXX(row,action,'text')" 
                      :type="getActionXXX(row,action,'type')"
                      :plain="getActionXXX(row,action,'plain')"
                      :circle="getActionXXX(row,action,'circle')"
                      :disabled="getActionXXX(row,action,'disabled')" 
                      :size="getActionXXX(row,action,'size')" 
                      @click="doAction(row,action)">{{getActionXXX(row,action,'text')}}</el-button>
                    <span v-if="!column.tooltip && !column.tags && !column.slot && !column.actions">{{getContent(row,column)}}</span>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import {
  GeelistColumnOption,
  GeelistOption,
  GeelistTagOption,
  GeelistActionOption
} from "./interface";

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

  @Watch("list", {
    deep: true
  })
  listHandler(newList: any[]) {
    this.list = newList;
  }

  getRawContent(
    row: any,
    columnOption: GeelistColumnOption<any>
  ): string | boolean {
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

  getContent(
    row: any,
    columnOption: GeelistColumnOption<any>
  ): string | boolean {
    const rawContent = this.getRawContent(row, columnOption);
    if (columnOption.tags) {
      const tagOption = this.getTagOption(row, columnOption);
      if (tagOption && tagOption.text) return tagOption.text;
    }
    if (columnOption.bool) {
      return rawContent ? columnOption.bool.yText : columnOption.bool.nText;
    }
    if (rawContent === false) return false;
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
    return [];
  }

  get displayList(): any[] {
    return this.list;
  }
}
</script>

<style lang="scss">
.text-blue {
  color: #409eff;
}

.geelist-header {
  border: 1px solid #dcdfe6;
  border-bottom: 0;
  background: #ebeef5;
  color: #909399;
  padding: 10px;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-input__inner {
    border: 0;
    height: 30px;
    font-size: 12px;
  }
}

.geelist-table {
  border-collapse: collapse;
  border-spacing: 0;
  border: 1px solid #dcdfe6 !important;
  background: #f1f3f5;
  thead {
    width: 100%;
    table-layout: fixed;
    display: table;
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
      border: 1px solid #dcdfe6;
      background: #ebeef5;
      color: #909399;
    }
  }
  tbody {
    overflow-y: scroll;
    tr {
      display: table;
      width: 100%;
      table-layout: fixed;
      td {
        border: 1px solid #ebeef5;
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
