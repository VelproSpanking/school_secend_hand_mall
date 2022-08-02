<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>未完成订单</span>
      </div>
      <!-- 表格 -->
      <el-table :data="tableData" style="width:100%">
        <el-table-column fixed label="跑腿名称" width="50">
          <template slot-scope="scope">
            <div class="goods">
              <div class="name">
                <span>{{ scope.row.name }}</span>
                <br/>

              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column sortable prop="name" label="物品名称">
        </el-table-column>
        <el-table-column sortable prop="price" label="价格">
        </el-table-column>

        <el-table-column sortable prop="start_people" label="寄件联系人">
        </el-table-column>
        <el-table-column sortable prop="start_tel" label="寄件联系人方式">
        </el-table-column>
        <el-table-column sortable prop="end_people" label="收件联系人">
        </el-table-column>
        <el-table-column sortable prop="end_tel" label="收件联系人方式">
        </el-table-column>
       <el-table-column sortable prop="start_address" label="寄件地址">
        </el-table-column>
        <el-table-column sortable prop="end_address" label="收件地址">
        </el-table-column>
        <el-table-column sortable prop="create_time" label="发布时间">
        </el-table-column>
        <el-table-column sortable prop="dead_time" label="订单截止时间">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- <router-link class="am-margin-right-sm" :to="{ name: 'GoodsEdit', params: { id: scope.row.id }}">
              <el-button type="primary" plain icon="el-icon-edit" size="small"></el-button>
            </router-link> -->
            <el-button @click="showDeleteModal(scope.row.id)" icon="el-icon-delete" plain type="danger"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination :page-sizes="[4,8,16,32]" :page-size="pageSize" :total="total" @size-change="pageSizeChange"
                     @current-change="currentPageChange" background layout="->,prev,pager,next,sizes,total"
                     class="am-margin-top-sm"></el-pagination>
    </el-card>
  </div>
</template>
<script>
import { runner } from '@/api/index';

export default {
  data() {
    return {
      tableData: [],
      total: 0,
      pageSize: 4,
      pageIndex: 1,
    };
  },
  created() {
    this.loadGoodsList();
    document.title = "商品列表";
  },
  methods: {
    async loadGoodsList() {
      let { status, data, total } = await runner.unfinished({
        // pageIndex: this.pageIndex,
        // pageSize: this.pageSize,
      });
      if (status) {
        this.tableData = data;
        this.total = total;
      }
    },
    // 分页器改变页码数
    currentPageChange(pageIndex) {
      this.pageIndex = pageIndex;
      this.loadGoodsList();
    },
    // 分页器pageSize改变
    pageSizeChange(size) {
      this.pageSize = size;
      this.loadGoodsList();
    },
    async showDeleteModal(id) {
      this.$confirm('确定要删除该商品吗？删除之后无法恢复！！！', {
        type: 'warning'
      })
          .then(async () => {
            let { status, msg } = await runner.remove(id);
            if (status) {
              this.$message.success('删除成功！');
              this.loadGoodsList();
            }
          })
          .catch(() => {
            this.$message.info('已取消删除');
          });
    },
  }
};
</script>
<style lang="less" scoped>
.goods {
  display: flex;
  align-items: center;

  .photo {
    margin-right: 6px;
    border: 1px solid #eee;
  }

  .photo img {
    width: 80px;
    display: block;
  }
}
</style>
