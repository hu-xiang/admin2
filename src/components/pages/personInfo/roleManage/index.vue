<template>
  <div class="role">
    <top-bar>
      <section>
        <label>{{$t('message.roleName')}}</label>
        <el-input v-model="searchContent.roleName"></el-input>
      </section>
      <section>
        <label>{{$t('message.creationTime')}}</label>
        <el-date-picker
          v-model="searchContent.time"
          type="daterange"
          value-format="yyyy-MM-dd"
          :range-separator="$t('message.to')"
          :start-placeholder="$t('message.startDate')"
          :end-placeholder="$t('message.endDate')"
        ></el-date-picker>
      </section>
      <section>
        <el-button type="primary" @click="eventSearch" size="mini">{{$t('message.searchBtn')}}</el-button>
        <el-button @click="eventReset" size="mini">{{$t('message.resetBtn')}}</el-button>
      </section>
    </top-bar>
    <table-bar>
      <div slot="top">
        <el-button type="primary" @click="$router.push('/roleAdd')" size="mini" v-if="$auths('/roleAdd')">{{$t('message.addBtn')}}</el-button>
      </div>
      <el-table slot="table"
        v-loading="loading"
        border 
        stripe
        :data="tableList"
        style="width: 100%">
        <el-table-column align="center"
          fixed="left"
          :label="$t('message.operate')"
          width="120" v-if="$auths('/roleEdit') || $auths('/roleDelete')">
          <template slot-scope="{row}">
            <el-button type="text"
              @click="$router.push({path:'/roleEdit',query:{row:row}})"
              size="mini" v-if="$auths('/roleEdit')">
              {{$t('message.editBtn')}}
            </el-button>
            <el-button type="text" size="mini" @click="eventDel(row)" v-if="$auths('/roleDelete')">
              {{$t('message.deleteBtn')}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="roleName"
          :label="$t('message.roleName')" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="roleCode"
          :label="$t('message.roleCoding')" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="description"
          :label="$t('message.remark')" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="createTime"
          :label="$t('message.creationTime')" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="updateTime"
          :label="$t('message.updateTime')" show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <el-pagination slot="page"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="curSearchContent.pageNum"
        :page-sizes="[20, 30, 50, 100]"
        :page-size="curSearchContent.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </table-bar>
  </div>
</template>

<script>
export default {
  name: "role",
  data() {
    return {
      loading: false,
      tableList: [{}],
      searchContent: {
          roleName: '',
          time: '',
      },
      curSearchContent: {
        pageNum: 1, // （当前页）
        pageSize: 20, // 每页显示数量
      },
      total: 0, // 总条数
    };
  },
  mounted() {
    this.$nextTick(function() {
        this.getList();
    });
  },
  methods: {
    eventSearch() {},
    eventReset() {},
    getList(bool) {
      if (bool) Object.assign(this.curSearchContent, this.searchContent);
      this.loading = true;
      this.$axios.get(`/sys/role/list?${this.$qs.stringify(this.curSearchContent)}`).then(res => {
        this.loading = false;
        if (res && res.success) {
          this.tableList = res.result.records;
          this.total = res.result.total;
        }
      });
      Object.assign(this.searchContent, this.curSearchContent);
    },
    handleSizeChange(val) {
      this.curSearchContent.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.curSearchContent.pageNum = val;
      this.getList();
    },
  }
};
</script>

<style lang="scss" scoped>
.role {
}
</style>