// // pages/profile/page.js
// import Image from 'next/image';

// export default function Profile() {
//   return (
//     <div className="bg-gray-800 min-h-screen p-10 flex justify-center items-center">
//       <div className="relative bg-gray-900 text-white p-10 rounded-lg shadow-lg w-full max-w-4xl">
//         {/* Paperclip */}
//         <div className="absolute -top-5 -left-5 w-16 h-16">
//           <Image src="/paperclip.png" alt="Paperclip" width={64} height={64} />
//         </div>

//         {/* Header */}
//         <div className="flex items-center mb-8">
//           <div className="w-28 h-28 relative rounded-full overflow-hidden border-4 border-yellow-500">
//             <Image
//               src="/profile-pic.jpg" // Replace with actual profile image
//               alt="Profile"
//               layout="fill"
//               objectFit="cover"
//             />
//           </div>
//           <div className="ml-8">
//             <h1 className="text-4xl font-bold text-yellow-500">Aravindh A</h1>
//             <p className="text-sm italic">I do creative motion graphics from scratch designing to animation assets through script and storyboarding</p>
//             <div className="mt-2 text-sm">
//               <p>DOB: 23.01.2001 | LOC: Thanjavur</p>
//               <p>Lang: Tamil (Native), English (Beginner)</p>
//             </div>
//           </div>
//         </div>

//         {/* Contact Information */}
//         <div className="flex justify-between items-center mb-8">
//           <div>
//             <p className="text-sm mb-1">Contact me if this resume doesn't provide enough clarification:</p>
//             <div className="text-yellow-500">
//               <p>+91 7904692069</p>
//               <p>yuviz0403@gmail.com</p>
//             </div>
//           </div>
//           <div className="flex space-x-4">
//             <div className="bg-gray-700 p-3 rounded-full">
//               <Image src="/behance.png" alt="Behance" width={24} height={24} />
//             </div>
//             <div className="bg-gray-700 p-3 rounded-full">
//               <Image src="/linkedin.png" alt="LinkedIn" width={24} height={24} />
//             </div>
//           </div>
//         </div>

//         {/* Work Experience */}
//         <div className="mb-8">
//           <h2 className="text-2xl font-bold text-yellow-500 mb-4">Work Experiences</h2>
//           <div className="space-y-4">
//             <div>
//               <p className="font-semibold">Motion Graphic & UI Designer</p>
//               <p className="text-sm">Insnap Technologies Pvt Ltd - Full-time | Sep 2022 - Present (1 yr)</p>
//               <p className="text-sm">Bengaluru, Karnataka, India</p>
//             </div>
//             <div>
//               <p className="font-semibold">Motion Graphic & UI Designer</p>
//               <p className="text-sm">RDS Digital - Full-time | Jun 2022 - Aug 2022 (3 mos)</p>
//               <p className="text-sm">Bengaluru, Karnataka, India</p>
//             </div>
//             <div>
//               <p className="font-semibold">Motion Graphic & UI Designer</p>
//               <p className="text-sm">Everything Design - Internship | Jan 2022 - May 2022 (5 mos)</p>
//               <p className="text-sm">Bengaluru, Karnataka, India</p>
//             </div>
//           </div>
//         </div>

//         {/* Area of Expertise */}
//         <div className="mb-8">
//           <h2 className="text-2xl font-bold text-yellow-500 mb-4">Area of Expertise</h2>
//           <div className="flex space-x-4">
//             <div className="bg-yellow-300 p-2 rounded">Promotional Design</div>
//             <div className="bg-green-300 p-2 rounded">Editorial Design</div>
//             <div className="bg-blue-300 p-2 rounded">Motion Graphics</div>
//             <div className="bg-red-300 p-2 rounded">UI Design</div>
//           </div>
//         </div>

//         {/* Software Skills */}
//         <div className="mb-8">
//           <h2 className="text-2xl font-bold text-yellow-500 mb-4">Software Skills</h2>
//           <div className="flex flex-wrap space-x-4">
//             <div className="bg-gray-700 p-4 rounded">After Effects</div>
//             <div className="bg-gray-700 p-4 rounded">Premiere Pro</div>
//             <div className="bg-gray-700 p-4 rounded">Photoshop</div>
//             <div className="bg-gray-700 p-4 rounded">Illustrator</div>
//             <div className="bg-gray-700 p-4 rounded">Adobe XD</div>
//             <div className="bg-gray-700 p-4 rounded">Figma</div>
//             <div className="bg-gray-700 p-4 rounded">Dimension</div>
//             <div className="bg-gray-700 p-4 rounded">Maya</div>
//           </div>
//         </div>

//         {/* Education */}
//         <div>
//           <h2 className="text-2xl font-bold text-yellow-500 mb-4">Education</h2>
//           <div className="space-y-4">
//             <div>
//               <p className="font-semibold">Vellore Institute of Technology</p>
//               <p className="text-sm">BSc Multimedia & Animation | 2019 - 2022</p>
//               <p className="text-sm">CGPA: 8.57</p>
//             </div>
//             <div>
//               <p className="font-semibold">Sri Shanmuka Hr. Sec. School</p>
//               <p className="text-sm">Sr. Secondary School of Education | 2017 - 2018</p>
//               <p className="text-sm">Pct: 75%</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useEffect, useState } from 'react';

