<template>
    <div class="article">
        <mt-header title="青龙帮">
            <router-link to='/' slot="left">
                <mt-button icon='back'></mt-button>
            </router-link>
        </mt-header>

        <div class="article-header">
            <div class="article-header-title">
                {{info.subject}}
            </div>
            <div class="article-header-datetime">
                {{moment.unix(info.created_at).format('Y年MM月DD日HH:mm')}}
            </div>
        </div>
        
        <div class="author-info">
            <div class="author-info-pic">
                <img :src="info.avatar">
            </div>
            <div class="author-info-detail">
                <div class="author-info-nickname">{{info.nickname}}</div>
                <div>
                    共<mt-badge type='success' size='small'>{{info.article_number}}</mt-badge>篇
                </div>
            </div>
        </div>
        
        <div class="article-content" v-html="info.content">
            
        </div>
        
    </div>
</template>

<script>
    export default{
        data(){
            return{
                id:'',
                info:{}
            }
        },
        created(){
            this.id = this.$route.params.id;
            
            this.axios.get('/getArticle?id=' + this.id).then(res=>{
                console.log(this.id);
                this.info = res.data.info;
                this.info.avatar = require('../assets/images/avatar/' + this.info.avatar);
            });
        }
    }
</script>

<style>
    .article{
        background: #f6f6f6;
        height: 100vh;
    }
    .article-header{
        margin-bottom: 5px;
        padding: 10px;
        background: #fff;
        box-shadow: 0 1px 3px rgba(26, 26, 26, .1);
    }
    .article-header-title{
        font-size: 18px;
        color: #1a1a1a;
        line-height: 1.5;
    }
    .article-header-datetime{
        margin-top: 5px;
        font-size: 14px;
        color: #646464;
    }
    .author-info{
        display: flex;
        align-items: center;
        margin-left: 15px;
        border: 2px;
        padding: 10px;
        background: #fff;
    }
    .author-info-pic img{
        width: 40px;
        height: 40px;
        border-radius: 100%;
    }
    .author-info-detail{
        font-size: 15px;
        margin-left: 8px;
    }
    .author-info-nickname{
        margin-bottom: 4px;
    }
    .article-content{
        margin-top: 5px;
        padding: 10px;
        background-color: #fff;
        line-height: 1.7;
    }
    .article-content p{
        padding: 5px 0;
    }
    .article-content img{
        max-width: 100%;
    }
</style>