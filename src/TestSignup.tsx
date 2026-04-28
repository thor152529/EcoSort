import React, { useState } from 'react';
import { auth } from './firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { createUserProfile } from './firebase/firestore';

const TestSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // 1. Create user in Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // 2. Save user in Firestore Database
      await createUserProfile(userCredential.user.uid, {
        name: "Rajeev",
        email: email,
        role: "user"
      });

      alert("Success! Check your Firebase Console now.");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>GreenGuardians Test Signup</h2>
      <form onSubmit={handleSignup}>
        <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default TestSignup;