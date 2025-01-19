import { get, post } from "../utils/http/index";

/**
 * 首页文章列表
 * @param pageCount
 * @returns {*}
 */
function homeDocList(pageCount) {
  return get(`article/list/${pageCount}/json`);
}

/**
 * 首页置顶文章列表
 * @returns {*}
 */
function homeTopDocList() {
  return get("article/top/json");
}

/**
 * 首页banner
 * @returns {*}
 */
function homeBanner() {
  return get("banner/json");
}


/**
 * 获取搜索热词列表
 * @returns {*}
 */
function getSearchHotWords() {
  return get("hotkey/json");
}

/**
 * 获取常用网站列表
 * @returns {*}
 */
function getCommonWebSite() {
  return get("friend/json");
}

/**
 * 知识体系树
 * @returns {*}
 */
function knowledgeTree() {
  return get("tree/json");
}

/**
 * 知识体系详细
 * @returns {*}
 */
function knowledgeDetail(cid, pageCount) {
  return get(`article/list/${pageCount}/json`, { "cid": cid });
}

/**
 * 收藏
 * @param id
 * @returns {Promise<*>}
 */
function collect(id) {
  return get(`lg/collect/${id}/json`);
}

/**
 * 取消收藏
 * @param id
 * @returns {Promise<*>}
 */
function cancelCollect(id) {
  return get(`lg/uncollect_originId/${id}/json`);
}

/**
 * 获取我的收藏
 * @param pageCount
 * @returns {Promise<*>}
 */
function getMyCollects(pageCount) {
  return get(`lg/collect/list/${pageCount}/json`);
}

/**
 * 搜索
 * @param keyWord
 * @param pageCount
 * @returns {Promise<*>}
 */
function search(keyWord, pageCount = 0) {
  return post(`article/query/${pageCount}/json`, { "k": keyWord }, true);
}

/**
 * 项目分类
 * @returns {Promise<*>}
 */
function projectType() {
  return get("project/tree/json");
}

/**
 * 项目列表
 * @param pageCount
 * @param cid
 * @returns {Promise<*>}
 */
function projectList(cid, pageCount = 1) {
  return get(`project/list/${pageCount}/json?cid=${cid}`);
}

/**
 * 鸿蒙开发相关数据
 * @returns {Promise<*>}
 */
function harmonyList() {
  return get(`harmony/index/json`);
}

/**
 * 登录
 * @param username
 * @param password
 * @returns {Promise<*>}
 */
function login(username, password) {
  const params = {
    "username": username,
    "password": password
  };
  return post("user/login", params, true);
}

/**
 * 登出
 * @returns {Promise<*>}
 */
function logout() {
  return get("user/logout/json");
}

/**
 * 注册账号
 * @param username
 * @param password
 * @param repassword
 * @returns {Promise<*>}
 */
function register(username, password, repassword) {
  const params = {
    "username": username,
    "password": password,
    "repassword": repassword
  };
  return post("user/register", params, true);
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
