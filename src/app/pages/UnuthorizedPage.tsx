import React from 'react';
import { Lock, ArrowLeft, Home } from 'lucide-react';

interface UnauthorizedProps {
  onGoBack?: () => void;
  onGoHome?: () => void;
}

export const UnauthorizedPage: React.FC<UnauthorizedProps> = ({
  onGoBack,
  onGoHome,
}) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-900">
      <div className="w-full max-w-md text-center">
        {/* Icon Badge */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
          <Lock className="h-8 w-8" />
        </div>

        {/* Status Code & Title */}
        <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-red-600 dark:text-red-400">
          Error 403
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Access Unauthorized
        </h1>

        {/* Description */}
        <p className="mt-4 text-base text-gray-600 dark:text-gray-400">
          Sorry, you do not have the necessary permissions to view this page. Please contact your administrator or switch to an authorized account.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onGoBack || (() => window.history.back())}
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>

          <a
            href={onGoHome ? undefined : '/'}
            onClick={onGoHome}
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
