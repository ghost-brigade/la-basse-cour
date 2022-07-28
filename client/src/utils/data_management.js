import { request } from "./request_management";
import { getUserToken } from "./user_management";

export const getStatusCount = async () => {
    const token = getUserToken();

    return await request('/data/status_count', {
        'method': 'GET',
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
    });
}

export const getVisitToday = async () => {
    return await getVisitDate(new Date());
}

export const getVisitDate = async (date) => {
    const token = getUserToken();

    return await request('/data/visit_by_date', {
        'method': 'POST',
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        'body': JSON.stringify({
            'date': date
        })
    });
}

export const getVisitHour = async () => {
    const token = getUserToken();

    return await request('/data/visit_by_hour', {
        'method': 'GET',
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
    });
}

export const getUsersByDate = async () => {
    const token = getUserToken();

    return await request('/data/users_by_date', {
        'method': 'GET',
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
    });
}