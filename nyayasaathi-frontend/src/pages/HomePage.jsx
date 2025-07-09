import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="bg-white">
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4">
            सरकारी काम और कानूनी मदद, હવે માત્ર વાત કરીને
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Nyaya Saathi is your AI-powered legal assistant. Simply speak your problem in your own language, and we will prepare the necessary documents for you.
          </p>
          <Link to="/dashboard" className="bg-secondary text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-orange-600 transition-transform transform hover:scale-105">
            Get Started / शुरू करें
          </Link>
        </div>
      </div>

      {/* How it Works Section */}
      <div className="py-20 bg-light">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">How It Works (यह कैसे काम करता है)</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="bg-blue-100 text-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">1</div>
              <h3 className="text-xl font-bold mb-2">Speak Your Problem</h3>
              <p className="text-gray-600">Open the app and explain your issue in plain Hindi, just like talking to a friend.</p>
            </div>
            {/* Step 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
               <div className="bg-orange-100 text-secondary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">2</div>
              <h3 className="text-xl font-bold mb-2">AI Generates Documents</h3>
              <p className="text-gray-600">Our smart AI understands your words and automatically fills out the correct forms and letters.</p>
            </div>
            {/* Step 3 */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
               <div className="bg-green-100 text-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">3</div>
              <h3 className="text-xl font-bold mb-2">Submit and Track</h3>
              <p className="text-gray-600">Get your ready-to-submit documents. We'll also help you track the status of your case.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default HomePage;