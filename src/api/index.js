import fetch from './fetch'

/**
 * 获取job列表
 * http://agroup.baidu.com/toos/md/article/427596
 */
export const getJobList = ({
    page,
    productId,
    jobId,
    jobStatus,
    startTime,
    endTime,
    resourceType,
    fuzzyRequest
}) => fetch({
    url: '/job/list/?',
    data: {
        page: page,
        pagecount: 10,
        productId: productId,
        jobId: jobId,
        jobStatus: jobStatus,
        startTime: startTime,
        endTime: endTime,
        resourceType: resourceType,
        fuzzyRequest: fuzzyRequest
    }
});
