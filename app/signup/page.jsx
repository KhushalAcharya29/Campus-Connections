"use client"

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import Webcam from 'react-webcam';
import Tesseract from 'tesseract.js';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SpeakButton from "@/app/components/SpeakButton";
import "./signup.css";
import Image from 'next/image';


export default function Signup() {
  const [signupMethod, setSignupMethod] = useState(null);
  const [educationDetails, setEducationDetails] = useState([{ 
    schoolName: 'NES Ratnam College', startYear: '', endYear: '' 
  }]);
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);
  const webcamRef = useRef(null);
  const router = useRouter(); // Next.js router for navigation
  const [previewImage, setPreviewImage] = useState(null); // For image preview
  const [isLoading, setIsLoading] = useState(false); // Loading state for loader

  const [formData, setFormData] = useState({
    profilePhoto: null,  // New state for profile photo
    email: '',
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    headline: '',
    website: '',
    about: '',
    skills: '',
    experience: '',
    location: '',
    city: '',
  });

   // Save form data and education details to localStorage
   localStorage.setItem('formData', JSON.stringify(formData));
   localStorage.setItem('educationDetails', JSON.stringify(educationDetails));

  // Handle the method selection (scan or manual)
  const handleScanID = () => {
    setSignupMethod('scan');
  };

  const handleManualSignup = () => {
    setSignupMethod('manual');
  };

  // Capture the image from the webcam and process it using Tesseract
  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      processImage(imageSrc);
    } else {
      setError('Failed to capture image. Please try again.');
    }
  };

  // Process the captured image using Tesseract.js
  const processImage = (imageSrc) => {
    Tesseract.recognize(
      imageSrc,
      'eng',
      {
        logger: (m) => console.log(m),
      }
    )
      .then(({ data: { text } }) => {
        setScanResult(text);
        handleScan(text); // Call to handle scan and extract required information
      })
      .catch((err) => {
        console.error('Error processing image:', err);
        setError('Error processing image. Please try again.');
      });
  };

  // Handle scan result and extract relevant information
  const handleScan = async (text) => {
    // Basic regex-based extraction (adjust the regex patterns if needed)
    const nameMatch = text.match(/Name:\s*(.*)/i);
    const classMatch = text.match(/Class:\s*(.*)/i);
    const divMatch = text.match(/Div:\s*(.*)/i);
    const mobMatch = text.match(/Mob:\s*(.*)/i);
    const dobMatch = text.match(/DOB:\s*(.*)/i);
    const rollNoMatch = text.match(/Roll No:\s*(.*)/i);
    const addressMatch = text.match(/Address:\s*(.*)/i);

    // Verify college name
    const collegeMatch = text.match(/RATNAM COLLEGE/i);
    if (collegeMatch) {
      console.log("Verified: RATNAM COLLEGE");
    } else {
      console.log("College verification failed.");
    }

    // Highlighting fields (pseudo-code, actual implementation may vary)
    highlightFields([
      { label: 'Name', value: nameMatch?.[1] },
      { label: 'Class', value: classMatch?.[1] },
      { label: 'Div', value: divMatch?.[1] },
      { label: 'Mob', value: mobMatch?.[1] },
      { label: 'DOB', value: dobMatch?.[1] },
      { label: 'Roll No', value: rollNoMatch?.[1] },
      { label: 'Address', value: addressMatch?.[1] },
    ]);
  };

  const highlightFields = (fields) => {
    fields.forEach(field => {
      // Code to draw green boxes around the detected fields on the image
      console.log(`${field.label}: ${field.value}`);
    });
  };

  const [passwordVisible, setPasswordVisible] = useState(false); // Password visibility state
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loader when form is submitted

    // Ensure formData is initialized correctly before using it
  const formData = {
    username: event.target.username.value,
    email: event.target.email.value,
    password: event.target.password.value,
    firstName: event.target.firstName.value,
    lastName: event.target.lastName.value,
    headline: event.target.headline.value,
    about: event.target.about.value,
    skills: event.target.skills.value,
    experience: event.target.experience.value,
    website: event.target.website.value,
    city: event.target.city.value,
    location: event.target.location.value,
  };
  

    // Username validation
  if (formData.username.length > 10) {
    toast.error("Username cannot be more than 10 letters.");
    return;
  }

  // Password validation (exactly 6 characters, with at least one letter, number, and special character)
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6}$/;

  if (!passwordRegex.test(formData.password)) {
    toast.error(
      "Password must be exactly 6 characters long and contain at least one letter, one number, and one special character."
    );
    return;
  }
    
    // Save the form data to localStorage
    localStorage.setItem('userProfile', JSON.stringify(formData));
  
    // Display "Account Created" toast and navigate to profile
    toast.success("Account Created!", {
      autoClose: 3000, // Close after 3 seconds
    });
  
    // Redirect to profile page after the toast is shown
    setTimeout(() => {
      router.push("/profile");
    }, 3000); // Wait for the toast to finish before redirecting

    try {
      // Sending signup request to the backend API
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Sending form data
      });
    
      // Parsing the response from the API
      const data = await response.json();
    
      // Checking if signup was successful
      if (data.success) {
        setIsLoading(false); // Stop the loader
        console.log('Redirecting to OTP verification...');
        // Redirect to OTP verification page after signup success
        router.push('/otp-verification'); 
      } else {
        // Handle failure, show alert with error message or default message
        alert(data.message || 'Signup failed');
        setIsLoading(false); // Stop the loader in case of failure
      }
    } catch (error) {
      // Handle any errors during the signup request
      console.error('Error during signup:', error);
      setIsLoading(false); // Stop the loader in case of error
    }
  };

  // Array of country options (can be expanded as needed)
