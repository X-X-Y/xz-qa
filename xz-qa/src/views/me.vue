<template>
    <div>
        
        <mt-header title="个人中心">
            <router-link to="/" slot="left">
                <mt-button icon='back'></mt-button>
            </router-link>
        </mt-header>
        
        <div>
            <div>
                <mt-cell title="个人设置" isLink to='/user_set' icon='back'>
                    <img src="../assets/images/set.png" slot="icon">
                </mt-cell>
            </div>
            <div>
                <mt-cell title="我的文章" isLink to='/user_article' icon='back'>
                    <img src="../assets/images/mine.png" slot="icon">
                    <mt-badge size='small'>{{article_number}}篇</mt-badge>
                </mt-cell>
            </div>
        </div>
        
        <mt-tabbar v-model="bottomActive" fixed>
            <mt-tab-item id="index">
                <img v-if="bottomActive=='index'" src="../assets/images/main_1.png" slot="icon">
                <img v-else src="../assets/images/main_0.png" slot="icon">
                首页
            </mt-tab-item>
            <mt-tab-item id="me">
                <img v-if="bottomActive=='me'" src="../assets/images/me_1.png" slot="icon">
                <img v-else src="../assets/images/me_0.png" slot="icon">
                我的
            </mt-tab-item>
        </mt-tabbar>
        
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default{
        computed:{
            ...mapState([
                'article_number'
            ])
        },
        data(){
            return{
                bottomActive:'me'
            }
        },
        watch:{
            bottomActive(){
                if(this.bottomActive=='index'){
                    this.$router.push('/');
                }else if(this.bottomActive=='me'){
                    this.$router.push('/me');
                }
            }
        }
    }
</script>