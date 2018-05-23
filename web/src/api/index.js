import fetch from './fetch'
export const getSceneData = data => fetch('/aj/scene/getPublishData', data);