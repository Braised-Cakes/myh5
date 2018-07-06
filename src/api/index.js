import fetch from './fetch'

/**
 * 获取场景列表
 */

export const getSceneList = data => fetch('/aj/scene/list', data);

/**
 * 创建场景
 */

export const addScene = data => fetch('/aj/scene/add', data, 'POST');

/**
 * 删除场景
 */

export const delScene = data => fetch('/aj/scene/del', data);

/**
 * 发布场景
 */

export const publishScene = data => fetch('/aj/scene/publish', data, 'POST');

/**
 * 更新场景
 */

export const updateScene = data => fetch('/aj/scene/update', data, 'POST');

/**
 * 获取指定场景
 */

export const getScene = data => fetch('/aj/scene/get', data);

/**
 * 保存场景
 */

export const saveScene = data => fetch('/aj/scene/save', data, 'POST');

export const getShapeNav = () => fetch('/aj/shape/nav');
export const getShape = data => fetch('/aj/shape/get', data);
export const getShapeContent = data => fetch('/aj/shape/getContent', data);


export const getMusicNav = () => fetch('/aj/music/nav');
export const getMusic = data => fetch('/aj/music/get', data);
export const choiceMusic = data => fetch('/aj/music/choice', data);


export const getImageNav = () => fetch('/aj/image/nav');
export const getImage = data => fetch('/aj/image/get', data);
export const choiceImage = data => fetch('/aj/image/choice', data);

/**
 * 创建二维码
 */

export const createQRCode = data => fetch('/aj/qrcode/create', data);

/**
 * 用户注册
 */

export const userRegister = data => fetch('/aj/user/register', data, 'POST');

/**
 * 用户登录
 */

export const userLogin = data => fetch('/aj/user/login', data, 'POST');

/**
 * 用户登出
 */

export const userLogout = data => fetch('/aj/user/logout', data, 'POST');

/**
 * 获取用户信息
 */

export const getUserInfo = data => fetch('/aj/user/info', data);

/**
 * 获取上传token
 */

export const getToken = data => fetch('/aj/upload/token', data);

export const userUpload = data => fetch('/aj/image/user_upload', data, 'POST');
export const userUploadMusic = data => fetch('/aj/music/user_upload', data, 'POST');
