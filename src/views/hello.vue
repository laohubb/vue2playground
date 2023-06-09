<template>
  <div class="contract-contractPage-detailPage">
    <!-- 头部 -->
    <div ref="header_dom">
      <f-header class="header" @back="goHome">
        <template slot="center">
          <p class="title">合同详情</p>
        </template>
      </f-header>
    </div>
    <!-- tab栏 -->
    <div class="tab">
      <van-tabs
        v-model="active"
        @click="onClick"
        :sticky="true"
        :offset-top="header_dom + 'px'"
      >
        <!-- 基本信息 -->
        <van-tab title="基本信息" name="1">
          <div v-if="show" style="height: 100vh; z-index: 9999; width: 100%">
            <!-- <p @cilck="show=false">close</p> -->
            <!-- <VueOfficeDocx
                :src="docx"
                style="height: 100vh;width:100%;"
            /> -->
            <VueOfficeExcel :src="excel" style="height: 100vh; width: 100%" />
            <!-- <VueOfficePdf
                :src="pdf"
                style="height: 100vh;width:100%;"
            /> -->
          </div>
          <div v-else class="group">
            <div v-for="i in contractOrganList" :key="i.custType" class="line">
              <div class="left">{{ i.custType }}</div>
              <div class="right">{{ i.organName }}</div>
            </div>
            <van-cell title="合同标题" center>
              <div class="tags">{{ contractName }}</div>
            </van-cell>
            <div class="line">
              <div class="left">合同编号</div>
              <div class="right">{{ contractNo }}</div>
            </div>
            <div class="line">
              <div class="left">客户经理</div>
              <div class="right">{{ custManager }}</div>
            </div>
            <div class="line">
              <div class="left">合同类型</div>
              <div class="right">
                {{
                  contractType === "0"
                    ? "采购合同"
                    : contractType === "1"
                    ? "销售正式合同"
                    : "销售试用合同"
                }}
              </div>
            </div>
            <div class="line">
              <div class="left">合同金额</div>
              <div class="right">{{ contractAmount }}</div>
            </div>
            <div class="line">
              <div class="left">主联系人姓名</div>
              <div class="rightStatus" @click="goContactInfo">
                {{ primaryContactCode }}
              </div>
            </div>
            <div class="line">
              <div class="left">合同开始日期</div>
              <div class="right">{{ +startDate | formatDate }}</div>
            </div>
            <div class="line">
              <div class="left">合同结束日期</div>
              <div class="right">{{ +endDate | formatDate }}</div>
            </div>
            <div class="line">
              <div class="left">订阅池</div>
              <div class="rightStatus" @click="goSubPool">
                {{ subscriptionStatus }}
              </div>
            </div>
            <div class="other">
              <div class="left">附件</div>
              <div
                class="file"
                v-for="item in fileList"
                :key="item.id"
                @click="downLoadFile(item)"
              >
                <img class="docPic" src="./assets/文档.png" />
                <span>{{ item.fileName }}</span>
              </div>
            </div>
          </div>
        </van-tab>
        <!-- 产品信息 -->
        <van-tab title="产品信息" name="2">
          <div
            v-for="item in productInfo"
            :key="item.productId"
            class="product_box"
            @click="productDetail(item.productId)"
          >
            <h2>{{ item.productName }}</h2>
            <div class="product_box_line" />
            <div class="word">
              <div class="content">
                <div>产品类型：</div>
                <div>{{ item.productType === "1" ? "集团内" : "集团外" }}</div>
              </div>
              <div class="content">
                <div>产品单价：</div>
                <div>{{ item.productPrice }}</div>
              </div>
              <div class="content">
                <div>价格单位：</div>
                <div>
                  {{
                    item.productUnit === "0"
                      ? "元/天"
                      : item.productUnit === "1"
                      ? "元/月"
                      : item.productUnit === "2"
                      ? "元/季度"
                      : item.productUnit === "3"
                      ? "元/年"
                      : ""
                  }}
                </div>
              </div>
              <div class="content">
                <div>创建时间：</div>
                <div>{{ item.createTime }}</div>
              </div>
              <div class="content">
                <div>产品状态：</div>
                <div class="content_status">
                  {{ item.productStatus === "1" ? "有效" : "无效" }}
                </div>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
      <!-- button_box -->
      <!-- <div class="button_box">
        <button class="button_box_pass">审批通过</button>
        <button class="button_box_back">退回</button>
      </div>      -->
    </div>
  </div>
</template>

<script>
//引入VueOfficeDocx组件
import VueOfficeDocx from "@vue-office/docx";
//引入VueOfficePdf组件
import VueOfficeExcel from "@vue-office/pdf";
//引入相关样式
import "@vue-office/docx/lib/index.css";
//引入相关样式
import "@vue-office/excel/lib/index.css";
//引入VueOfficePdf组件
import VueOfficePdf from "@vue-office/pdf";
import { getSessionStorage } from "@bridge/cache";

