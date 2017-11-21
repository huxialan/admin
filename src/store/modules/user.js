import Cookies from 'js-cookie';

const user = {
  state: {
    token: Cookies.get('Admin-Token'),
    id: '',
    account:'',
    password:'',
    avatar: '',
    roles: [],
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_ID :(state,id) =>{
      state.id =id;
    },
    SET_ACCOUNT: (state,account) => {
      state.account = account;
    },
    SET_PASSWORD: (state,password) => {
      state.password = password;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    }
  },
  actions: {
        //得到用户列表
        GetUserList({commit},info){
          return new Promise((resolve,reject)=>{
            axios.get('/api/admin/getUserAll',{
              params:{
                  page:info.page,
                  pagesize:info.pagesize,
              }
            }).then(function (response) {
              var  code=response.data.errorcode;
              if(code=="200"){
                resolve(response.data.data);
              } else {
                reject(response.data.errormsg);
              }
            }).catch((error)=>{
              reject("网络失败");
            })
          })
        },
    //获取用户概览
    GetUserImage(){
       return new Promise((resolve,reject)=>{
         axios.get('/api/admin/getUserAllImage').then(function (responce) {
            var code=response.data.errorcode;
            if (code=="200"){
              resolve(response.data.data);
            }else {
              reject(response.data.errormsg);
            }
         }).catch((error)=>{
           reject(error);
         })
       })
    },
    //获取店家列表
    GetStoreList({commit},info){
          return new Promise((resolve,reject)=>{
            axios.get('/api/admin/getStoreAll',{
              params:{
                page:info.page,
                  pagesize:info.pagesize,
              }
            }).then(function (response) {
              var  code=response.data.errorcode;
              if (code=="200"){
                resolve(response.data.data);
              }else {
                reject(response.data.errormsg);
              }
            }).catch((error)=>{
              reject(error);
            })
          })
    },
    //获取启用商家列表
    GetStoreStart({commit},info){
      return new Promise((resolve,reject)=>{
        axios.get('/api/admin/getStartStore',{
          params:{
            page:info.page,
            pagesize:info.pagesize,
          }
        }).then(function (response) {
          var  code=response.data.errorcode;
          if (code=="200"){
            resolve(response.data.data);
          }else {
            reject(response.data.errormsg);
          }
        }).catch((error)=>{
          reject(error);
        })
      })
    },
    //获取禁用商家列表
    GetStopStore({commit},info){
      return new Promise((resolve,reject)=>{
        axios.get('/api/admin/getStopStore',{
          params:{
            page:info.page,
            pagesize:info.pagesize,
          }
        }).then(function (response) {
          var  code=response.data.errorcode;
          if (code=="200"){
            resolve(response.data.data);
          }else {
            reject(response.data.errormsg);
          }
        }).catch((error)=>{
          reject(error);
        })
      })
    },

    //获取商品列表
    GetGoodsList({commit}, info) {
      return new Promise((resolve, reject)=>{
      axios.get('/api/admin/getGoodsAll', {
        params: {
          page: info.page,
          pagesize: info.pagesize,
        }

      }).then(function (response) {
        var  code=response.data.errorcode;
        if (code=="200"){
             resolve(response.data.data);
        }else {
          reject(response.data.errormsg)
        }
      }).catch((error)=>{
          reject(error);
      })
    })
    },
    //获取所有订单
    GetOrderList({commit},info){
          return new Promise((resolve,reject)=>{
            axios.get('/api/admin/getOrderAll',{
              params:{
                page: info.page,
                pagesize: info.pagesize,
              }
            }).then(function (response) {
              var  code=response.data.errorcode;
              if (code=="200"){
                resolve(response.data.data);
              }else {
                reject(response.data.errormsg);
              }
            }).catch((error)=>{
              reject(error);
            })

          })
    },
    //获取收入列表
   GetIncomeList({commit},info){
     return new Promise((resolve,reject)=>{
       axios.get('/api/admin/getIncomeList',{
         params:{
           page: info.page,
           pagesize: info.pagesize,
         }
       }).then(function (response) {
         var  code=response.data.errorcode;
         if (code=="200"){
           resolve(response.data.data);
         }else {
           reject(response.data.errormsg);
         }
       }).catch((error)=>{
         reject(error);
       })

     })

   },
    //获取支出列表
    GetOutcomeList({commit},info){
      return new Promise((resolve,reject)=>{
        axios.get('/api/admin/getOutcomeList',{
          params:{
            page: info.page,
            pagesize: info.pagesize,
          }
        }).then(function (response) {
          var  code=response.data.errorcode;
          if (code=="200"){
            resolve(response.data.data);
          }else {
            reject(response.data.errormsg);
          }
        }).catch((error)=>{
          reject(error);
        })

      })

    },
    //获取会员申请列表
    GetMemberList({commit},info){
      return new Promise((resolve,reject)=>{
        axios.get('/api/admin/getMemberApply',{
          params:{
            page: info.page,
            pagesize: info.pagesize,
          }
        }).then(function (response) {
          var  code=response.data.errorcode;
          if (code=="200"){
            resolve(response.data.data);
          }else {
            reject(response.data.errormsg);
          }
        }).catch((error)=>{
          reject(error);
        })

      })

    },
    //获取村村通申请列表
    GetVillageList({commit},info){
      return new Promise((resolve,reject)=>{
        axios.get('/api/admin/getVillageApply',{
          params:{
            page: info.page,
            pagesize: info.pagesize,
          }
        }).then(function (response) {
          var  code=response.data.errorcode;
          if (code=="200"){
            resolve(response.data.data);
          }else {
            reject(response.data.errormsg);
          }
        }).catch((error)=>{
          reject(error);
        })

      })

    },
    //获取商城申请列表
    GetStoreApplyList({commit},info){
      return new Promise((resolve,reject)=>{
        axios.get('/api/admin/getStoreApply',{
          params:{
            page: info.page,
            pagesize: info.pagesize,
          }
        }).then(function (response) {
          var  code=response.data.errorcode;
          if (code=="200"){
            resolve(response.data.data);
          }else {
            reject(response.data.errormsg);
          }
        }).catch((error)=>{
          reject(error);
        })

      })

    },

    //获取提现申请列表
    GetWithDrawList({commit},info){
      return new Promise((resolve,reject)=>{
        axios.get('/api/admin/getWithDrawApply',{
          params:{
            page: info.page,
            pagesize: info.pagesize,
          }
        }).then(function (response) {
          var  code=response.data.errorcode;
          if (code=="200"){
            resolve(response.data.data);
          }else {
            reject(response.data.errormsg);
          }
        }).catch((error)=>{
          reject(error);
        })

      })

    },

//获取轮播图列表
    GetBanneList({commit},info){
      return new Promise((resolve,reject)=>{
        axios.get('/api/banner/getbanner',{
          params:{
            page: info.page,
            pagesize: info.pagesize,
          }
        }).then(function (response) {
          var  code=response.data.errorcode;
          if (code=="200"){
            resolve(response.data.data);
          }else {
            reject(response.data.errormsg);
          }
        }).catch((error)=>{
          reject(error);
        })

      })

    },
    // 管理员登入
    LoginByAccount({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        let timerss=new Date().getTime();

        commit('SET_TOKEN',timerss);

        axios.get('/api/admin/login',{
          params:{
            admin:userInfo.admin,
            passworld:userInfo.password,
          }
        }).then(function (response) {
          var code=response.data.errorcode;
          if(code="200"){
            let timers=new Date().getTime();
            Cookies.set('Admin-token',timers+response.data.data.id);
            commit('SET_ID',response.data.data.id);
            commit('SET_ACCOUNT',response.data.data.account);
            commit('SET_PASSWORD',response.data.data.passworld);
            commit('SET_TOKEN',timers+response.data.data.id);
            resolve();
          }else {
            reject(response.data.errormsg);
          }
        }).catch(()=>{
          reject("网络错误");
        })
      });
    },
    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_ROLES', ['admin']);
        commit('SET_AVATAR', 'http://oz4zfzmr0.bkt.clouddn.com/store3.jpg');
        resolve(['admin']);
      });
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '');
        Cookies.remove('Admin-Token');
        resolve();
      });
    },

    // 动态修改权限
    ChangeRole({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_ROLES', [role]);
        commit('SET_TOKEN', role);
        Cookies.set('Admin-Token', role);
        resolve();
      });
    }
  }
};

export default user;
