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
      loginNmae: username,
      password,
    },
  });
};

export const getUserInfo = () => {
  return http({
    url: `htt/user/currentUserp`,
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
    method: "post",
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
  return http({
    url: "/user/register",
    method: "post",
    data: { loginName, userName: username, password },
  });
};
