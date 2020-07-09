<template>
  <div class="alarm subMain">
    <!-- <alarmView /> -->
    <!-- <equipmentState /> -->
    <!-- <monitoring /> -->
    <voiceRadio />
  </div>
</template>
<script>
import alarmView from "./alarmView";
import equipmentState from "./equipmentState";
import monitoring from "./monitoring";
import voiceRadio from "./voiceRadio";
export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    alarmView,
    equipmentState,
    monitoring,
    voiceRadio
  },
  created() {},
  mounted() {
    this.$nextTick(function() {});
  },
  methods: {}
};
</script>
