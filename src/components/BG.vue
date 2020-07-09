<template>
  <div>
    <canvas style="position:absolute;left:0;top:0;z-index:1;" id="html5_3d_animation" width="1920" height="1080">Internet Explorer 8 Not Supported</canvas>
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      
    };
  },
  async created() {	
  },
  mounted() {
        $("#html5_3d_animation").html5_3d_animation({
            window_width: '1920',
            window_height: '1080',
            window_background: '#00113F',
            star_count: '500',
            star_color: '#fff',
            star_depth: '100'
        });
  },
  methods: {

  }
};
</script>