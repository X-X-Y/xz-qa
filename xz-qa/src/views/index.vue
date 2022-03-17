<template>
    <div>
        
        <mt-header title="学子问答">
            <div slot="right" class="shortcut" v-if="!islogined">
                <router-link to="/register">
                    <mt-button>
                        注册
                    </mt-button>
                </router-link>
                <router-link to="/login">
                    <mt-button>
                        登录
                    </mt-button>
                </router-link>
            </div>

            <div slot="right" v-else>
                <mt-button @click="logout">
                    <img src="../assets/images/mine.png" slot="icon">
                </mt-button>
            </div>
        </mt-header>
        
        <mt-navbar v-model="topActive">
            <mt-tab-item v-for="(item, index) in category" :key="index"
                :id="`${item.id}`">
                {{item.category_name}}
            </mt-tab-item>
        </mt-navbar>
        
        <div class="mainPanel"
            infinite-scroll-distance='10'
            v-infinite-scroll='loadMore'
            imfinite-scroll-disabled='busy'
            infinite-scroll-immediate-check='true'
            >
            <mt-tab-container v-model="topActive">
                <mt-tab-container-item
                    v-for="(item,index) in category" :key="index"
                    :id="`${item.id}`">
                    
                    <div class="infoItem"
                        v-for="(article,index) in articles" :key="index">
                        
                        <div class="infoItemHead">
                            <router-link :to="`/detail/${article.id}`">
                                {{article.subject}}
                            </router-link>
                        </div>
                        
                        <div class="infoItemContent">
                            <div class="infoItemImage" v-if="article.image!=null">
                                <router-link :to="{name:'Article',params:{id:article.id}}">
                                    <img v-lazy="`${article.image}`">
                                </router-link>
                            </div>
                            <div class="infoItemDes">
                                {{article.description}}
                            </div>
                        </div>
                        
                    </div>
                    
                </mt-tab-container-item>
            </mt-tab-container>
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
    import {mapState, mapMutations} from 'vuex'
    export default{
        computed:{
            ...mapState([
                'islogined'
            ])
        },
        data(){
            return{
                topActive:'1',
                bottomActive:'index',
                category:[],
                articles:[],
                busy:false,
                pageCount:'',
                page:1
            }
        },
        watch:{
            topActive(){
                this.articles = [];
                // 在切换选项卡后从当前选项卡的第一页获取数据
                this.page = 1;
                this.getArticles();
            },
            bottomActive(){
                if(this.bottomActive=='index'){
                    this.$router.push('/');
                }else if(this.bottomActive=='me'){
                    this.$router.push('/me');
                }
            }
        },
        created(){
            this.axios.get('/category').then(res=>{
                this.category = res.data.category;
            });

            this.getArticles();
        },
        methods:{
            ...mapMutations([
                'logoutMutation'
            ]),
            logout(){
                this.logoutMutation();
                this.$toast('注销成功');
            },
            getArticles(){
                // 将服务器的状态进行切换
                this.busy =  true;
                this.$indicator.open({
                    text:'加载中',
                    spinnerText:'snake'
                });
                
                this.axios.get('/list?cid=' + this.topActive + '&page=' + this.page).then(res=>{
                    var array = res.data.articles;
                    this.pageCount = res.data.pageCount;
                    array.forEach((item) => {
                        if(item.image != null){
                            item.image = require('../assets/images/articles/' + item.image);
                        }
                        this.articles.push(item);
                    });
                    
                    this.busy =  false;
                    // 关闭提示框不能写在ajax请求外面，可能会关不掉
                    this.$indicator.close();
                });
            },
            loadMore(){
                this.page++;

                // 分页当前页码的值与总页数的比较运算决定是否向服务器发送请求
                if(this.page <= this.pageCount){
                    this.getArticles();
                }
            }
        }
    }
</script>

<style>
    .shortcut a{
        margin-left: 4px;
        color: #fff;
    }
    .infoItemHead{
        line-height: 22px;
        color: #1a1a1a;
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 5px;
    }
    .infoItemHead a{
        color: #000;
        text-decoration: none;
    }
    .mainPanel{
        margin-bottom: 55px;
    }
    .infoItem{
        padding: 10px 10px;
        border-bottom: 2px solid #555;
    }
    .infoItemContent{
        display: flex;
        align-content: center;
        width: 100%;
    }
    .infoItemImage{
        margin-right: 15px;
    }
    .infoItemImage img{
        width: 112px;
        border-radius: 5px;
    }
    .infoItemDes{
        font-size: 15px;
        font-weight: 400;
        line-height: 21px;
        color: #444;
        height: 66px;
        overflow: hidden;
    }
</style>