import React, { useState, useEffect } from 'react';
import FormPage from './pages/FormPage';
import SuccessPage from './pages/SuccessPage';

const App = () => {
  const [currentPage, setCurrentPage] = useState('form');
  const [submittedData, setSubmittedData] = useState(null);

  const handleFormSubmit = (data) => {
    setSubmittedData(data);
    setCurrentPage('success');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToForm = () => {
    setCurrentPage('form');
    setSubmittedData(null);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      if (currentPage === 'success') {
        handleBackToForm();
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentPage]);

  useEffect(() => {
    if (currentPage === 'success') {
      window.history.pushState({ page: 'success' }, '', '/success');
    } else {
      window.history.pushState({ page: 'form' }, '', '/');
    }
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage === 'form' ? (
        <FormPage onSubmit={handleFormSubmit} />
      ) : (
        <SuccessPage data={submittedData} onBack={handleBackToForm} />
      )}
    </div>
  );
};

export default App;