// import {os_info} from '@/static/common/mobile_main.dll.js'
export default {
  filters: {
    formatDate(value) {
      console.log(value);
      return App.Tools.formate.formatDateNew(value);
    },
  },
  components: { VueOfficeDocx, VueOfficeExcel, VueOfficePdf },
  data() {
    return {
      show: false,
      docx: "",
      excel: "",
      pdf: "",
      userPhone: "",
      header_dom: "",
      pageNo: "1",
      pageSize: "100",
      id: "",
      contractId: "",
      contractNo: "",
      // tab栏
      active: 2,
      contractName: "",
      contractNo: "",
      custManager: "",
      contractType: "",
      contractAmount: "",
      primaryContactCode: "",
      startDate: "",
      endDate: "",
      subscriptionStatus: "",
      fileList: [],
      contractOrganList: [],
      // 产品信息list
      productInfo: [],
      productInfoList: [],
      contactInfo: [],
    };
  },
  mounted() {
    this.getDetailContract();
    this.getContract();
    this.header_dom = this.$refs.header_dom.clientHeight - 1;
  },
  methods: {
    onClick(name, title) {
      if (title === "产品信息") {
        this.getListValid();
      }
    },
    // 合同详情
    async getDetailContract() {
      this.id = await App.Native.dataDB({ type: "get", key: "id" }, "get");
      this.contractId = await App.Native.dataDB(
        { type: "get", key: "contractId" },
        "get"
      );
      this.contractNo = await App.Native.dataDB(
        { type: "get", key: "contractNo" },
        "get"
      );
      const params = {
        url: "/contract/queryContractInfo",
        loadingFlag: true,
        encrypted: false,
        params: {
          reqBody: {
            id: this.id,
            contractId: this.contractId,
            contractNo: this.contractNo,
          },
          reqHead: {
            // "token": res.token
          },
        },
      };
      console.log(params, "params");
      App.Native.sendShark(params).then((res) => {
        console.log(res);
        if (res.rspHead.returnCode == "00000000") {
          this.contractName = res.rspBody.contractName;
          this.contractNo = res.rspBody.contractNo;
          this.custManager = res.rspBody.custManager;
          this.contractType = res.rspBody.contractType;
          this.contractAmount = res.rspBody.contractAmount;
          this.primaryContactCode = res.rspBody.primaryContactCode;
          this.startDate = res.rspBody.startDate;
          this.endDate = res.rspBody.endDate;
          this.subscriptionStatus = res.rspBody.subscriptionStatus;
          this.contractOrganList = res.rspBody.contractOrganList;
          const productArr = res.rspBody.contractProductList.map(
            (item) => item.productId
          );
          this.productInfoList = productArr.map((item) => ({
            productId: item,
          }));
          this.contactInfo = res.rspBody.contactInfo;
          console.log(this.contactInfo);
        }
      });
    },
    // 获取关联产品
    async getListValid() {
      const params = {
        url: "/product/queryListIsValid",
        loadingFlag: true,
        encrypted: false,
        params: {
          reqBody: {
            productList: this.productInfoList,
            pageNo: this.pageNo,
            pageSize: this.pageSize,
          },
          reqHead: {
            // "token": res.token
          },
        },
      };
      console.log(params, "params");
      App.Native.sendShark(params).then((res) => {
        console.log(res);
        if (res.rspHead.returnCode == "00000000") {
          this.productInfo = res.rspBody.productList;
          // this.cardBox = res.rspBody.table.list
        }
      });
    },
    // 获取合同附件
    async getContract() {
      this.contractId = await App.Native.dataDB(
        { type: "get", key: "contractId" },
        "get"
      );
      const params = {
        url: "/file/selectSysFile",
        loadingFlag: true,
        encrypted: false,
        params: {
          reqBody: {
            moduleId: this.contractId,
          },
          reqHead: {
            // "token": res.token
          },
        },
      };
      console.log(params, "params");
      App.Native.sendShark(params).then((res) => {
        console.log(res, 1111111);
        if (res.rspHead.returnCode == "00000000") {
          this.fileList = res.rspBody.data;
        }
      });
    },
    // 下载附件
    downLoadFile(item) {
      console.log(item, "item");
      getSessionStorage("model").then((res) => {
        if (res.indexOf("iPhone") > -1) {
          //iOS走下载流程
          let fileType = item.fileName.split(".").pop();
          let opt = {
            url: "/file/downloadFileByte", //H5写死，一般情况下固定不变
            bucketName: item.bucketName, //
            type: fileType, //类型
            fileName: item.fileName, //文件名
          };
          console.log(opt, "opt");
          App.Native.streamDownload(opt).then((res) => {
            console.log(res, "res");
          });
        }
        //安卓虚拟域名走拦截
        //  this.docx=`/cibr/file/downloadFileByte?fileName=${item.fileName}&bucketName=${item.bucketName}`
        this.excel = `/cibr/file/downloadFileByte?fileName=${item.fileName}&bucketName=${item.bucketName}`;
        //  this.pdf=`/cibr/file/downloadFileByte?fileName=${item.fileName}&bucketName=${item.bucketName}`
        //  this.docx = "https://501351981.github.io/vue-office/examples/dist/static/test-files/test.docx"
        console.log("文件", this.docx, this.excel, this.pdf);
        this.show = true;
      });
      //   console.log(this.docx)
    },
    // 点击产品卡片,查看详情页
    productDetail(productId) {
      // 先将要传递的参数保存到本地
      App.Native.dataDB(
        { type: "set", key: "productId", value: productId },
        "set"
      );
      // 跳转到产品详情页面
      App.Router.pushWindow(
        "/contract/contractPage/productDetail.html?newWebview=1"
      );
    },
    // 主联系人跳转
    goContactInfo() {
      App.Native.dataDB({ type: "set", key: "fromCon", value: "1" }, "set");
      App.Router.pushWindow("/customer/cus0/cus0A06.html?newWebview=1", {
        contactName: this.contactInfo.contactName,
        postName: this.contactInfo.postName,
        deptName: this.contactInfo.deptName,
        fixedLinePhone: this.contactInfo.fixedLinePhone,
        telephone: this.contactInfo.telephone,
        email: this.contactInfo.email,
        isInner: this.contactInfo.isInner,
      });
    },
    // 订阅池跳转
    goSubPool() {
      if (this.subscriptionStatus === "已配置订阅池") {
        App.Native.dataDB(
          { type: "set", key: "subId", value: this.contractNo },
          "set"
        );
        App.Native.dataDB({ type: "set", key: "isInner", value: "0" }, "set");
        App.Native.dataDB(
          { type: "set", key: "fromContract", value: "1" },
          "set"
        );
        App.Router.pushWindow(
          "subscribe/subscribePage/viewSubPage.html?newWebview=1"
        );
      } else {
        this.$toast.fail("该合同未配置订阅池");
        return;
      }
    },
    // 返回上一层
    goHome() {
      App.Native.closeContainer();
    },
  },
};
</script>

