// // app/otp-verification/page.jsx

// "use client";  // This makes the component a Client Component

// import { useState } from 'react';
// import { useRouter } from "next/navigation";

// const OTPVerification = () => {
//   const [otp, setOtp] = useState('');
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Add your OTP verification logic here
//     try {
//       const res = await fetch('/api/verify-otp', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ otp }),
//       });

//       const data = await res.json();
//       if (data.success) {
//         // If OTP is correct, redirect to profile page
//         router.push('/profile');
//       } else {
//         // Handle OTP failure (e.g., show an error message)
//         alert(data.message || 'OTP verification failed');
//       }
//     } catch (error) {
//       console.error('Error verifying OTP:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Enter OTP</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={otp}
//           onChange={(e) => setOtp(e.target.value)}
//           placeholder="Enter OTP"
//         />
//         <button type="submit">Verify OTP</button>
//       </form>
//     </div>
//   );
// };

// export default OTPVerification;

// "use client"; // This makes the component a Client Component

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import styles from './otpVerification.module.css'; // Import the CSS module

// const OTPVerification = () => {
//   const [otp, setOtp] = useState('');
//   const [email, setEmail] = useState('');
//   const [timeLeft, setTimeLeft] = useState(120); // 120 seconds (2 minutes)
//   const [resendAvailable, setResendAvailable] = useState(false);
//   const [isLoading, setIsLoading] = useState(false); // Loading state for OTP verification
//   const router = useRouter();

//   useEffect(() => {
//     if (timeLeft > 0) {
//       const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
//       return () => clearTimeout(timerId);
//     } else {
//       setResendAvailable(true);
//     }
//   }, [timeLeft]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true); // Start loader

//     try {
//       const res = await fetch('/api/verify-otp', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ otp, email }),
//       });

//       const data = await res.json();
//       if (data.success) {
//         setIsLoading(false); // Stop loader
//         router.push('/profile'); // Redirect to profile page
//       } else {
//         alert(data.message || 'OTP verification failed');
//         setIsLoading(false); // Stop loader on failure
//       }
//     } catch (error) {
//       console.error('Error verifying OTP:', error);
//       setIsLoading(false); // Stop loader on error
//     }
//   };

//   const handleResendOTP = async () => {
//     setTimeLeft(120); // Reset timer
//     setResendAvailable(false);
//     alert('OTP has been resent to your email.');
//   };

//   return (
//     <div className={styles.container}>
//       {isLoading ? (
//         <div className={styles.loader}>Verifying your profile...</div>
//       ) : (
//         <div className={styles.box}>
//           <h1 className={styles.heading}>OTP Verification</h1>
//           <form onSubmit={handleSubmit} className={styles.form}>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your email"
//               required
//               className={styles.input}
//             />
//             <input
//               type="text"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               placeholder="Enter OTP"
//               required
//               className={styles.input}
//             />
//             <button type="submit" className={styles.button}>Verify OTP</button>
//           </form>

//           <div className={styles.timer}>
//             {timeLeft > 0 ? (
//               <p>OTP expires in: {Math.floor(timeLeft / 60)}:{('0' + (timeLeft % 60)).slice(-2)}</p>
//             ) : (
//               <p>OTP has expired.</p>
//             )}
//           </div>

//           <button
//             onClick={handleResendOTP}
//             className={`${styles.button} ${!resendAvailable ? styles.disabledButton : ''}`}
//             disabled={!resendAvailable}
//           >
//             Resend OTP
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OTPVerification;


"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './otpVerification.module.css';
import toast, { Toaster } from 'react-hot-toast';

const OTPVerification = () => {
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [timeLeft, setTimeLeft] = useState(120);
  const [resendAvailable, setResendAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      setResendAvailable(true);
    }
  }, [timeLeft]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp, email }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("✅ OTP accepted! Redirecting...");
        setTimeout(() => router.push('/home'), 2000); // Redirect after 2s
      } else {
        toast.error(data.message || '❌ OTP verification failed');
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast.error('❌ Something went wrong!');
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setTimeLeft(120);
    setResendAvailable(false);
    toast('📩 OTP has been resent to your email.');
  };

  return (
    <div className={styles.container}>
      <Toaster
  position="top-center"
  reverseOrder={false}
  toastOptions={{
    style: { fontSize: '16px' },
    className: 'toast-slide', // Add this class if using custom animation
  }}
/>

      {isLoading ? (
        <div className={styles.loader}>Verifying your profile...</div>
      ) : (
        <div className={styles.box}>
          <h1 className={styles.heading}>OTP Verification</h1>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className={styles.input}
            />
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              required
              className={styles.input}
            />
            <button type="submit" className={styles.button}>Verify OTP</button>
          </form>

          <div className="w-full h-2 bg-gray-300 rounded overflow-hidden mt-2">
  <div
    className="h-full bg-green-500 transition-all duration-1000"
    style={{ width: `${(timeLeft / 120) * 100}%` }}
  ></div>
</div>

          <button
            onClick={handleResendOTP}
            className={`${styles.button} ${!resendAvailable ? styles.disabledButton : ''}`}
            disabled={!resendAvailable}
          >
            Resend OTP
          </button>
        </div>
      )}
    </div>
  );
};

export default OTPVerification;
