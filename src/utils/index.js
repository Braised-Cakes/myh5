/**
 * 根据数字状态码返回中文状态
 * @param {*} id 
 * @param {*} list 
 */
export const getName = (id, list) => {
    for (let i = 0; i < list.length; i++) {
        if (list[i].id === id) {
            return list[i].name;
        }
    }
}
