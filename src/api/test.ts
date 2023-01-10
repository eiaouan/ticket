import http from "../utils/http";

export const getData = async () => {
  return http({
    url: "http://localhost:3004",
    method: "get",
  });
};
