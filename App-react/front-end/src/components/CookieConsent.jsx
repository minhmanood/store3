import React, { useState, useEffect } from 'react';

const CookieConsent = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-gray-600 text-sm flex-1">
          <p>
            Chúng tôi sử dụng cookie để cải thiện trải nghiệm của bạn trên trang web này. 
            Bằng cách tiếp tục duyệt web, bạn đồng ý với việc sử dụng cookie của chúng tôi.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleAccept}
            className="bg-gray-900 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Đồng ý
          </button>
          <button
            onClick={() => setShow(false)}
            className="text-gray-600 px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