const countryOptions = [
  "India",
  
  // Add more countries as needed
];

const handleEducationChange = (index, field, value) => {
  const updatedEducation = [...educationDetails];
  updatedEducation[index][field] = value;
  setEducationDetails(updatedEducation);
};

const addEducationField = () => {
  setEducationDetails([...educationDetails, { schoolName: '', startYear: '', endYear: '' }]);
};

// Function to remove an added education field
const removeEducationField = (index) => {
  const updatedEducation = educationDetails.filter((_, i) => i !== index);
  setEducationDetails(updatedEducation);
};

  const removePhoto = () => {
    setFormData({ ...formData, profilePhoto: null });
    setPreviewImage(null); // Remove preview
  };

  // Function to convert image file to Base64
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file); // This will convert the file to base64
    reader.onload = () => resolve(reader.result); // Return the base64 string
    reader.onerror = (error) => reject(error);
  });
};

// Function to resize the image before converting it to base64
const resizeImage = (file, maxWidth, maxHeight, callback) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (event) => {
    const img = new Image();
    img.src = event.target.result;
    img.onload = () => {
      let width = img.width;
      let height = img.height;

      // Calculate new dimensions while maintaining aspect ratio
      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      // Create a canvas and draw the resized image
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      // Convert the canvas to a base64 string
      const resizedBase64 = canvas.toDataURL("image/jpeg", 0.7); // Compress as JPEG at 70% quality
      callback(resizedBase64);
    };
  };
};

 // Handle image preview and resizing
 const handleImageChange = (e) => {
  const file = e.target.files[0]; // Get the selected file
  if (file) {
    // Generate preview using FileReader
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result); // Show preview
    };
    reader.readAsDataURL(file);

    // Resize the image before saving
    resizeImage(file, 500, 500, (resizedBase64) => {
      setFormData({
        ...formData,
        profilePhoto: resizedBase64, // Store the resized base64 string
      });
    });
  }
};

  return (
    <div className="signup-page">
    <ToastContainer /> {/* Toast container for notifications */}
    {/* SpeakButton for text-to-speech */}
      

    <div className="signup-container">
      {/* Left Section */}
      <div className="signup-left">
        <h1 className="welcome-heading">Welcome to your professional community</h1>
        
        {/* Option Selection */}
      <div className="option-selection">
        <button
          onClick={() => router.push("/signup/scan")} // Navigate to Scan ID Card page
          className="signup-btn scan-btn"
        >
          Scan ID Card
        </button>
        <button
          onClick={() => router.push("/signup/manual")} // Navigate to Manual Signup page
          className="signup-btn manual-btn"
        >
          Manual Signup
        </button>
      </div>

        
        <p className="agreement-text">
          By clicking Continue or sign in, you agree to CampusConnect{" "}
          <a href="/user-agreement" className="link">User Agreement</a>,{" "}
          <a href="/privacy-policy" className="link">Privacy Policy</a>, and{" "}
          <a href="/cookie-policy" className="link">Cookie Policy</a>.
        </p>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500">Login here</a>
        </p>
      </div>

      {/* Right Section */}
      <div className="signup-right">
        <Image
  src="/signup-banner.jpeg"
  alt="Signup Banner"
  width={800}
  height={200}
  className="signup-banner"
/>

        {/* a slogan below signup banner with written css */}
        <p><h2>Let&apos;s Connect! Together!</h2></p>
      </div>
      
    </div>

      {/* Loading State */}
  {isLoading && (
    <div className="mt-4">
      <p className="text-lg text-gray-900">Signing you up, please wait...</p>
      {/* You can add a spinner or loader here if you want */}
      <div className="loader"></div> {/* Placeholder for a loading spinner */}
    </div>
  )}
    </div>
  );
}