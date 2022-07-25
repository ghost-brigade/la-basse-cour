export const sendLog = (data, type = null) => {
    /*
    console.log({
        'log': {
            'data': data,
            'type': type,
            'timestamp': new Date().toTimeString(),
        },
    });
    */
}

export const sendSuccessLog = (data) => {
    sendLog(data, 'success');
}

export const sendErrorLog = (data) => {
    sendLog(data, 'error');
}