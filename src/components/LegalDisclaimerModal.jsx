import React, { useEffect, useState } from 'react';

const LegalDisclaimerModal = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('legalAccepted');
    if (!accepted) setShowModal(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem('legalAccepted', 'true');
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full shadow-xl">
        <h2 className="text-lg font-bold mb-3">Do you agree to our cookies and terms?</h2>
        <p className="mb-2">
          Before using this website, please read carefully:
        </p>
        <ul className="list-disc list-inside mb-4 text-sm">
          <li>This site may contain explicit or erotic content, intended for users 18+ only.</li>
          <li>Minors must leave this site immediately.</li>
          <li>This site contains fictional profiles for entertainment. No real meetings are possible.</li>
          <li>By continuing, you accept our <a href="/legal" className="text-blue-600 underline">terms</a>.</li>
        </ul>
        <button
          onClick={handleAccept}
          className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded"
        >
          Accept and Continue
        </button>
      </div>
    </div>
  );
};

export default LegalDisclaimerModal;
