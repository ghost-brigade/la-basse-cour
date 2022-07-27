import { request } from './request_management';
import { getUserToken } from "./user_management";

export const reportUser = async (report) => {
    const token = getUserToken();

    const reported = await request(`/profile/report`, {
        'method': 'POST',
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        'body': JSON.stringify(report)
    });
    return reported;
}