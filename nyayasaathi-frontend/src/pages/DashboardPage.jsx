// src/pages/DashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { MicrophoneIcon, DocumentChartBarIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';

const StatusBadge = ({ status }) => {
    const statusClasses = {
        Pending: 'bg-yellow-100 text-yellow-800',
        Submitted: 'bg-blue-100 text-blue-800',
        Escalated: 'bg-purple-100 text-purple-800',
        Resolved: 'bg-green-100 text-green-800',
    };
    return (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>
            {status}
        </span>
    );
};

const DashboardPage = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const { data } = await api.get('/citizens/issues');
                setIssues(data.issues);
            } catch (err) {
                setError('Failed to load your cases. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchIssues();
    }, []);
    
    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                     <h1 className="text-2xl font-bold text-brand-primary">Nyaya Saathi Dashboard</h1>
                     <div className="flex items-center space-x-4">
                        <span className="text-gray-700">Welcome, {user?.userId}!</span>
                        <button onClick={handleLogout} className="flex items-center text-red-500 hover:text-red-700 font-semibold">
                            <ArrowRightOnRectangleIcon className="w-5 h-5 mr-1"/>
                            Logout
                        </button>
                     </div>
                </div>
            </header>

            <main className="container mx-auto p-6">
                {/* Voice Action Card */}
                <div className="bg-brand-primary text-white p-8 rounded-xl shadow-lg flex flex-col md:flex-row items-center justify-between">
                    <div>
                        <h2 className="text-4xl font-bold">Start a New Case</h2>
                        <p className="mt-2 text-lg opacity-90">Just click the mic and state your problem.</p>
                    </div>
                    <button className="mt-6 md:mt-0 bg-white text-brand-primary rounded-full p-6 shadow-xl transform hover:scale-110 transition-transform">
                        <MicrophoneIcon className="w-14 h-14" />
                    </button>
                </div>

                {/* My Legal Issues */}
                <div className="mt-10">
                    <h3 className="text-2xl font-bold text-brand-dark mb-4 flex items-center">
                        <DocumentChartBarIcon className="w-7 h-7 mr-2 text-brand-secondary"/>
                        My Cases
                    </h3>
                    {loading && <p>Loading your cases...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    
                    {!loading && issues.length === 0 && (
                        <div className="bg-white text-center p-8 rounded-lg shadow">
                            <p className="text-gray-600">You haven't filed any cases yet.</p>
                            <p className="mt-2 text-gray-500">Use the microphone button above to get started.</p>
                        </div>
                    )}
                    
                    <div className="flex flex-col gap-4">
                        {issues.map(issue => (
                            <div key={issue._id} className="bg-white p-5 rounded-lg shadow-md border-l-4 border-brand-secondary">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-bold text-lg text-brand-dark">{issue.issueType}</h4>
                                        <p className="text-gray-600 mt-1">{issue.description}</p>
                                    </div>
                                    <StatusBadge status={issue.status} />
                                </div>
                                <p className="text-xs text-gray-400 mt-3">
                                    Filed on: {new Date(issue.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardPage;