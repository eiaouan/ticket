// 时间格式化

// type Opt = {
//   "y+": string; // 年
//   "M+": string; // 月
//   "d+": string; // 日
//   "h+": string; // 时
//   "m+": string; // 分
//   "s+": string; // 秒
//   "W+"?: string; // 星期
//   "Q+": string; // 季度
// };

export enum Fmt {
  date = "yyyy-MM-dd",
  datetime = "yyyy-MM-dd hh:mm:ss",
}

export function dateFormat(f?: Fmt, d?: Date) {
  const fmt: Fmt = f || Fmt.datetime;
  const date = d ? new Date(d) : new Date();
  //   let result;
  //   const weekArr = ["日", "一", "二", "三", "四", "五", "六"];
  //   const opt: Opt = {
  //     "y+": date.getFullYear().toString(), // 年
  //     "M+": (date.getMonth() + 1).toString(), // 月
  //     "d+": date.getDate().toString(), // 日
  //     "h+": date.getHours().toString(), // 时
  //     "m+": date.getMinutes().toString(), // 分
  //     "s+": date.getSeconds().toString(), // 秒
  //     "W+": date.getDay().toString(), // 星期
  //     "Q+": Math.ceil((date.getMonth() + 1) / 3).toString(), // 季度   // 有其他格式化字符需求可以继续添加，必须转化成字符串
  //   };
  if (fmt == Fmt.date) {
    return `${date.getFullYear().toString()}-${(
      date.getMonth() + 1
    ).toString()}-${date.getDate().toString()}`;
  } else {
    return `${date.getFullYear().toString()}-${(
      date.getMonth() + 1
    ).toString()}-${date.getDate().toString()} ${date
      .getHours()
      .toString()}-${date.getMinutes().toString()}-${date
      .getSeconds()
      .toString()}`;
  }
}

export const pickerDateFormat = (d: any, f?: Fmt) => {
  const fmt: Fmt = f || Fmt.datetime;
  if (fmt == Fmt.date) {
    return `${d.$y}-${d.$M + 1}-${d.$D}`;
  } else {
    return `${d.$y}-${d.$M + 1}-${d.$D} ${d.$H}-${d.$m}-${d.$s}`;
  }
};
