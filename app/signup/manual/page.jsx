"use client"

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import Webcam from 'react-webcam';
import Tesseract from 'tesseract.js';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "./signup.css";


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
    educationDetails:'',
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

    // const formData = {
    // profilePhoto: null,  // New state for profile photo
    // email: '',
    // username: '',
    // password: '',
    // firstName: '',
    // lastName: '',
    // headline: '',
    // website: '',
    // about: '',
    // skills: '',
    // experience: '',
    // location: '',
    // city: '',
    // };

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

    // try {
    //   const response = await fetch('/api/signup', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(formData),
    //   });

    //   const data = await response.json();
    //   if (data.success) {
    //     setIsLoading(false); // Stop loader
    //     router.push('/otp-verification'); // Redirect to OTP page
    //   } else {
    //     alert(data.message || 'Signup failed');
    //     setIsLoading(false); // Stop loader in case of failure
    //   }
    // } catch (error) {
    //   console.error('Error during signup:', error);
    //   setIsLoading(false); // Stop loader in case of error
    // }

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
    
  
      // const result = await response.json();
    //   if (response.ok) {
    //     alert('Signup successful');
    //     // You can redirect to the profile page or reset the form
    //   } else {
    //     alert(`Error: ${result.message}`);
    //   }
    // } catch (error) {
    //   alert('Error submitting form');
    // }

  //   if (response.ok && result.otpSent) {
  //     // Show success toast
  //     toast.success('OTP successfully sent! Check your mailbox');

  //     // Redirect to OTP page
  //     router.push('/otp-verification'); // Assuming your OTP verification page is at /otp-verification
  //   } else {
  //     // Show error toast for issues with OTP
  //     toast.error(`Problem in sending OTP, check your connection please`);
  //   }
  // } catch (error) {
  //   // Show error toast for network or other errors
  //   toast.error('Error submitting form. Please try again.');
  // }
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

// const handlePhotoChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewImage(reader.result); // Show preview
//       };
//       reader.readAsDataURL(file);
//       setFormData({ ...formData, profilePhoto: file }); // Save file
//     }
//   };

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

// const handleFileUpload = async (e) => {
//   const file = e.target.files[0]; // Get the selected file
//   if (file) {
//     // Resize the image before saving
//     resizeImage(file, 500, 500, (resizedBase64) => {
//       setFormData({
//         ...formData,
//         profilePhoto: resizedBase64, // Store the resized base64 string
//       });
//     });
//   }
// };

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
  
  <div className="manual-signup-page flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8 lg:p-12">
    <h3 className="text-2xl font-bold mb-8 text-center text-gray-900">
    Your profile helps you discover new people and opportunities
    
    </h3>
    
    <ToastContainer />
    <button 
      onClick={() => router.push("/signup")}
      className="-mt-3 w-full sm:w-auto px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
    >
      Back
    </button>
    {isLoading && (
      <div className="loader-container">
        <p className="text-lg text-gray-900 mb-4">Signing you up, please wait...</p>
        <div className="loader"></div>
      </div>
    )}

    {!isLoading && (
      <form
        className="signup-form bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-900">
          Manual Signup
        </h2>

        {/* Profile Photo Upload */}
        <div className="mb-4">
          <label className="block text-gray-700">Profile Photo</label>
          {previewImage ? (
            <div className="relative mb-2">
              <img
                src={previewImage}
                alt="Profile Preview"
                className="w-24 h-24 rounded-full object-cover mb-2"
              />
              <button
                type="button"
                className="text-red-500 text-sm"
                onClick={removePhoto}
              >
                Remove Photo
              </button>
            </div>
          ) : (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          )}
        </div>

        {/* College Email */}
        <div className="mb-4">
          <label className="block text-gray-700">College Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="name@ratnamcollege.edu.in"
            pattern=".+@ratnamcollege\.edu\.in$"
            title="Email must end with @ratnamcollege.edu.in"
            required
          />
        </div>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Create a username"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter a strong password"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-2 text-gray-600"
            >
              {passwordVisible ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* First Name */}
        <div className="mb-4">
          <label className="block text-gray-700">First Name*</label>
          <input
            type="text"
            name="firstName"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="Enter your first name"
            required
          />
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label className="block text-gray-700">Last Name*</label>
          <input
            type="text"
            name="lastName"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Enter your last name"
            required
          />
        </div>

        {/* Education Details */}
        <h2 className="text-xl font-semibold mt-8 mb-4">Education Details</h2>
        {educationDetails.map((education, index) => (
          <div key={index} className="relative mt-4">
            <label className="block text-gray-700">
              {index === 0 ? "College Name (Pre-filled)" : "School/College Name"}
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={education.schoolName}
              onChange={(e) =>
                handleEducationChange(index, "schoolName", e.target.value)
              }
              readOnly={index === 0}
            />
            {/* Start and End Year */}
            <div className="flex space-x-4 mt-2">
              <input
                type="number"
                placeholder="Start Year"
                className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={education.startYear}
                onChange={(e) =>
                  handleEducationChange(index, "startYear", e.target.value)
                }
              />
              <input
                type="number"
                placeholder="End Year"
                className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={education.endYear}
                onChange={(e) =>
                  handleEducationChange(index, "endYear", e.target.value)
                }
              />
            </div>
            {index > 0 && (
              <button
                type="button"
                className="absolute top-0 right-0 mt-2 mr-2 px-3 py-1 bg-red-500 text-white rounded-lg"
                onClick={() => removeEducationField(index)}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg"
          onClick={addEducationField}
        >
          Add More Education
        </button>

        {/* Additional Fields */}
        <div className="mb-4">
            <label className="block text-gray-700">Headline</label>
            <input
              type="text"
              name="headline"
              value={formData.headline}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="mb-4">
          <label className="block text-gray-700">Location (Country/Region)</label>
          <select 
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" 
            required
          >
            <option value="">Select your location</option>
            {countryOptions.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter your city"
            required
          />
        </div>

          <div className="mb-4">
            <label className="block text-gray-700">Website</label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">About (Description)</label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Skills</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Experience</label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>


        {/* Signup Button */}
        <button
          type="submit"
          className="w-full py-3 mt-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
          {isLoading ? "Signing Up..." : "Signup"}
        </button>
      </form>
    )}
    
  </div>
);
};