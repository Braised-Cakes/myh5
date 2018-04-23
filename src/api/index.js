import fetch from './fetch'

export const getJobList = data => fetch('/aj/list/get', data);
export const addList = () => fetch('/aj/list/add');
export const delList = data => fetch('/aj/list/del', data);


export const getEdit = data => fetch('/aj/edit/get', data);
export const saveEdit = data => fetch('/aj/edit/save', data, 'POST');


export const getShapeNav = () => fetch('/aj/shape/nav');
export const getShape = data => fetch('/aj/shape/get', data);
export const getShapeContent = data => fetch('/aj/shape/getContent', data);


export const getMusicNav = () => fetch('/aj/music/nav');
export const getMusic = data => fetch('/aj/music/get', data);
export const choiceMusic = data => fetch('/aj/music/choice', data);


export const getImageNav = () => fetch('/aj/image/nav');
export const getImage = data => fetch('/aj/image/get', data);
export const choiceImage = data => fetch('/aj/image/choice', data);


export const createQRCode = data => fetch('/aj/qrcode/create', data);


export const userRegister = data => fetch('/aj/user/register', data, 'POST');
export const userLogin = data => fetch('/aj/user/login', data, 'POST');
export const getUserInfo = data => fetch('/aj/user/info', data);
