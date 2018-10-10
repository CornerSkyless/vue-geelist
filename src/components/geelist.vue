<template>
    <div>
        <table class="geeList">
            <thead>
            <tr>
                <th v-for="column in displayColumns" :key="column.label">
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
                    <span v-if="!column.tooltip">{{getContent(row,column)}}</span>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { GeelistColumnOption, GeelistOption } from "./interface";

function IndexByIndex(obj: any, indexes: string): string {
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
  private list: any[];
  @Prop({ required: true, type: Object })
  private option: GeelistOption;

  getContent(row: any, columnOption: GeelistColumnOption): string {
    if (columnOption.index) {
      return IndexByIndex(row, columnOption.index) || "-";
    }
  }

  getToolTipContent(row: any, columnOption: GeelistColumnOption): string {
    if (columnOption.tooltipText) {
      return columnOption.tooltipText(row);
    } else {
      return this.getContent(row, columnOption);
    }
  }

  get displayColumns(): GeelistColumnOption[] {
    return this.option.columnOptions.map(co => {
      const style: any = co.style;
      if (co.wrap) {
        style["text-overflow"] = "inherit";
        style["overflow"] = "auto";
        style["white-space"] = "normal";
      }
      co.style = style;
      return co;
    });
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

.geeListTopArea {
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

.geeList {
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
