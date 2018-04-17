import fetch from './fetch'

export const getJobList = data => fetch('/aj/list/get', data);
export const addList = () => fetch('/aj/list/add');
export const delList = data => fetch('/aj/list/del', data);


export const getEdit = data => fetch('/aj/edit/get', data);
export const saveEdit = data => fetch('/aj/edit/save', data, 'POST');


export const getShapeNav = () => fetch('/aj/shape/nav');
export const getShape = data => fetch('/aj/shape/get', data);
export const getShapeContent = data => fetch('/aj/shape/getContent', data);


export const userRegister = data => fetch('/aj/user/register', data, 'POST');
export const userLogin = data => fetch('/aj/user/login', data, 'POST');
export const getUserInfo = data => fetch('/aj/user/info', data);
