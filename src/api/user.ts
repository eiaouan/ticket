import http from "@/utils/http";

export const login = ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  return http({
    url: `/user/login`,
    method: "post",
    data: {
      loginName: username,
      password,
    },
  });
};
// import axios from "axios";
// export const login = async (data: any) => {
//   return axios
//     .post("/api/user/login", data)
//     .then(function (response) {
//       console.log(response);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// };

export const getUserInfo = () => {
  return http({
    url: `/user/currentUser`,
    method: "get",
  });
};

/**
 *
 * @param data userId,loginName,userNanme,password
 * @returns
 */
export const updateUserInfo = (data: any) => {
  return http({
    url: `/user/editor`,
    method: "get",
    data,
  });
};

export const userLayout = () => {
  return http({
    url: `/user/logout`,
    method: "get",
  });
};

export const register = ({
  loginName,
  username,
  password,
}: {
  loginName: string;
  username: string;
  password: string;
}) => {
  const data = { loginName, userName: username, password };
  return http({
    url: "/user/register",
    method: "post",
    data: data,
  });
  // return http.post("/user/register", {
  //   loginName,
  //   userName: username,
  //   password,
  // });
};
