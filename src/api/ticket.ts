/**
 * 车票相关接口
 */
import http from "@/utils/http";

export const addTicket = (id: number) => {
  return http({
    url: `/ticket/addTicket/${id}`,
    method: "post",
  });
};
export const selectTicket = () => {
  return http({
    url: "/ticket/searchTicket",
    method: "get",
  });
};

export const deleteTicket = (id: number) => {
  return http({
    url: `/ticket/deleteTicket/${id}`,
    method: "post",
  });
};
