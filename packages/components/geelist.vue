<template>
  <div class="geelist-component">
    <div class="geelist-header" v-if="!option.hideHeader">
      <div>
        <span
          v-if="mySelectedList.length>0 && option.checkbox"
          style="margin-right:10px"
        >已选中 {{mySelectedList.length}}/{{list.length}}</span>
        <el-input
          v-if="!option.disableGlobalSearch"
          size="mini"
          style="width:250px"
          v-model="searchParams.keyword"
          placeholder="输入关键词搜索"
        ></el-input>
        <el-popover placement="bottom" width="250" trigger="click" style="margin-left:10px">
          <el-checkbox-group v-model="displayLabelList">
            <el-checkbox
              v-for="col in option.columnOptions"
              :label="col.label"
              :key="col.label"
              style="margin-left:0;margin-right:10px"
            >{{col.label}}</el-checkbox>
          </el-checkbox-group>
          <el-button type="text" slot="reference">
            调整可见列
            <i class="el-icon-caret-bottom"></i>
          </el-button>
        </el-popover>
      </div>
      <div style="display: flex;align-items: center">
        <slot name="header-end"></slot>
        <el-button v-if="option.exportExcel" size="mini" @click="exportCsv">导出 CSV 文件</el-button>
      </div>
    </div>
    <table class="geelist-table">
      <thead>
        <tr>
          <th v-if="option.checkbox" rowspan="2" width="60px">
            <el-checkbox :indeterminate="isIndeterminate" @change="handleCheckAllChange" />
          </th>

          <th
            v-for="(column,i) in displayColumns"
            :key="column.label"
            :style="column.style"
            :rowspan="filterColumnList[i].type==='None' ? 2 : 1"
          >
            <div style="display: flex;align-items: center;justify-content: center">
              <div
                style="margin-right: 5px;cursor:pointer;display: inline-block;text-align: center"
                @click="toggleSort(column)"
                v-if="column.sort"
              >
                <i
                  class="el-icon-caret-top"
                  style="display: block;margin-bottom: -6px"
                  :class="{'text-blue':searchParams.sortLabel===column.label && searchParams.sortType==='ASC'}"
                ></i>
                <i
                  class="el-icon-caret-bottom"
                  style="display: block;"
                  :class="{'text-blue':searchParams.sortLabel===column.label && searchParams.sortType==='DESC'}"
                ></i>
              </div>
              <span>{{column.label}}</span>
              <el-tooltip
                v-if="column.description"
                effect="dark"
                placement="bottom"
                :content="column.description"
                style="margin-left: 5px"
              >
                <i class="el-icon-question"></i>
              </el-tooltip>
            </div>
          </th>
        </tr>
        <tr>
          <th v-for="(column) in displayFilterThList" :key="column.label">
            <el-input
              size="mini"
              v-if="filterColumnList[getOriginColumnIndex(column)].type==='Input'"
              v-model="filterColumnList[getOriginColumnIndex(column)].value"
              placeholder="检索"
            ></el-input>
            <el-date-picker
                    size="mini" style="width: 100%;"
                    v-if="filterColumnList[getOriginColumnIndex(column)].type==='Date' || filterColumnList[getOriginColumnIndex(column)].type==='Datetime'"
                    v-model="filterColumnList[getOriginColumnIndex(column)].value"
                    :type="filterColumnList[getOriginColumnIndex(column)].type.toLowerCase()"
                    placeholder="筛选">
            </el-date-picker>
            <el-popover
                    v-if="filterColumnList[getOriginColumnIndex(column)].type==='DateRange' || filterColumnList[getOriginColumnIndex(column)].type==='DatetimeRange'"                    placement="bottom"
                    width="270" trigger="click">
              <div style="display: flex;">
                <el-date-picker
                        size="mini" style="width: 100%;"
                        v-model="filterColumnList[getOriginColumnIndex(column)].values"
                        :type="filterColumnList[getOriginColumnIndex(column)].type.toLowerCase()"
                        :clearable="false" placeholder="筛选">
                </el-date-picker>
                <el-button size="mini" @click="filterColumnList[getOriginColumnIndex(column)].values=[]" c>清空</el-button>
              </div>
              <a slot="reference" class="select-span" :class="{'text-blue':filterColumnList[getOriginColumnIndex(column)].values.length>0}">
                <i class="el-icon-date" style="margin-right: 5px"></i>时间范围筛选
              </a>
            </el-popover>
            <el-popover v-if="filterColumnList[getOriginColumnIndex(column)].type==='Select'" placement="bottom" width="240" trigger="click">
              <el-checkbox-group v-model="filterColumnList[getOriginColumnIndex(column)].values">
                <el-checkbox v-for="option in filterColumnList[getOriginColumnIndex(column)].selectOptions"
                  :key="option" :label="option" style="margin-left:0;margin-right:15px" />
              </el-checkbox-group>
              <a slot="reference" class="select-span"
                :class="{'text-blue':filterColumnList[getOriginColumnIndex(column)].values.length>0}">
                <i class="el-icon-caret-bottom"></i>筛选
              </a>
            </el-popover>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row,i) in displayList"
          :key="row[option.rowKey]"
          @click="clickOnRow(row,i)"
          :class="getRowClassNames(row)"
        >
          <td v-if="option.checkbox" width="60px">
            <el-checkbox
              :checked="isInSelectedList(row)"
              :value="isInSelectedList(row)"
              @change="checkboxChanged($event,row)"
            />
          </td>
          <td
            v-for="column in displayColumns"
            :key="column.label"
            :style="column.style"
            :rowspan="getRowspan(row,column)"
            :colspan="getColspan(row,column)"
            :class="getColumnClassNames(row,column)"
          >
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
        <tr v-if="hasSumUp && filterList.length>0">
          <td v-if="option.checkbox" width="60px"></td>
          <td
            v-for="(column,i) in displayColumns"
            :key="column.label"
            :rowspan="filterColumnList[i].type==='None' ? 2 : 1"
          >
            <span v-if="column.sumUp">
              <span v-if="!option.disablePagination">
                本页总和: {{getColumnSumUp(displayList,column)}}
                <br />
                所有页总和: {{getColumnSumUp(filterList,column)}}
              </span>
              <span v-else>总和: {{getColumnSumUp(filterList,column)}}</span>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    <slot name="no-data" v-if="displayList.length===0">
      <div class="no-data">
        <div style="text-align: center">
          <img src="../assets/no-data.jpg" alt />
          <div style="color: #b3bdc6">暂无数据</div>
        </div>
      </div>
    </slot>
    <div style="margin:10px;text-align:center" v-if="!option.disablePagination">
      <el-pagination
        background
        :current-page.sync="searchParams.currentPage"
        :page-sizes="this.option.pageSizes || [5, 10, 20, 50]"
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
  GeelistFilterColumn, GeelistFilterValues
} from "./interface";
import moment from "moment";
const  CsvExportor = require("csv-exportor");
function IndexByIndex(obj: any, indexes = ""): string | boolean | number {
  let levels = indexes.split(".");
  if (levels.length === 0) return "";
  const index = levels[0];
  levels.splice(0, 1);
  if (!obj) return "";
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
  @Prop({ type: Array })
  private selectedList!: any[];

  @Prop({type: Array})
  private filterValues!: GeelistFilterValues[];

  private filterColumnList: GeelistFilterColumn[] = [];

  @Watch('filterColumnList',{deep:true})
  onFilterColumnListChange(){
    this.$emit("update:filterValues", this.filterColumnList.map<GeelistFilterValues>(filterColumn=>({
      label:filterColumn.label,value:filterColumn.value,values:filterColumn.values
    })));
  }

  searchParams = {
    keyword: "",
    currentPage: 1,
    pageSize: this.option.pageSize || 10,
    sortType: "",
    sortLabel: ""
  };

  mySelectedList = this.selectedList || [];

  displayLabelList: string[] = [];

  get hasSumUp() {
    for (const option of this.option.columnOptions) {
      if (option.sumUp) return true;
    }
    return false;
  }

  @Watch("selectedList", { deep: true })
  selectedListHandler(value: any[]) {
    this.mySelectedList = value;
  }

  @Watch("filterValues", { deep: true })
  filterValuesHandler(valuesList: GeelistFilterValues[]) {
    this.updateFilterColumn(valuesList);
  }

  @Watch("mySelectedList", { deep: true })
  mySelectedListHandler() {
    this.$emit("update:selectedList", this.mySelectedList);
  }

  @Watch("option", { deep: true })
  optionHandler() {
    this.initOption();
  }

  @Watch("list", { deep: true })
  listHandler() {
    this.initOption();
  }

  updateFilterColumn(propFilterList: GeelistFilterValues[]){
    propFilterList.forEach(prop=>{
      const exist = this.filterColumnList.find(i=>i.label===prop.label);
      if(exist) {
        exist.values = prop.values;
        exist.value = prop.value;
      }
    })
  }

  getRowspan(row: any, column: GeelistColumnOption<any>) {
    const res = IndexByIndex(row, column.rowspan);
    if (res === 0) return 0;
    return res || 1;
  }

  getColspan(row: any, column: GeelistColumnOption<any>) {
    const res = IndexByIndex(row, column.colspan);
    if (res === 0) return 0;
    return res || 1;
  }

  getColumnSumUp(list: any[], column: GeelistColumnOption<any>) {
    let ans = 0;
    list.forEach(row => {
      if (column.sumUp) {
        ans += column.sumUp(row);
      }
    });
    return ans.toFixed(2);
  }

  checkboxChanged(isIn: any, row: any) {
    const rowKey = this.option.rowKey;
    const existIndex = this.mySelectedList.findIndex(
      selected => selected[rowKey] === row[rowKey]
    );
    if (isIn && existIndex < 0) {
      this.mySelectedList.push(row);
    } else if (!isIn && existIndex >= 0) {
      this.mySelectedList.splice(existIndex, 1);
    }
  }

  clickOnRow(row: any, index: number) {
    this.$emit("row-click", row, index);
  }

  handleCheckAllChange(value: any) {
    if (value) {
      for (const row of this.displayList) {
        if (!this.isInSelectedList(row)) this.mySelectedList.push(row);
      }
    } else {
      for (const row of this.displayList) {
        const rowKey = this.option.rowKey;
        const existIndex = this.mySelectedList.findIndex(
          selected => selected[rowKey] === row[rowKey]
        );
        if (existIndex >= 0) this.mySelectedList.splice(existIndex, 1);
      }
    }
  }

  isInSelectedList(row: any) {
    const rowKey = this.option.rowKey;
    const existIndex = this.mySelectedList.findIndex(
      selected => selected[rowKey] === row[rowKey]
    );
    return existIndex >= 0;
  }

  get isIndeterminate() {
    for (const row of this.displayList) {
      if (!this.isInSelectedList(row)) return false;
    }
    return true;
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

  getColumnClassNames(row: any, columnOption: GeelistColumnOption<any>) {
    const list = [];
    if (
      this.getRowspan(row, columnOption) === 0 ||
      this.getColspan(row, columnOption) === 0
    ) {
      list.push("displayNone");
    }
    if (!columnOption.classNames) return list;
    if (typeof columnOption.classNames === "function")
      return list.concat(columnOption.classNames(row));
    return list.concat(columnOption.classNames);
  }

  getRowClassNames(row: any) {
    if (!this.option.classNames) return [];
    if (typeof this.option.classNames === "function")
      return this.option.classNames(row);
    return this.option.classNames;
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

  toggleSort(column: GeelistColumnOption<any>) {
    if (this.searchParams.sortLabel === column.label) {
      if (this.searchParams.sortType === "") this.searchParams.sortType = "ASC";
      else if (this.searchParams.sortType === "ASC")
        this.searchParams.sortType = "DESC";
      else if (this.searchParams.sortType === "DESC")
        this.searchParams.sortType = "";
    } else {
      this.searchParams.sortLabel = column.label;
      this.searchParams.sortType = "ASC";
    }
  }

  get displayColumns(): GeelistColumnOption<any>[] {
    const list = this.option.columnOptions.map(
      (co: GeelistColumnOption<any>) => {
        const style: any = co.style || {};
        if (co.wrap) {
          style["text-overflow"] = "inherit";
          style["overflow"] = "auto";
          style["white-space"] = "normal";
        }
        co.style = style;
        return co;
      }
    );
    return list.filter(col => this.displayLabelList.includes(col.label));
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
            } catch (e) {}
          }
        }
        if (keyword && !keywordFound) return false;
        return true;
      })
      .filter(row => {
        for (let i = 0; i < this.displayColumns.length; i++) {
          const column = this.displayColumns[i];
          const filterColumn = this.filterColumnList[
            this.getOriginColumnIndex(column)
          ];
          const content = this.getContent(row, column);
          if (filterColumn.type === "Input" && filterColumn.value) {
            if (!content.includes(filterColumn.value)) return false;
          }else if (filterColumn.type === "Select" && filterColumn.values.length > 0) {
            if (!filterColumn.values.includes(content)) return false;
          }else if (filterColumn.type === "Date" && filterColumn.value) {
            if (moment(content).format('YYYY-MM-DD') !== moment(filterColumn.value).format('YYYY-MM-DD')) return false;
          } else if (filterColumn.type === "Datetime" && filterColumn.value) {
            if (moment(content).format('YYYY-MM-DD hh:mm:ss') !== moment(filterColumn.value).format('YYYY-MM-DD hh:mm:ss')) return false;
          }else if (filterColumn.type === "DateRange" && filterColumn.values.length>0) {
            const contentMoment = moment(content);
            const leftMoment = moment(filterColumn.values[0]);
            const rightMoment = moment(filterColumn.values[1]);
            if (contentMoment.diff(leftMoment,'days')<0 || contentMoment.diff(rightMoment,'days')>0) return false;
          }else if (filterColumn.type === "DatetimeRange" && filterColumn.values.length>0) {
            const contentMoment = moment(content);
            const leftMoment = moment(filterColumn.values[0]);
            const rightMoment = moment(filterColumn.values[1]);
            if (contentMoment.diff(leftMoment,'seconds')<0 || contentMoment.diff(rightMoment,'seconds')>0) return false;
          }
        }
        return true;
      });
  }

  get displayList(): any[] {
    let displayList = JSON.parse(JSON.stringify(this.filterList));
    const existSortColumn = this.option.columnOptions.find(
      c => c.label === this.searchParams.sortLabel
    );
    if (existSortColumn && existSortColumn.sort && this.searchParams.sortType) {
      const sortRule = existSortColumn.sort;
      if (typeof sortRule === "function") {
        if (this.searchParams.sortType === "ASC")
          displayList = displayList.sort((a: any, b: any) => sortRule(a, b));
        if (this.searchParams.sortType === "DESC")
          displayList = displayList.sort((a: any, b: any) => sortRule(b, a));
      } else {
        if (this.searchParams.sortType === "ASC")
          displayList = displayList.sort((a: any, b: any) => {
            const contentA = this.getContent(a, existSortColumn);
            const contentB = this.getContent(b, existSortColumn);
            if (isNaN(parseFloat(contentA)))
              return contentA.localeCompare(contentB);
            else return parseFloat(contentA) - parseFloat(contentB);
          });
        if (this.searchParams.sortType === "DESC")
          displayList = displayList.sort((a: any, b: any) => {
            const contentA = this.getContent(a, existSortColumn);
            const contentB = this.getContent(b, existSortColumn);
            if (isNaN(parseFloat(contentA)))
              return contentB.localeCompare(contentA);
            else return parseFloat(contentB) - parseFloat(contentA);
          });
      }
    }
    const finalList: any = [];
    const rowKey = this.option.rowKey;
    displayList.forEach((item: any) => {
      finalList.push(this.filterList.find(i => i[rowKey] === item[rowKey]));
    });
    if (this.option.disablePagination) return finalList;
    const start =
      (this.searchParams.currentPage - 1) * this.searchParams.pageSize;
    const end = start + this.searchParams.pageSize;
    return finalList.slice(start, end);
  }

  get displayFilterThList(): any[] {
    return this.displayColumns.filter((column, i) => {
      return this.filterColumnList[i].type !== "None";
    });
  }

  getOriginColumnIndex(column: GeelistColumnOption<any>) {
    return this.option.columnOptions.findIndex(c => c.label === column.label);
  }

  initOption() {
    this.displayLabelList = [];
    this.filterColumnList = this.option.columnOptions.map(
      (column): GeelistFilterColumn => {
        let defaultValue = "";
        let defaultValues:string[] = [];
        if(this.filterValues){
          const existValue = this.filterValues.find(i=>i.label===column.label);
          if(existValue){
            defaultValue = existValue.value;
            defaultValues = existValue.values;
          }
        }
        if (!column.defaultHide) this.displayLabelList.push(column.label);
        if (column.input)
          return { type: "Input", value:defaultValue, values: defaultValues, selectOptions: [], label:column.label };
        if (column.select) {
          const selectOptions: string[] = [];
          this.list.forEach(row => {
            const content = this.getContent(row, column);
            if (!selectOptions.includes(content)) selectOptions.push(content);
          });
          return {type: "Select", value:defaultValue, values: defaultValues, selectOptions, label: column.label};
        }
        if (column.dateFilter) {
          return {type: column.dateFilter, value:defaultValue, values: defaultValues, selectOptions: [],label: column.label};
        }
        return {type: "None", value:defaultValue, values: defaultValues, selectOptions: [],label:column.label};
      }
    );
  }

  created() {
    this.initOption();
  }
}
</script>

<style lang="scss">
.geelist-component {
  table {
    margin: 0 !important;
  }
  th,
  tr {
    border: 0 !important;
  }
}

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
  width: 100%;
  overflow-x: hidden;
  table-layout: fixed;
  thead {
    width: 100%;
    table-layout: fixed;
    tr:nth-child(1) {
      th {
        border-top: 0 !important;
      }
    }
    th:nth-child(1) {
      border-left: 0 !important;
    }
    th:nth-child(-1) {
      border-right: 0 !important;
    }
    th {
      text-align: center;
      font-size: 12px;
      padding: 8px 5px;
      border: 1px solid #e8e8e8 !important;
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
    table-layout: fixed;
    background: white;
    tr:nth-child(-1) {
      border-bottom: 0;
    }
    tr {
      // display: table;
      width: 100%;
      table-layout: fixed;
      td {
        border: 1px solid #e8e8e8;
        border-top: 0;
        color: #303133;
        padding: 5px;
        text-align: center;
        font-size: 12px;
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
  .displayNone {
    display: none;
  }
}
.no-data {
  background: white;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #e8e8e8;
  color: rgba(0, 0, 0, 0.5);
}
</style>
