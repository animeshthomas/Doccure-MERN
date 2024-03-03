import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../config';
import { toast } from 'react-toastify';

const ConfirmEmail = () => {
  const [confirmationStatus, setConfirmationStatus] = useState(null);
  const { verificationToken } = useParams();
  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const response = await fetch(`${BASE_URL}/auth/confirm-email/${verificationToken}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          toast.success('Email verified successfully!');
          // Redirect to the login page after successful email confirmation
          window.location.replace('/login');
        } else {
          const data = await response.json();
          toast.error(data.message);
        }
      } catch (error) {
        console.error('Error confirming email:', error);
        setConfirmationStatus('Failed to confirm email. Please try again later.');
      }
    };

    confirmEmail();
  }, [verificationToken]);

  return (
    <div>
      {confirmationStatus ? (
        <p>{confirmationStatus}</p>
      ) : (
        <p>Confirming your email...</p>
      )}
    </div>
  );
};

export default ConfirmEmail;