<style lang="less" scoped>
.tab {
  /deep/ .van-tabs__line {
    background-color: #3c6cfe;
    width: 16px;
    height: 2px;
    bottom: 22px;
    border-radius: 4.5px;
  }
  /deep/ .van-tab--active {
    color: #1d2341;
  }
}
.group {
  margin-top: 8px;
  .line {
    display: flex;
    height: 58px;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding: 0 16px;
    .left {
      width: 30%;
      font-size: 14px;
      color: #1d2341;
      font-weight: 500;
    }
    .right {
      width: 70%;
      text-align: right;
      font-size: 14px;
      color: #1d2341;
      font-weight: 400;
    }
    .rightStatus {
      width: 70%;
      text-align: right;
      font-size: 14px;
      color: #3c6cfe;
      font-weight: 400;
    }
  }
  .other {
    // height: 123px;
    background-color: #fff;
    padding: 0 16px;
    margin-bottom: 20px;
    .left {
      font-size: 14px;
      color: #1d2341;
      font-weight: 500;
      height: 58px;
      line-height: 58px;
    }
    .file {
      height: 58px;
      img {
        margin-right: 8px;
      }
      display: flex;
      align-items: center;
    }
  }
}
.van-cell {
  min-height: 58px;
  padding: 0 16px;
  font-weight: 500;
  font-size: 14px;
  color: #1d2341;
  .tags {
    font-weight: 400;
    color: #1d2341;
  }
}
// .button_box{
//   margin-bottom: 34px;
//   padding: 0 31.5px;
//   .button_box_pass{
//     margin: 32px 0 8px 0;
//     width: 312px;
//     height: 46px;
//     background: #3C6CFE;
//     border-radius: 8px;
//     color: #fff;
//     font-size: 16px;
//     text-align: center;
//     line-height: 46px;
//     border: none;
//   }
//   .button_box_back{
//     width: 312px;
//     height: 46px;
//     background: #fff;
//     border-radius: 8px;
//     color: #3C6CFE;
//     font-size: 16px;
//     text-align: center;
//     line-height: 46px;
//     border: 1px solid rgba(60,108,254,1);
//   }
// }
.product_box {
  position: relative;
  box-sizing: border-box;
  width: auto;
  margin: 8px 16px 0 16px;
  padding: 16px 16px;
  background: #fff;
  box-shadow: 0px 2px 10px 0px rgba(71, 105, 255, 0.1);
  border-radius: 8px;
  h2 {
    font-size: 16px;
    color: #1d2341;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  h2::before {
    position: absolute;
    left: 0;
    top: 19px;
    content: "";
    display: inline-block;
    width: 3px;
    height: 16px;
    background-color: #3c6cfe;
  }
  .product_box_line {
    width: 100%;
    height: 1px;
    background: rgba(142, 152, 180, 0.1);
    margin: 8px 0;
  }
  .word {
    .content {
      display: flex;
      justify-content: space-between;
      margin-top: 8px;
      div {
        font-size: 12px;
        color: #1d2341;
        letter-spacing: 0;
        font-weight: 400;
      }
      .content_status {
        color: #3c6cfe;
      }
    }
  }
}
/deep/ .van-cell:after {
  position: relative;
}
</style>
