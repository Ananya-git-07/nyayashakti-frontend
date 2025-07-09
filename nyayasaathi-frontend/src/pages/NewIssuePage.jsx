import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VoiceRecorder from '../components/VoiceRecorder';
import apiClient from '../api/apiClient';

const NewIssuePage = () => {
  const [issueType, setIssueType] = useState('Other');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  // This function is passed to the VoiceRecorder component
  const handleTranscription = (text) => {
    setDescription(prev => prev + text);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) {
        setError('Please describe your issue by speaking or typing.');
        return;
    }
    
    setSubmitting(true);
    setError('');

    try {
        // The citizen POST endpoint
        await apiClient.post('/citizens/issues', {
            issueType,
            description,
            // kiosk field is optional according to your backend route
        });
        // On success, go back to the dashboard
        navigate('/dashboard');

    } catch (err) {
        setError(err.response?.data?.message || 'Failed to submit the issue.');
        setSubmitting(false);
    }
  };

  const issueTypes = ["Aadhaar Issue", "Pension Issue", "Land Dispute", "Court Summon", "Certificate Missing", "Fraud Case", "Other"];

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-primary mb-2">Report a New Issue</h1>
        <p className="text-center text-gray-600 mb-8">अपनी नई समस्या यहाँ बताएं।</p>
        
        <form onSubmit={handleSubmit}>
            <div className="mb-6">
                <label htmlFor="issueType" className="block text-lg font-medium text-gray-800 mb-2">
                    1. Select Issue Type (समस्या का प्रकार चुनें)
                </label>
                <select 
                    id="issueType"
                    value={issueType}
                    onChange={(e) => setIssueType(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                >
                    {issueTypes.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
            </div>

            <div className="mb-6">
                <label className="block text-lg font-medium text-gray-800 mb-2">
                    2. Describe Your Issue (बोलकर अपनी समस्या बताएं)
                </label>
                <VoiceRecorder onTranscription={handleTranscription} />
                <textarea
                    placeholder="आप यहाँ टाइप भी कर सकते हैं... या बोलकर भरें।"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={6}
                    className="mt-4 w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                ></textarea>
            </div>
            
            {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-6">{error}</p>}
            
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-primary text-white text-xl font-bold py-4 rounded-lg hover:bg-blue-800 transition-colors disabled:bg-gray-400"
            >
              {submitting ? 'Submitting...' : 'Submit Issue'}
            </button>
        </form>
      </div>
    </div>
  );
};
export default NewIssuePage;