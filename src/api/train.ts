/**
 * 车次相关api
 */
import http from "@/utils/http";
export const getAllTrains = () => {
  return http({
    url: "/trainNo/selectAll",
    method: "get",
  });
};

export const getTrainById = (id: number) => {
  return http({
    url: `trainNo/selectById/${id}`,
    method: "get",
  });
};

export const deleteTrain = (id: number) => {
  return http({
    url: `/trainNo/deleteById/${id}`,
    method: "post",
  });
};

export const addTrain = (data: any) => {
  return http({
    url: "/trainNo/add",
    method: "post",
    data,
  });
};
