<template>
    <div>
        
        <mt-header title="学子问答">
            <router-link to="/" slot="left">
                <mt-button icon='back'></mt-button>
            </router-link>
            <router-link to="/register" slot="right">
                <mt-button>注册</mt-button>
            </router-link>
        </mt-header>
        
        <div>
            <mt-field type='text'
                label='用户昵称'
                placeholder='请输入用户名'
                :state='usernameState'
                v-model="username"
                @blur.native.capture='checkUsername'
            ></mt-field>
            <mt-field type='password'
                label='密码'
                placeholder='请输入密码'
                :state='passwordState'
                v-model="password"
                @blur.native.capture='checkPassword'
            ></mt-field>
            <button class="confirm" @click='check()'>
                快捷登录
            </button>
        </div>
        
    </div>
</template>

<script>
    import {mapMutations} from 'vuex'
    export default{
        data(){
            return {
                usernameState:'',
                passwordState:'',
                username:'',
                password:''
            }
        },
        methods:{
            ...mapMutations({
                logined:'logined'
            }),
            checkUsername(){
                if(this.username != ''){
                    this.usernameState = 'success';
                    return true;
                }else{
                    this.usernameState = 'error';
                    return false;
                }
            },
            checkPassword(){
                let passwordRxgExp = /^[a-zA-Z0-9_]{6,10}$/;
                if(passwordRxgExp.test(this.password)){
                    this.passwordState = 'success';
                    return true;
                }else{
                    this.passwordState = 'error';
                    return false;
                }
            },
            check(){
                if(this.checkUsername()&&this.checkPassword()){
                    var data = {
                        username:this.username,
                        password:this.password
                    };
                    this.axios.post('/login', this.qs.stringify(data)).then(res=>{
                        if(res.data.code == 202){
                            this.$messagebox.alert('用户名或密码错误', '登录提示');
                        }else if(res.data.code == 200){
                            this.logined(res.data.info);
                            // 判断是不是从别的页面跳到登录的
                            if(this.$route.query.path){
                                this.$toast('登录成功，即将跳转回原来页面');
                                this.$router.push(this.$route.query.path);
                            }else{
                                this.$toast('登录成功，即将跳转回原来页面');
                                this.$router.push('/');
                            }
                        }
                    });
                }else{
                    this.$messagebox.alert('用户名或密码不符合规范', '登录提示');
                }
            }
        }
    }
</script>
