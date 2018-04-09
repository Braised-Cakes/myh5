import fetch from './fetch'

export const getJobList = data => fetch('/aj/list/get', data);
export const addList = ({}) => fetch('/aj/list/add');
export const delList = data => fetch('/aj/list/del', data);


export const getEdit = data => fetch('/aj/edit/get', data);
export const saveEdit = data => fetch('/aj/edit/save', data, 'POST');



export const getShape = data => fetch('/aj/shape/get', data);
export const getShapeContent = data => fetch('/aj/shape/getContent', data);