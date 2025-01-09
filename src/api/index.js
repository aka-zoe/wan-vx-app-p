import { get, post } from "../utils/http/index";

/**
 * 首页文章列表
 * @param pageCount
 * @returns {*}
 */
async function homeDocList(pageCount) {
  return await get(`article/list/${pageCount}/json`);
}

/**
 * 首页置顶文章列表
 * @returns {*}
 */
async function homeTopDocList() {
  return await get("article/top/json");
}

/**
 * 首页banner
 * @returns {*}
 */
async function homeBanner() {
  return await get("banner/json");
}


/**
 * 获取搜索热词列表
 * @returns {*}
 */
async function getSearchHotWords() {
  return await get("hotkey/json");
}

/**
 * 获取常用网站列表
 * @returns {*}
 */
async function getCommonWebSite() {
  return await get("friend/json");
}

/**
 * 知识体系树
 * @returns {*}
 */
async function knowledgeTree() {
  return await get("tree/json");
}

/**
 * 知识体系详细
 * @returns {*}
 */
async function knowledgeDetail(cid, pageCount) {
  return await get(`article/list/${pageCount}/json`, { "cid": cid });
}

/**
 * 收藏
 * @param id
 * @returns {Promise<*>}
 */
async function collect(id) {
  return await get(`lg/collect/${id}/json`);
}

/**
 * 取消收藏
 * @param id
 * @returns {Promise<*>}
 */
async function cancelCollect(id) {
  return await get(`lg/uncollect_originId/${id}/json`);
}

/**
 * 获取我的收藏
 * @param pageCount
 * @returns {Promise<*>}
 */
async function getMyCollects(pageCount) {
  return await get(`lg/collect/list/${pageCount}/json`);
}

/**
 * 搜索
 * @param keyWord
 * @param pageCount
 * @returns {Promise<*>}
 */
async function search(keyWord, pageCount = 0) {
  return await post(`article/query/${pageCount}/json`, { "k": keyWord }, true);
}

/**
 * 项目分类
 * @returns {Promise<*>}
 */
async function projectType() {
  return await get("project/tree/json");
}

/**
 * 项目列表
 * @param pageCount
 * @param cid
 * @returns {Promise<*>}
 */
async function projectList(pageCount = 1, cid) {
  return await get(`project/list/${pageCount}/json?cid=${cid}`);
}

/**
 * 鸿蒙开发相关数据
 * @returns {Promise<*>}
 */
async function harmonyList() {
  return await get(`harmony/index/json`);
}

/**
 * 登录
 * @param username
 * @param password
 * @returns {Promise<*>}
 */
async function login(username, password) {
  const params = {
    "username": username,
    "password": password
  };
  return await post("user/login", params, true);
}

/**
 * 登出
 * @returns {Promise<*>}
 */
async function logout() {
  return await get("user/logout/json");
}

/**
 * 注册账号
 * @param username
 * @param password
 * @param repassword
 * @returns {Promise<*>}
 */
async function register(username, password, repassword) {
  const params = {
    "username": username,
    "password": password,
    "repassword": repassword
  };
  return await post("user/register", params, true);
}

export default {
  homeDocList,
  homeTopDocList,
  homeBanner,
  getSearchHotWords,
  getCommonWebSite,
  knowledgeTree,
  knowledgeDetail,
  collect,
  cancelCollect,
  getMyCollects,
  search,
  projectType,
  projectList,
  harmonyList,
  login,
  logout,
  register
};
