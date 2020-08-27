<template>
    <div class="header">
        <slot></slot>
<i class="iconfont icon-back" v-if="back" @click='goBack'></i>
    </div>
</template>

<script>
    export default {
        props:{
            back:{
                type:Boolean,
                default:false
            }
        },
        methods:{
            goBack(){
                this.$router.go(-1)
            }
        }
    }
</script>

<style lang="less" scoped>
.header{
    background: lightblue;
    height: 40px;
    text-align: center;
    line-height: 40px;
    position: fixed;
    top: 0;
    left:0;
    width: 100%;
    font-weight: bold;
    i{
        position: absolute;
        left:10px;
        font-size: 20px;
    }
}
</style>