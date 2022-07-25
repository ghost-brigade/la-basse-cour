import { sendErrorLog, sendSuccessLog } from "./log_management";

export const request = async (url, options) => {
    try {
        return await fetch(`http://localhost:3000${url}`, options)
        .then(response => {
            if (!response.ok) {
                sendErrorLog(`${response.status} ${response.statusText} ${url}`);
            } else {
                sendSuccessLog({
                    'url': url,
                });
            }
            return response.json();
        })
        .catch(error => {
            sendErrorLog(error);
        });
    } catch (error) {
        sendErrorLog(error);
        return null;
    }
}