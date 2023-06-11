<template>
  <div>
    <!--    <vue-office-pdf src="/dummy.pdf" />-->
    <!--    <vue-office-excel src="/Book1.xlsx" style="height: 100vh" />-->
    <vue-office-docx src="/hello.docx" style="height: 100vh" />
  </div>
</template>

<script lang="js">

import '@vue-office/docx/lib/index.css'
import VueOfficeDocx from '@vue-office/docx'
import VueOfficeExcel from '@vue-office/excel'
import VueOfficePdf from '@vue-office/pdf'

export default {
  name: "PageTwo",
  components: { VueOfficePdf,VueOfficeExcel,VueOfficeDocx },
  data() {
    return {
      pdf:"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      excel:"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    };
  },
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: left;
  margin-bottom: 8px;
  align-items: baseline; /* 调整为基线对齐 */
}
</style>
