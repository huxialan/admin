<template>
  <div class="app-container calendar-list-container">
    <transition name="component-fade" mode="out-in">
      <div class="filter-container" v-if="!selectOrders.length">
        <el-row>
          <!--<el-col :span="14">-->
            <!--<el-select clearable style="width: 100px" class="filter-item" v-model="value" placeholder="状态"-->
                       <!--size="small">-->
              <!--<el-option v-for="item in orderStatus" :key="item.value" :label="item.label" :value="item.value">-->
              <!--</el-option>-->
            <!--</el-select>-->

            <!--<el-input @keyup.enter.native="handleFilter" style="width: 230px;" class="filter-item"-->
                      <!--placeholder="请输入订单号" v-model="condition" size="small">-->
            <!--</el-input>-->

            <!--<el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter" size="small">搜索-->
            <!--</el-button>-->

          <!--</el-col>-->
        </el-row>
      </div>
      <div class="filter-container order-operation-meun" v-else>
        <el-row>
          <el-col :span="2">
            已选中<span style="color: #13c19f">{{selectOrders.length}}</span>项
          </el-col>
          <el-col :span="1">
          </el-col>
          <el-col :span="2">
            <i class="fa fa-truck fa-lg"></i> 确认发货
          </el-col>
          <el-col :span="2">
            <i class="fa fa-trash fa-lg"></i> 取消订单
          </el-col>
        </el-row>
      </div>
    </transition>


    <el-table :data="list" v-loading="listLoading" element-loading-text="拼命加载中" :height="tableHeight" border stripe fit
              highlight-current-row style="width: 100%" @select="handleSelection" @select-all="handleSelectionAll">
      <el-table-column align="center"
                       type="selection"
                       width="55">
      </el-table-column>

      <el-table-column align="center" min-width="100px" label="订单号" show-overflow-tooltip>
        <template scope="scope">
          <span class="link-type" @click="handleDetail(scope.row)">{{scope.row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="180px" label="商品名" prop="goodsname" sortable>
      </el-table-column>
      <el-table-column align="center" min-width="200px" label="收货人" prop="resvicePepple" sortable show-overflow-tooltip>
      </el-table-column>
      <el-table-column align="center" width="180px" label="联系方式" prop="tel" sortable>
      </el-table-column>
      <el-table-column align="center" width="180px" label="单价" prop="price" sortable>
      </el-table-column>
      <el-table-column align="center" width="180px" label="地址" prop="address" sortable>
      </el-table-column>
      <el-table-column align="center" width="180px" label="创建时间" prop="createtime" sortable>
      </el-table-column>
      <el-table-column align="center" label="状态" width="100">
        <template scope="scope">
          <el-tag :type="scope.row.ispay | statusFilter">{{scope.row.ispay | statusFilterTip}}</el-tag>
        </template>
      </el-table-column>
    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {parseTime} from '../../assets/js/tool';
  import keepAliveList from '../keepAliveList';


  export default {
    components: {},
    name: 'OrderList',
    data() {
      return {
        tableHeight: 0,
        list: null,
        total: null,
        listLoading: false,
        listQuery: {
          page: 1,
          limit: 20,
          orderId: undefined,
          status: undefined
        },
        value:'',
        condition:'',
        orderStatus: [{label: '待付款', value: 0}, {label: '待发货', value: 1}, {label: '已发货', value: 2}, {label: '已取消', value: 3}, {label: '已完成', value: 4}],
        checkAllStatus: true,
        checkedStatuss: [0, 1],
        isIndeterminateStatus: false,
        showAdvancedSearchPopover: false,
        dateTimePickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        selectOrders: []
      };
    },
    created() {
      this.getList();
      this.tableHeight = document.documentElement.clientHeight - (50 + 20 + 50 + 70);
      $(window).resize(() => {
        this.tableHeight = document.documentElement.clientHeight - (50 + 20 + 50 + 70);
      });
    },
    filters: {
      parseTime(time) {
        return parseTime(time);
      },
      statusFilter(status) {
        const statusMap = ['primary', 'success', 'warning', 'danger', 'gray'];
        return statusMap[status];
      },
      statusFilterTip(status) {
        const statusMap = ['待付款', '待发货', '已发货', '已取消', '已完成'];
        return statusMap[status];
      }
    },
    methods: {
      judge(){
        var  info='';
        var temp='';
        info=this.$store.getters.status;
        temp=this.$store.getters.conditions;
        console.log(info);
        this.value=info;
        this.condition=temp;
        if (info===0||info===1||info===2){
          if (temp== ''){
            this.getStatusList(info);
          }else {
            this.getSearchOrderStatus(temp,info);
          }

        }else {
          if (temp==''){
            this.getList();
          }else {
            this.getSearchOrder(temp)
            console.log(temp)
          }
        }
      },

      getList() {
        this.listLoading = true;
        setTimeout((items, total) => {
          var  info={};
          info.page=this.listQuery.page;
          info.pagesize=this.listQuery.limit;
          this.$store.dispatch('GetCreditOrderList',info).then((res)=>{
            this.total=res.total;
            this.list=res.list;
          })
          this.listLoading = false;
        }, 2000);
      },
      getStatusList(status) {
        this.listLoading = true;
        setTimeout((items, total) => {
          var info={};
          info.status=status;
          info.page=this.listQuery.page;
          info.pagesize=this.listQuery.limit;
          this.$store.dispatch('GetStatusOrder',info).then((res)=>{
            this.total=res.total;
            this.list=res.list;
          })
          this.listLoading = false;
        }, 2000);
      },
      getSearchOrder(condition){

        this.listLoading = true;
        setTimeout((items, total) => {
          var info={};
          info.condition=condition;
          info.page=this.listQuery.page;
          info.pagesize=this.listQuery.limit;
          this.$store.dispatch('GetSearchOrder',info).then((res)=>{
            this.total=res.total;
            this.list=res.list;
          })
          this.listLoading = false;
        }, 2000);


      },
      getSearchOrderStatus(condition,status){
        this.listLoading = true;
        setTimeout((items, total) => {
          var info={};
          info.condition=condition;
          info.status=status;
          info.page=this.listQuery.page;
          info.pagesize=this.listQuery.limit;
          this.$store.dispatch('GetSearchOrderStatus',info).then((res)=>{
            this.total=res.total;
            this.list=res.list;
          })
          this.listLoading = false;
        }, 2000);
      },

      handleFilter() {
        this.$store.dispatch('ChangeCondition',this.value).then(()=>{
          this.$store.dispatch('ChangCon',this.condition).then(()=>{
            this.getList();
          })
        })
      },
      handleSizeChange(val) {
        this.listQuery.limit = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.getList();
      },
      handleCheckAllStatusChange(event) {
        let statuss = [];
        for (let tag of this.orderStatus) {
          statuss.push(tag.value);
        }
        this.checkedStatuss = event.target.checked ? statuss : [];
        this.isIndeterminateStatus = false;
      },
      handleCheckedStatusChange(value) {
        let checkedCount = value.length;
        this.checkAllStatus = checkedCount === this.orderStatus.length;
        this.isIndeterminateStatus = checkedCount > 0 && checkedCount < this.orderStatus.length;
      },
      handleDetail() {
        this.jump({path: '/order/edit-order?id=95606'});
      },
      handleSelection(selection, row) {
        this.selectOrders = selection;
      },
      handleSelectionAll(selection) {
        this.selectOrders = selection;
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        // 通过 `vm` 访问组件实例
        if (keepAliveList.indexOf(from.path) !== -1) {
          vm.listQuery.page = 1;
          vm.listQuery.limit = 20;
          vm.listQuery.title = undefined;
          vm.listQuery.status = undefined;
          vm.getList();
        }
      });
    }
  };
</script>

<style>
  .order-manage-list.menu-popper-class {
    min-width: 60px !important;
  }

  .order-operation-meun {
    font-size: 14px;
    color: #97a8be;
  }
</style>
