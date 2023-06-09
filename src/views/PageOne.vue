<template>
  <div>
    <div class="card" v-for="card in cardsList" :key="card.activityTheme">
      <div class="header">
        <div class="left">
          <h3>
            {{ card.activityTheme }}
          </h3>
        </div>
        <div class="right"></div>
        <div class="line"></div>
      </div>

      <div class="body">
        <div class="content">
          <span>类型:</span>
          <span></span>
        </div>
        <div class="content">
          <span>参与人:</span
          ><span v-for="(item, index) in card.organVoList" :key="index">
            {{ item.organName
            }}<span
              v-if="
                index != card.organVoList.length - 1 &&
                card.organVoList.length > 1 &&
                item.organName
              "
              >,</span
            >
          </span>
        </div>
        <div class="content">
          <span>开始时间:</span>
          <span>{{
            card.startTimeStr ? card.startTimeStr.substr(0, 16) : ""
          }}</span>
        </div>
        <div class="content">
          <span>结束时间:</span>
          <span>{{
            card.endTimeStr ? card.endTimeStr.substr(0, 16) : ""
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cardsList: [
        {
          activityTheme: "活动1",
          activityState: "approved",
          activityType: "类型1",
          organVoList: [
            { organName: "参与人1" },
            { organName: "asdfaklsdj" },
            { organName: "哈哈哈" },
          ],
          startTimeStr: "2023-06-08T10:00:00",
          endTimeStr: "2023-06-08T12:00:00",
        },
        {
          activityTheme: "活动2",
          activityState: "pending",
          activityType: "类型2",
          organVoList: [{ organName: "参与人4" }, { organName: "参与人5" }],
          startTimeStr: "2023-06-09T14:00:00",
          endTimeStr: "2023-06-09T16:00:00",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
$blue: #3c6cfe;

.container {
  padding: 0 20px;
}

.add-button {
  color: $blue;
  display: flex;
  flex-direction: row-reverse;
  padding-right: 10px;
  padding-top: 10px;
}

.card {
  margin: 10px auto;
  width: 100%;
  border-radius: 20px;
  box-shadow: 0 2px 10px rgba(71, 105, 255, 0.1);

  .header {
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 8px 8px 0 0;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 90%;
      border-bottom: 2px solid #f6f6fa;
      transform: translateX(-50%);
    }

    .left {
      margin: 12px 0;
      padding: 0 16px;
      border-left: 4px solid $blue;
      text-align: left;
      display: flex;
      align-items: center;
      font-size: 16px;

      h3 {
        font-weight: normal;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        word-wrap: break-word;
        word-break: break-word;
        //word-break: break-all;
      }
    }

    .right {
      margin-left: auto;
      margin-right: 10px;

      .trash {
        height: 20px;
        width: 20px;
      }
    }
  }
}

.body {
  border-radius: 0 0 8px 8px;
  background-color: white;
  padding: 16px;
  font-size: 14px;

  .content {
    display: flex;
    justify-content: left;
    margin-bottom: 8px;
    align-items: baseline; /* 调整为基线对齐 */

    span {
      vertical-align: middle; /* 使用垂直居中对齐方式 */
    }
    .value {
      width: 70%;
      text-align: right;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
}
</style>
