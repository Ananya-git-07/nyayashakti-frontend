import { FaFileAlt, FaLandmark, FaShieldAlt, FaIdCard, FaMoneyBillWave } from 'react-icons/fa';

const IssueCard = ({ issue }) => {
    const statusStyles = {
        Pending: 'bg-yellow-100 text-yellow-800',
        Submitted: 'bg-blue-100 text-blue-800',
        Escalated: 'bg-orange-100 text-orange-800',
        Resolved: 'bg-green-100 text-green-800',
    };
    
    const ICONS = {
      "Land Dispute": <FaLandmark className="text-green-600"/>,
      "Pension Issue": <FaMoneyBillWave className="text-blue-600"/>,
      "Aadhaar Issue": <FaIdCard className="text-indigo-600"/>,
      "Court Summon": <FaFileAlt className="text-gray-600"/>,
      "Fraud Case": <FaShieldAlt className="text-red-600"/>,
       "Certificate Missing": <FaFileAlt className="text-purple-600"/>,
      "Other": <FaFileAlt className="text-gray-500"/>
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-3">
                 <div className="text-2xl">{ICONS[issue.issueType] || ICONS['Other']}</div>
                 <h3 className="text-lg font-bold text-gray-800">{issue.issueType}</h3>
              </div>
              <span className={`px-3 py-1 text-sm font-semibold rounded-full ${statusStyles[issue.status] || 'bg-gray-200'}`}>
                {issue.status}
              </span>
            </div>
            <p className="text-gray-600 mt-2 truncate">{issue.description}</p>
            <div className="text-right text-sm text-gray-500 mt-4">
              {new Date(issue.createdAt).toLocaleDateString()}
            </div>
        </div>
    );
}

export default IssueCard;