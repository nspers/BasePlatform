<template>
    <div class="bc_bgbox">
        <!-- {{use}} -->
        <!-- <i v-for="(item,index) in use">
            {{item.name}}
        </i> -->
        <span @click="fnBroadcasting" @mouseenter="bcTextE" @mouseleave="bcTextL">{{bc_text}}</span>
        <div class="bc_wavebox">
            <div class="wave"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "broadcasting",
        data() {
            return {
                bc_text: "正在喊话"
            };
        },
        props:{
            use:Array
        },
        methods: {
            bcTextE(){
                this.bc_text = "停止喊话"
            },
            bcTextL(){
                this.bc_text = "正在喊话"
            },
            fnBroadcasting(){
                // this.$store.state.bcSwitch = !this.$store.state.bcSwitch;
                this.$parent.handleBoradControl()
            },
        }
    }
</script>

<style lang="scss" scoped>
    .bc_bgbox{
        position: fixed;
        bottom: 0;
        right: 0;
        margin: auto;
        width: 5.22rem;
        height: 1.24rem;
        background-color: rgba(0,59,89,.8);
        border-radius: .62rem;
        z-index: 100;
        span{
            margin: 0 .36rem;
            font-size: .25rem;
            color: #fff;
            line-height: 1.24rem;
            vertical-align: middle;
            cursor: pointer;
            text-shadow: none;
        }
        span:hover {
            color: #f60;
        }
        .bc_wavebox{
            overflow: hidden;
            display: inline-block;
            position: relative;
            width: 3rem;
            height: .7rem;
            vertical-align: middle;
            .wave{
                position: absolute;
                left: -101%;
                width: 200%;
                height: 100%;
                background: url("../assets/img/control/bc_wave.png") repeat-x 0 0/auto 100%;
                animation: rollingWave 5s linear infinite;
            }
            @keyframes rollingWave {
                from {left: -101%;}
                to {left: 0;}
            }
        }
    }
</style>