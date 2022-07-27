import { useEffect, useState } from "react";
import UserReport from "../components/admin/UserReport";
import { banReport, checkReport, getReports } from "../utils/report_management";

const AdminPage = (props) => {
    const [userId, setUserId] = useState("");
    const [reports, setReports] = useState([]);

    useEffect(() => {
        refreshReports();
    }, [userId]);

    const refreshReports = async () => {
        const reports = await getReports(userId);
        setReports(reports);
    }

    
    const handleCheck = async (reportId) => {
        const result = await checkReport(reportId);
        console.log(result);
        refreshReports();
    }
    const handleBan = async (reportId) => {
        const result = await banReport(reportId);
        refreshReports();
    }

    return (
        <div className='app_admin-page'>
            <h2>Utilisateurs signalés</h2>
            <div className="app_admin-list">
                {reports
                .filter(report => !report.resolved)
                .map(report => {
                    return <UserReport 
                        reportId={report.id}
                        key={`report_${report.id}`} 
                        user={report.user} 
                        reason={report.reason}
                        comment={report.comment}
                        handleCheck={handleCheck}
                        handleBan={handleBan}
                    />
                })}
            </div>
        </div>
    );
}

export default AdminPage;