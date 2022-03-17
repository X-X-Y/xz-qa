<template>
    <div>

        <mt-header title="学子问答">
            <router-link to="/" slot="left">
                <mt-button icon='back'></mt-button>
            </router-link>
            <router-link to="/login" slot="right">
                <mt-button>登录</mt-button>
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
            <mt-field type='password'
                label='确认密码'
                placeholder='请再次确认密码'
                :state='confirmPasswordState'
                v-model="confirmPassword"
                @blur.native.capture='checkConfirmPassword'
            ></mt-field>
            <button class="confirm" @click='check()'>
                免费注册
            </button>
        </div>
        
    </div>
</template>

<script>
    export default{
        data(){
            return {
                usernameState:'',
                passwordState:'',
                confirmPasswordState:'',
                username:'',
                password:'',
                confirmPassword:''
            }
        },
        methods:{
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
            checkConfirmPassword(){
                if((this.confirmPassword==this.password)&&(this.confirmPassword!='')){
                    this.confirmPasswordState = 'success';
                    return true;
                }else{
                    this.confirmPasswordState = 'error';
                    return false;
                }
            },
            check(){
                if(this.checkUsername()&&this.checkPassword()&&this.checkConfirmPassword()){
                    var data = {
                        username:this.username,
                        password:this.password
                    }
                    
                    this.axios.post('/register', this.qs.stringify(data)).then(res=>{
                        if(res.data.code == 201){
                            this.$messagebox.alert('用户名已经存在', '注册提示');
                        }else if(res.data.code = 200){
                            this.$toast('注册成功，即将跳转首页');
                            this.$router.push('/');
                        }
                    })
                }else{
                    this.$messagebox.alert('用户名或密码不符合规范', '注册提示');
                }
            }
        }
    }
</script>
