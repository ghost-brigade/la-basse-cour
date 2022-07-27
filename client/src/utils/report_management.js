import { request } from './request_management';
import { getUserFromLink, getUserToken } from "./user_management";

const reasons = [
  {'id': 'harassment', 'label': 'Harcèlement'},
  {'id': 'fake_profile', 'label': 'Faux profil'},
  {'id': 'others', 'label': 'Autres'},
];

export const getReasons = () => {
  return reasons;
}

export const translateReason = (reason) => {
    return getReasons().find(r => r.id === reason).label;
}

export const reportUser = async (report) => {
    const token = getUserToken();

    return await request(`/profile/report`, {
        'method': 'POST',
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        'body': JSON.stringify(report)
    });
}

export const getReports = async (userId) => {
  const token = getUserToken();

  const reports = await request('/admin/reports', {
    'method': 'GET',
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  const reportsFilled = [];
  for (let index in reports) {
    const report = reports[index];
    report.user = await getUserFromLink('/user/' + report.addresseeId);
    reportsFilled.push(report);
  }
  return reportsFilled;
};

export const checkReport = async (reportId) => {
  const token = getUserToken();

  return await request(`/admin/report/check/${reportId}`, {
    'method': 'GET',
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
}

export const banReport = async (reportId) => {
  const token = getUserToken();
  
  return await request(`/admin/report/ban/${reportId}`, {
    'method': 'GET',
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
}
