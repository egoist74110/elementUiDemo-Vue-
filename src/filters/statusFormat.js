import Vue from 'vue'
Vue.filter("statusFormat", (status) => {
    switch(status) {
        case 1:
            return "启用";
            break;
        case 2:
            return "禁用";
            break;
    }
})
Vue.filter("yesorno", (status) => {
    switch(status) {
        case 1:
            return "是";
            break;
        case 2:
            return "否";
            break;
    }
})
Vue.filter("addoredit",(status)=>{
  switch(status){
    case 0:
      return "顶级菜单"
  }
})
