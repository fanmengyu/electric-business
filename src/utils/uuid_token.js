import { v4 as uuidv4 } from 'uuid';
//封装函数:只能生成一次用户临时身份
let  uuId;
export const getUUId = () => {
    uuId = localStorage.getItem('UUIDTOKEN');
    if (!uuId) {
         uuId = uuidv4();
        localStorage.setItem('UUIDTOKEN', uuId);
    }
    return  uuId;
}