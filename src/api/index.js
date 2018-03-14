import fetch from './fetch'

export const getJobList = data => fetch('/aj/list/get', data);
export const addList = ({}) => fetch('/aj/list/add');
export const delList = data => fetch('/aj/list/del', data);
