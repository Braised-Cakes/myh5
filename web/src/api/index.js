import fetch from './fetch'
export const getJobList = data => fetch('/aj/list/get', data);