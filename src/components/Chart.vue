<template>
  <loading v-if="!chartData" />
  <card v-if="chartData && chartDataSet.datasets.length">
    <div>
      <h2 class="mb-4 font-poppins text-lg font-medium text-grey-50">
        Expense chart
      </h2>
      <div class="h-[22vh]">
        <Line :data="chartDataSet" :options="options" />
      </div>
    </div>
  </card>
</template>

<script>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";
import Loading from "./Loading.vue";
import Card from "./Card.vue";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default {
  data() {
    return {
      chartData: null,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        borderWidth: 1,
        pointRadius: 0,
      },
    };
  },
  computed: {
    chartDataSet() {
      return this.transformData(this.chartData);
    },
    balance() {
      return this.$store.getters.balance;
    },
  },
  watch: {
    balance() {
      this.getChartData();
    },
  },
  components: {
    Line,
    Loading,
    Card,
  },
  methods: {
    transformData(input) {
      // Extract labels and datasets
      const colours = ["#d62728", "#ff7f0e", "#9467bd", "#1f77b4", "#2ca02c"];
      const labels = Object.keys(input);
      const datasets = [];

      // Extract dataset keys and initialize data arrays
      const datasetKeys = [];
      // console.log(input);
      // console.log(Object.keys(input[labels[i]]));
      for (let i = 0; i < labels.length; i++) {
        Object.keys(input[labels[i]]).forEach((okey) => {
          if (!datasetKeys.includes(okey)) datasetKeys.push(okey);
        });
      }
      // console.log(datasetKeys);
      // return;
      const dataArrays = {};
      for (const key of datasetKeys) {
        dataArrays[key] = new Array(labels.length).fill(0);
      }
      // console.log(dataArrays);
      // return null
      // Populate data arrays
      for (let i = 0; i < labels.length; i++) {
        for (const [key, value] of Object.entries(input[labels[i]])) {
          dataArrays[key][i + 1] = value;
        }
      }

      // Convert data arrays to datasets
      for (const [key, data] of Object.entries(dataArrays)) {
        datasets.push({
          label: key,
          data: data,
        });
      }
      var dataset = datasets.sort((a, b) => {
        const sumA = a.data.reduce((acc, val) => acc + val, 0);
        const sumB = b.data.reduce((acc, val) => acc + val, 0);
        return sumB - sumA;
      });
      dataset = datasets.slice(0, 5);
      var sum = 1;
      for (let i = dataset.length - 1; i >= 0; i--) {
        dataset[i]["backgroundColor"] = colours[colours.length - sum];
        dataset[i]["borderColor"] = colours[colours.length - sum];
        sum++;
      }
      // console.log(dataset);
      // Return the final format
      const myLabels = ["", ...labels];
      // console.log(myLabels);
      return {
        labels: myLabels,
        datasets: dataset,
      };
    },
    getChartData() {
      this.$store.dispatch("getRequest", { path: "chart" }).then((resp) => {
        // console.log(resp);
        this.chartData = resp.data;
      });
    },
  },
  mounted() {
    this.getChartData();
  },
};
</script>

<style>
</style>