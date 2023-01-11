import { login as loginApi, getUserInfo } from "@/api/user";
import { StoreOptions, Store } from "vuex";
const createModule = <S>(store: StoreOptions<S>) => store as Store<S>;
export interface UserState {
  token: string;
  isAdmin: boolean;
}
export const user = createModule({
  /**
  namespaced: true,

      // 模块内容（module assets）
      state: () => ({ ... }), // 模块内的状态已经是嵌套的了，使用 `namespaced` 属性不会对其产生影响
      getters: {
        isAdmin () { ... } // -> getters['account/isAdmin']
      },
      actions: {
        login () { ... } // -> dispatch('account/login')
      },
      mutations: {
        login () { ... } // -> commit('account/login')
  */
  //  namespaced: true,

  // 模块内容（module assets）
  state: () => ({ token: "", isAdmin: false }), // 模块内的状态已经是嵌套的了，使用 `namespaced` 属性不会对其产生影响
  getters: {},
  actions: {
    // 可以异步，提交mutitation
    async login(contex: any, formdata: any) {
      const res = await loginApi(formdata);
      // 判断是否登录成功
      if (res.data.data) {
        localStorage.setItem("token", res.data.data); // 将token本地存储
        // headers: { Authorization: `Bearer ${token}` } // 在获取信息时添加
        contex.commit("login", res.data.data); // 改变token状态
        // 判断是否为管理员
        contex.commit("SET_ADMIN", res.data.user_identity == 1);
        console.log(res);
        return res; // 成功
      } else return res;
    }, // -> dispatch('user/login')
  },
  mutations: {
    // 直接更改状态
    login(state: UserState, token: string) {
      // 更改token
      state.token = token;
    }, // -> commit('user/login')
    // 变更状态
    SET_ADMIN(state: UserState, b: boolean) {
      state.isAdmin = b;
    },
    CLEAN_USER_INFO(state: UserState) {
      state.token = "";
      state.isAdmin = false;
    },
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  namespaced: true,
});
