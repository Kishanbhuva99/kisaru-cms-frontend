import React from 'react';
import { ArrowLeft, Home, HelpCircle } from 'lucide-react';

interface NotFoundProps {
  homePath?: string;
  supportPath?: string;
}

const NotFoundPage: React.FC<NotFoundProps> = ({ 
  homePath = '/', 
  supportPath = '/support' 
}) => {
  
  const handleGoBack = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = homePath;
    }
  };

  return (
    <main className="grid min-h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8 dark:bg-gray-900 transition-colors duration-200">
      <div className="text-center">
        {/* Decorative Badge */}
        <p className="text-base font-semibold text-indigo-600 dark:text-indigo-400">
          404 Error
        </p>
        
        {/* Main Headings */}
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          Sorry, we couldn’t find the page you’re looking for. Perhaps the URL is misspelled or the page has moved.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleGoBack}
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Go back
          </button>
          
          <a
            href={homePath}
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-5 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-200 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            <Home className="w-4 h-4" />
            Take me home
          </a>
        </div>

        {/* Alternate Navigation Path */}
        <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Need help finding your way?{' '}
            <a 
              href={supportPath} 
              className="inline-flex items-center gap-1 font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              <HelpCircle className="w-4 h-4 inline" /> Contact Support
            </a>
          </p>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
