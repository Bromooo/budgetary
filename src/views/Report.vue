<template>
  <loading v-if="loading" />
  <div v-else class="w-full">
    <form
      @submit.prevent="getReport"
      class="lg:w-[500px] mx-auto w-full lg:max-w-[500px]"
    >
      <div class="flex items-start justify-between w-full gap-2 mb-6">
        <div class="w-1/2">
          <label class="text-sm text-primary-blue font-poppins"
            >Start date:</label
          >
          <input
            class="border border-grey-30 rounded-xl w-full py-4 px-6"
            type="date"
            :max="yesterday"
            v-model="form.startDate"
          />
        </div>
        <div class="w-1/2" v-if="form.startDate">
          <label class="text-sm text-primary-blue font-poppins"
            >End date:</label
          >
          <input
            class="border border-grey-30 rounded-xl w-full py-4 px-6"
            type="date"
            v-model="form.endDate"
            :max="today"
            :min="startDateVal"
          />
        </div>
      </div>
      <base-button
        v-if="form.startDate && form.endDate"
        type="submit"
        :isLoading="generating"
        >Generate</base-button
      >
    </form>
    <div class="w-full mt-14" v-if="report.length">
      <card class="px-0">
        <div v-if="csvArr.length" class="px-8 mb-5 w-full flex justify-end">
          <JsonCSV :data="csvArr" name="Finances Report.csv">
            <auto-outline-button>Export to csv</auto-outline-button>
          </JsonCSV>
        </div>
        <div
          class="
            w-full
            flex
            items-center
            justify-between
            py-2
            px-8
            border-b-2 border-b-grey-10
            lg:gap-0
            gap-4
          "
          :class="{
            'border-t-2 border-t-grey-10': index === 0,
          }"
          v-for="(rep, index) in report"
          :key="rep._id"
        >
          <div class="w-1/2 lg:w-auto">
            <p
              class="font-semibold"
              :class="[
                rep.summaryStatistics.type === 'debit'
                  ? 'text-grey-30 text-sm'
                  : 'text-green-50 text-xl',
              ]"
            >
              {{ removeReport(rep.reportType) }}
            </p>
            <p class="text-xl font-semibold text-grey-80">
              {{ rep.summaryStatistics.category }}
            </p>
          </div>
          <div
            class="flex flex-col items-end h-full gap-3 justify-between"
            :class="[
              rep.summaryStatistics.type === 'debit'
                ? 'text-red-50'
                : 'text-green-50',
            ]"
          >
            <p class="text-xs">{{ rep.summaryStatistics.type }}</p>
            <h2 class="text-xl font-semibold">
              {{ $numberFormat(rep.summaryStatistics.amount) }}
            </h2>
            <p class="text-sm text-grey-90 font-semibold">
              {{ $formatDate(rep.date) }}
            </p>
          </div>
        </div>
        <div v-if="csvArr.length" class="px-8 mt-5 w-full flex justify-end">
          <JsonCSV :data="csvArr" name="Finances Report.csv">
            <auto-outline-button>Export to csv</auto-outline-button>
          </JsonCSV>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
import BaseButton from "@/components/BaseButton.vue";
import Card from "@/components/Card.vue";
const { default: Loading } = require("@/components/Loading.vue");
import JsonCSV from "vue-json-csv";
import AutoOutlineButton from "@/components/AutoOutlineButton.vue";

export default {
  components: { Loading, BaseButton, Card, JsonCSV, AutoOutlineButton },
  data() {
    return {
      loading: false,
      generating: false,
      csvArr: [],
      form: {
        startDate: "",
        endDate: "",
      },
      report: [],
    };
  },
  computed: {
    yesterday() {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() - 1);
      // Format the date to "YYYY-MM-DD"
      const formattedDate = tomorrow.toISOString().slice(0, 10);
      return formattedDate;
    },
    today() {
      const today = new Date();
      // today.setDate(today.getDate() - 1);
      // Format the date to "YYYY-MM-DD"
      const formattedDate = today.toISOString().slice(0, 10);
      return formattedDate;
    },
    startDateVal() {
      const today = new Date(this.form.startDate);
      today.setDate(today.getDate() + 1);
      // Format the date to "YYYY-MM-DD"
      const formattedDate = today.toISOString().slice(0, 10);
      return formattedDate;
    },
  },
  methods: {
    removeReport(inputString) {
      return inputString.replace(
        new RegExp("\\b" + "Report" + "\\b", "gi"),
        ""
      );
    },
    capitalizeFirstLetter(inputString) {
      if (inputString.length === 0) return inputString; // Handle empty string case

      const firstLetter = inputString.charAt(0).toUpperCase();
      const restOfString = inputString.slice(1);

      return firstLetter + restOfString;
    },
    async getReport() {
      this.generating = true;
      await this.$store
        .dispatch("postRequest", { path: "report/gen-report", data: this.form })
        .then((resp) => {
          this.generating = false;
          this.report = resp.data.reports.data.reverse();
          if (this.report.length) {
            this.csvArr = [];
            this.report.forEach((rep) => {
              var obj = {
                Action: this.capitalizeFirstLetter(rep.summaryStatistics.type),
                Amount: this.$numberFormat(rep.summaryStatistics.amount),
                Type: this.capitalizeFirstLetter(
                  this.removeReport(rep.reportType)
                ),
                Category: this.capitalizeFirstLetter(
                  this.removeReport(
                    rep.summaryStatistics.category
                      ? rep.summaryStatistics.category
                      : ""
                  )
                ),
                Date: this.$formatDate(rep.date),
              };
              this.csvArr.push(obj);
            });
            // console.log(this.csvArr);
          }
        });
    },
  },
};
</script>

<style>
</style>