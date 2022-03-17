<template>
    <div>
        
        <mt-header title="我的文章">
            <router-link to="/me" slot="left">
                <mt-button icon='back'></mt-button>
            </router-link>
        </mt-header>
        
        <div class="ckecklist">
            
            <mt-checklist :options='selectOptions'
                    v-model="selected"
                    @change="checkSelect">
            </mt-checklist>
            
            <div class="rmbtn">
                <a href="#" @click="remove">删除</a>
            </div>
            
            <mt-checklist :options='articleOptions'
                v-model="articlelist"></mt-checklist>
                
        </div>
        
    </div>
</template>

<style>
    .ckecklist{
        position: relative;
    }
    .rmbtn{
        position: absolute;
        right: 10px;
        top: 6px;
        padding: 3px;
    }
    .rmbtn a{
        display: block;
        width: 60px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        font-size: 14px;
        border-radius: 15px;
        background: #002a4b;
        color: #fff;
        text-decoration: none;
    }
</style>

<script>
    import {mapState, mapMutations} from 'vuex'
    export default{
        computed:{
            ...mapState([
                'id'
            ])
        },
        data(){
            return{
                selectOptions:[
                    {
                        label:'全部选择',
                        value:'1'
                    }
                ],
                selected:[],
                articleOptions:[],
                articlelist:[]
            }
        },
        methods:{
            ...mapMutations({
                minusArticles:'minusArticles'
            }),
            checkSelect(){
                this.articlelist = [];
                if(this.selected.join()=='1'){
                    this.articleOptions.forEach((item)=>{
                        this.articlelist.push(item.value);
                    })
                }
            },
            remove(){
                if(this.articlelist.length == 0){
                    this.$messagebox.alert('请选择要删除的文章', '系统提示');
                }else{
                    this.$messagebox.confirm('确认要删除文章吗？删除后无法恢复', '删除确认').then((action)=>{
                        this.axios.post('/removeArticles', 'id=' + this.articlelist).then(res=>{
                            if(res.data.code == 200){
                                var a = this.articleOptions;
                                var b = this.articlelist;
                                this.articleOptions = a.filter(function(v){
                                    return b.indexOf(v.value) == -1
                                });
                                this.minusArticles(b.length);
                                this.$toast({
                                    message:'删除成功',
                                    position:'middle'
                                })
                            }
                        });
                    }).catch(()=>{

                    });
                }
            }
        },
        created(){
            this.axios.get('/getArticles?cid=' + this.id).then(res=>{
                this.articleOptions = res.data.articles;
            });
        }
    }
</script>