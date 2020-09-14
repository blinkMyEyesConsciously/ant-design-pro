import {equals} from "ramda"

/**
 * 判断业务的状态是否是成功的
 * @param data
 * @returns {boolean}
 */
export const isSuccess = (data: any) => {
    return equals ('ok') (data.status)
}
/**
 * 空函数
 */
export const emptyFun = () => {

}















