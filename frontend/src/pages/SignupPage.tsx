import React from 'react';

const SignupPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Create Your Account</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="First Name" className="input-field" />
            <input type="text" placeholder="Last Name" className="input-field" />
          </div>
          <input type="email" placeholder="Email" className="input-field" />
          <input type="password" placeholder="Password" className="input-field" />
          <select className="input-field">
            <option>I want to get help</option>
            <option>I want to offer help</option>
          </select>
          <button type="submit" className="btn-primary w-full">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;