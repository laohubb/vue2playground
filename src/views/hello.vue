<template>
  <div>
    <VueOfficeExcel :src="excel" style="height: 100vh; width: 100%" />
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
  mounted() {},
  methods: {
    // 下载附件
    downLoadFile(item) {
      //安卓虚拟域名走拦截
      //  this.docx=`/cibr/file/downloadFileByte?fileName=${item.fileName}&bucketName=${item.bucketName}`
      this.excel = `/cibr/file/downloadFileByte?fileName=${item.fileName}&bucketName=${item.bucketName}`;
      //  this.pdf=`/cibr/file/downloadFileByte?fileName=${item.fileName}&bucketName=${item.bucketName}`
      //  this.docx = "https://501351981.github.io/vue-office/examples/dist/static/test-files/test.docx"
      console.log("文件", this.docx, this.excel, this.pdf);
      this.show = true;
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
