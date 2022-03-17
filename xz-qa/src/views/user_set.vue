<template>
    <div>
        
        <mt-header title="个人设置">
            <router-link to="/me" slot="left">
                <mt-button icon='back'></mt-button>
            </router-link>
        </mt-header>
        
        <div class="user_pic">
            <img src="../assets/images/userpic.jpg" alt="">
        </div>
        
        <div>
            <mt-field type='text'
                label='用户昵称'
                placeholder='请输入用户名'
                :state='usernameState'
                v-model="username"
                @blur.native.capture='checkUsername'
            ></mt-field>
            <mt-field type='password'
                label='新密码'
                placeholder='请输入新密码'
                :state='passwordState'
                v-model="password"
                @blur.native.capture='checkPassword'
            ></mt-field>
            <mt-field type='password'
                label='确认新密码'
                placeholder='请再次确认新密码'
                :state='confirmPasswordState'
                v-model="confirmPassword"
                @blur.native.capture='checkConfirmPassword'
            ></mt-field>
            <button class="confirm" @click='check()'>
                确认修改
            </button>
        </div>
        
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    export default{
        computed:{
            ...mapState([
                'nickname',
                'id'
            ])
        },
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
        created(){
            this.username = this.nickname;
        },
        methods:{
            ...mapMutations({
                updateNickname:'updateNickname'
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
                        id:this.id,
                        nickname:this.username,
                        password:this.password
                    };
                    this.axios.post('/change', this.qs.stringify(data)).then(res=>{
                        this.updateNickname(this.username);
                    });
                    this.$toast({
                        message:'修改成功',
                        position:'middle'
                    });
                    console.log('提交成功');
                }else{
                    console.log('用户名或密码错误')
                }
            }
        }
    }
</script>

<style>
    .user_pic{
        padding: 30px 15px;
        text-align: center;
    }
    .user_pic img{
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .confirm{
        width: 100%;
        line-height: 40px;
        background: #26a2ff;
        color: #fff;
        margin: 12px auto;
        border: none;
        outline: none;
    }
</style>