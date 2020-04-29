/*
 * @file:
 * @author: quguoliang
 * @Date: 2020-04-29 15:25:50
 * @LastEditors: quguoliang
 * @LastEditTime: 2020-04-29 18:47:45
 */
import Request from "../../utils/request";

export const demo = (data) => {
  return Request({
    url: "路径",
    method: "POST",
    data,
  });
};

export default {
  demo,
};
