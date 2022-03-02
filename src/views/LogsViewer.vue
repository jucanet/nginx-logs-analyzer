<template>
  <div id="logs">
    <div class="logsHeader">
      <date-picker
        v-model="logDate"
        type="date"
        format="DD/MM/YYYY"
        @change="getLogsByDate"
      ></date-picker>
    </div>
    <div class="logsBody">
      <v-grid
        theme="default"
        :source="JSON.parse(this.Logs)"
        :columns="columns"
      ></v-grid>
    </div>
  </div>
</template>

<script>
import VGrid from "@revolist/vue-datagrid"
import { mapGetters, mapActions } from "vuex"
import DatePicker from "vue2-datepicker"
import "vue2-datepicker/index.css"
import "vue2-datepicker/locale/pt-br"

export default {
  name: "LogsViewer",
  components: {
    VGrid,
    DatePicker,
  },
  data() {
    return {
      logDate: new Date(),
      columns: [
        {
          prop: "ip",
          name: "ip",
          size: 100,
          sortable: true,
        },
        {
          prop: "log_date",
          name: "log_date",
          size: 100,
          sortable: true,
        },
        {
          prop: "log_time",
          name: "log_time",
          size: 100,
          sortable: true,
        },
        {
          prop: "username",
          name: "username",
          size: 400,
          sortable: true,
        },
        {
          prop: "logged",
          name: "logged",
          size: 100,
          sortable: true,
        },
        {
          prop: "nomefantasia",
          name: "nomefantasia",
          size: 500,
          sortable: true,
        },
        {
          prop: "sigla",
          name: "sigla",
          size: 100,
          sortable: true,
        },
        {
          prop: "quantidade",
          name: "quantidade",
          size: 50,
          sortable: true,
        },
      ],
      rows: [
        {
          ip: "143.208.237.95",
          log_date: "21/02/2022",
          username: "THUNDERBEES",
          logged: "FAIL",
          nomefantasia: "COL\u00c9GIO ESP\u00cdRITO SANTO",
          sigla: "CES",
          quantidade: 2.0,
        },
        {
          ip: "143.208.237.95",
          log_date: "21/02/2022",
          username: "THUNDERBEES",
          logged: "OK",
          nomefantasia: "COL\u00c9GIO ESP\u00cdRITO SANTO",
          sigla: "CES",
          quantidade: 1.0,
        },
      ],
    }
  },
  created: function () {
    const params = new URLSearchParams()
    params.append("logDate", this.logDate.toLocaleDateString())
    this.GetLogs(params)
  },
  computed: {
    ...mapGetters({ Logs: "StateLogs", User: "StateUser" }),
  },
  methods: {
    ...mapActions(["GetLogs"]),
    async getLogsByDate() {
      try {
        const params = new URLSearchParams()
        params.append("logDate", this.logDate.toLocaleDateString())
        await this.GetLogs(params)
      } catch (error) {
        throw "Sorry you can't get logs now!"
      }
    },
  },
}
</script>

<style>
#logs {
  margin: auto;
  height: 80vh;
  width: 90%;
  /* background-color: blue; */
  /* display: flexbox; */
  padding: 10px;
}
revo-grid {
  height: 100%;
  width: 100%;
}

.logsHeader {
  margin: auto;
  width: 90%;
  padding: 10px;
  border: 1px solid #c3c3c3;
  display: flex;
  align-items: right;
  justify-content: right;
}

.logsBody {
  margin: auto;
  height: 80vh;
  width: 90%;
  padding: 10px;
}
</style>
