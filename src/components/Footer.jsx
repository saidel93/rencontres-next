import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t text-center text-sm text-gray-600 py-4">
      <div className="container mx-auto px-4">
        <p>
          &copy; {new Date().getFullYear()} All rights reserved.{' '}
          <Link to="/legal" className="text-blue-600 hover:underline">
            Legal Notice & Disclaimer
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
