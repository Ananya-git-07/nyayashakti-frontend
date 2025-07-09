import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../api/apiClient';
import IssueCard from '../components/IssueCard';
import { FaPlus } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth(); // We might need the user's name

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        // This endpoint is protected and specific to the logged-in citizen
        const response = await apiClient.get('/citizens/issues');
        setIssues(response.data.issues);
      } catch (err) {
        setError('Failed to fetch your issues. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchIssues();
  }, []);

  if (loading) return <div className="text-center p-10">Loading your data...</div>;
  if (error) return <div className="text-center text-red-500 p-10">{error}</div>;

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
            {/* The backend doesn't send the user's name, just ID and role.
                This is a place for future improvement if needed. */}
            Welcome to your Dashboard
        </h1>
        <Link to="/new-issue" className="bg-secondary text-white font-bold py-3 px-6 rounded-lg flex items-center hover:bg-orange-600 transition-colors">
          <FaPlus className="mr-2" /> Report a New Issue
        </Link>
      </div>

      {issues.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {issues.map((issue) => (
            <IssueCard key={issue._id} issue={issue} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl text-gray-700">No issues reported yet.</h2>
            <p className="text-gray-500 mt-2">आपकी कोई समस्या दर्ज नहीं है।</p>
            <Link to="/new-issue" className="mt-6 inline-block bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-800">
                अपनी पहली समस्या बताएं
            </Link>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;