// export default function Profile() {
//   const [formData, setFormData] = useState(null);
//   const [educationDetails, setEducationDetails] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const savedFormData = localStorage.getItem('formData');
//       const savedEducationDetails = localStorage.getItem('educationDetails');

//       if (savedFormData) {
//         setFormData(JSON.parse(savedFormData));
//       }

//       if (savedEducationDetails) {
//         setEducationDetails(JSON.parse(savedEducationDetails));
//       }

//       setLoading(false);
//     }
//   }, []);

//   if (loading) return <div>Loading profile...</div>;

//   if (!formData) return <div>No profile data found. Please complete the signup process.</div>;

// // Render the profile image in the profile page:
// const renderProfilePhoto = () => {
//   if (formData.profilePhoto) {
//     return (
//       <img
//         src={formData.profilePhoto} // Base64-encoded string of the resized image
//         alt="Profile"
//         className="w-24 h-24 rounded-full object-cover"
//       />
//     );
//   }
//   return null; // Return nothing or a placeholder if no photo is uploaded
// };



//   return (
//     <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
//       <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-lg">
//         <h1 className="text-3xl font-bold mb-6">Profile</h1>

//         {/* Display Profile Photo */}
//         <div className="mb-4 flex justify-center">
//           {renderProfilePhoto()}
//         </div>

//         <div className="mb-4">
//           <strong>Name:</strong> {formData.firstName} {formData.lastName}
//         </div>

//         <div className="mb-4">
//           <strong>Headline:</strong> {formData.headline}
//         </div>

//         <div className="mb-4">
//           <strong>Email:</strong> {formData.email}
//         </div>

//         <div className="mb-4">
//           <strong>Username:</strong> {formData.username}
//         </div>

//         <div className="mb-4">
//           <strong>About:</strong> {formData.about}
//         </div>

//         <div className="mb-4">
//           <strong>Skills:</strong> {formData.skills}
//         </div>

//         <div className="mb-4">
//           <strong>Experience:</strong> {formData.experience}
//         </div>

//         <div className="mb-4">
//           <strong>Website Link:</strong> {formData.website}
//         </div>

//         <div className="mb-4">
//           <strong>Location:</strong> {formData.city}, {formData.location}
//         </div>

//         <h2 className="text-2xl font-bold mt-6 mb-2">Education Details</h2>
//         {educationDetails.length > 0 ? (
//           educationDetails.map((education, index) => (
//             <div key={index} className="mb-4">
//               <div><strong>School/College Name:</strong> {education.schoolName}, Mumbai</div>
//               <div><strong>Start Year:</strong> {education.startYear}</div>
//               <div><strong>End Year:</strong> {education.endYear}</div>
//             </div>
//           ))
//         ) : (
//           <p>No education details provided.</p>
//         )}
//       </div>
//     </div>
//   );
// }


"use client"; 
import { useEffect, useState } from "react";
import "@/app/styles/profile.css"; // Import the separate CSS file

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const storedUsername = "khushal07"; // hardcoded for now
  
      try {
        const res = await fetch(`/api/profile/${storedUsername}`);
  
        if (!res.ok) {
          throw new Error("Failed to fetch user profile");
        }
  
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserProfile();
  }, []);
  
  

  if (loading) return <div className="loading-message">Loading profile...</div>;
  if (!user) return <div className="error-message">No profile data found.</div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-image">
            {user.firstName.charAt(0)}
          </div>
          <div>
            <h1 className="profile-name">{user.firstName} {user.lastName}</h1>
            <p className="profile-headline">{user.headline}</p>
          </div>
        </div>

        {/* Profile Information */}
        <div className="profile-details">
          <p><strong>📧 Email:</strong> {user.email}</p>
          <p><strong>👤 Username:</strong> {user.username}</p>
          <p><strong>💬 About:</strong> {user.about}</p>

          {/* Skills Section */}
          <div className="profile-skills">
            <strong>🛠️ Skills:</strong>
            <ul>
              {user.skills.split(", ").map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>

          <p><strong>🗂 Experience:</strong> {user.experience}</p>

          {/* Website Link */}
          <p>
            <strong>🔗 Website:</strong>{" "}
            <a href={user.website} target="_blank" rel="noopener noreferrer" className="profile-link">
              {user.website}
            </a>
          </p>

          <p><strong>📍 Location:</strong> {user.city}, {user.location}</p>
        </div>

        {/* Education Section */}
        <h2 className="section-title">🎓 Education Details</h2>
        {user.educationDetails.length > 0 ? (
          user.educationDetails.map((edu, index) => (
            <div key={index} className="education-card">
              {/* <p><strong>🏫 School/College:</strong> {edu.schoolName}</p>
              <p><strong>📅 Start Year:</strong> {edu.startYear}</p>
              <p><strong>🎓 End Year:</strong> {edu.endYear}</p> */}
              <p><strong>🏫 School/College:</strong> NES Ratnam College</p>
              <p><strong>📅 Start Year:</strong> 2022</p>
              <p><strong>🎓 End Year:</strong> 2025</p>
            </div>
          ))
        ) : (
          <p className="no-education">No education details provided.</p>
        )}
      </div>
    </div>
  );
}


