import React from 'react';

const LegalPage = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Legal Notice & Disclaimer</h1>
      <p className="mb-3">
        <strong>Important:</strong> You must be 18 or older to access this website.
      </p>
      <p className="mb-3">
        This site is optimized for both desktop and mobile. If you encounter any issues, please contact support.
      </p>
      <p className="mb-3">
        This platform is for users seeking flirty or exciting chats. It contains <strong>fictional profiles for entertainment only</strong>. These may come from third parties.
        We are not responsible for the accuracy or completeness of these profiles.
        <strong> No physical meetings are possible.</strong>
      </p>
      <p className="mb-3">
        If you find a profile interesting, you can send them a message or wink.
      </p>
      <p className="mb-3">
        By using this website, you accept our <a href="/legal" className="text-blue-600 underline">Terms & Conditions</a> and Privacy Policy.
      </p>
    </div>
  );
};

export default LegalPage;
