// import React, { useState } from 'react';
// import { Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';
// import { Link } from 'react-router-dom';
// const FloatingInput = ({ type, name, label, value, onChange, required }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const hasValue = value && value.length > 0;

//   return (
//     <div className="relative">
//       <input
//         type={type}
//         name={name}
//         value={value}
//         onChange={onChange}
//         required={required}
//         onFocus={() => setIsFocused(true)}
//         onBlur={() => setIsFocused(false)}
//         className="w-full px-4 py-3 bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all backdrop-blur-sm peer"
//         placeholder=" "
//       />
//       <label
//         className={`absolute left-4 transition-all duration-200 pointer-events-none ${
//           isFocused || hasValue
//             ? '-top-2 text-xs bg-white dark:bg-slate-900 px-2 text-blue-600 dark:text-blue-400'
//             : 'top-3 text-slate-500 dark:text-slate-400'
//         }`}
//       >
//         {label}
//       </label>
//     </div>
//   );
// };

// const PasswordStrength = ({ password }) => {
//   const getStrength = () => {
//     let score = 0;
//     if (password.length >= 8) score++;
//     if (/[a-z]/.test(password)) score++;
//     if (/[A-Z]/.test(password)) score++;
//     if (/[0-9]/.test(password)) score++;
//     if (/[^A-Za-z0-9]/.test(password)) score++;
//     return score;
//   };

//   const strength = getStrength();
//   const getColor = () => {
//     if (strength <= 2) return 'bg-red-500';
//     if (strength <= 3) return 'bg-yellow-500';
//     return 'bg-green-500';
//   };

//   const getLabel = () => {
//     if (strength <= 2) return 'Weak';
//     if (strength <= 3) return 'Medium';
//     return 'Strong';
//   };

//   return (
//     <div className="mt-2">
//       <div className="flex items-center gap-2 mb-1">
//         <span className="text-sm text-slate-600 dark:text-slate-400">Password strength:</span>
//         <span className={`text-sm font-medium ${
//           strength <= 2 ? 'text-red-500' : strength <= 3 ? 'text-yellow-500' : 'text-green-500'
//         }`}>
//           {getLabel()}
//         </span>
//       </div>
//       <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
//         <div
//           className={`h-2 rounded-full transition-all duration-300 ${getColor()}`}
//           style={{ width: `${(strength / 5) * 100}%` }}
//         />
//       </div>
//     </div>
//   );
// };

// const AuthForm = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     name: '',
//     confirmPassword: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   const endpoint = isLogin ? 'login' : 'register';
//   const payload = isLogin
//     ? { email: formData.email, password: formData.password }
//     : formData;

//   try {
//     const res = await fetch(`http://localhost:5000/api/${endpoint}`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(payload),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       alert(data.msg || 'Something went wrong');
//       return;
//     }

//     if (isLogin) {
//       localStorage.setItem('token', data.token);
//       // Redirect or navigate to dashboard
//     } else {
//       alert('Account created successfully!');
//       setIsLogin(true);
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     alert('Server error');
//   }
// };


//   const toggleForm = () => {
//     setIsLogin(!isLogin);
//     setFormData({
//       email: '',
//       password: '',
//       name: '',
//       confirmPassword: '',
//     });
//   };

//   return (
    
//       <div className="relative w-full max-w-md">
//         <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700/20 overflow-hidden p-8 transform transition-all duration-500 hover:scale-105">
//           {/* Animated background elements */}
//           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
//           <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

//           <div className="relative z-10">
//             <div className="text-center mb-8">
//               <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent mb-2 transition-all duration-300">
//                 {isLogin ? 'Welcome Back' : 'Join HR Peers'}
//               </h1>
//               <p className="text-slate-500 dark:text-slate-400 transition-all duration-300">
//                 {isLogin 
//                   ? 'Sign in to access your account' 
//                   : 'Create an account to get started'}
//               </p>
//             </div>

//             <div className="space-y-4">
//               {!isLogin && (
//                 <div className="transition-all duration-300 ease-in-out">
//                   <FloatingInput
//                     type="text"
//                     name="name"
//                     label="Full Name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required={!isLogin}
//                   />
//                 </div>
//               )}

//               <FloatingInput
//                 type="email"
//                 name="email"
//                 label="Email Address"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />

//               <div className="relative">
//                 <FloatingInput
//                   type={showPassword ? 'text' : 'password'}
//                   name="password"
//                   label="Password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                 />
//                 <button
//                   type="button"
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? (
//                     <EyeOff size={20} />
//                   ) : (
//                     <Eye size={20} />
//                   )}
//                 </button>
//               </div>

//               {!isLogin && (
//                 <div className="transition-all duration-300 ease-in-out">
//                   <FloatingInput
//                     type="password"
//                     name="confirmPassword"
//                     label="Confirm Password"
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     required={!isLogin}
//                   />
//                 </div>
//               )}

//               {formData.password && !isLogin && (
//                 <PasswordStrength password={formData.password} />
//               )}

//               <button
//                 type="submit"
//                 className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-500 hover:from-blue-700 hover:to-purple-600 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transform hover:scale-105 active:scale-95"
//               >
//                 {isLogin ? (
//                   <>
//                     <LogIn size={18} />
//                     Sign In
//                   </>
//                 ) : (
//                   <>
//                     <UserPlus size={18} />
//                     Create Account
//                   </>
//                 )}
//               </button>

//               <div className="relative flex items-center justify-center my-6">
//                 <div className="border-t border-slate-200 dark:border-slate-700 w-full"></div>
//                 <div className="absolute bg-white dark:bg-slate-900 px-3 text-sm text-slate-500 dark:text-slate-400">
//                   Or continue with
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-3">
//                 <Link to='/dashboard'>
//                 <button
//                   type="button"
//                   className="flex items-center justify-center gap-2 p-3 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all duration-200 transform hover:scale-105 active:scale-95"
//                 >
//                   <svg className="w-5 h-5" viewBox="0 0 24 24">
//                     <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
//                     <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
//                     <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
//                     <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
//                   </svg>
//                 </button>
//                 </Link>
                
//                 <button
//                   type="button"
//                   className="flex items-center justify-center gap-2 p-3 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all duration-200 transform hover:scale-105 active:scale-95"
//                 >
//                   <svg className="w-5 h-5" viewBox="0 0 24 24">
//                     <path fill="#0077B5" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
//                   </svg>
//                 </button>
//               </div>
//             </div>

//             <div className="mt-8 text-center">
//               <button
//                 onClick={toggleForm}
//                 className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors font-medium"
//               >
//                 {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
    
//   );
// };

// export default AuthForm;
// import React, { useState } from 'react';
// import { Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import {auth,provider} from '../firebase'
// import { signInWithPopup } from 'firebase/auth';

// const GoogleLoginButton = () => {
//   const navigate = useNavigate();

//   const handleGoogleLogin = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;
//       console.log("User Info:", user);

//       // Optionally: Store user info or token in localStorage
//       localStorage.setItem("token", await user.getIdToken());
//       localStorage.setItem("user", JSON.stringify(user));

//       navigate("/dashboard");
//     } catch (error) {
//       console.error("Google login error:", error);
//       alert("Google login failed");
//     }
//   };
// };

// const FloatingInput = ({ type, name, label, value, onChange, required }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const hasValue = value && value.length > 0;
  
  
//   return (
//     <div className="relative">
//       <input
//         type={type}
//         name={name}
//         value={value}
//         onChange={onChange}
//         required={required}
//         onFocus={() => setIsFocused(true)}
//         onBlur={() => setIsFocused(false)}
//         className="w-full px-4 py-3 bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all backdrop-blur-sm peer"
//         placeholder=" "
//       />
//       <label
//         className={`absolute left-4 transition-all duration-200 pointer-events-none ${
//           isFocused || hasValue
//             ? '-top-2 text-xs bg-white dark:bg-slate-900 px-2 text-blue-600 dark:text-blue-400'
//             : 'top-3 text-slate-500 dark:text-slate-400'
//         }`}
//       >
//         {label}
//       </label>
//     </div>
//   );
// };

// const PasswordStrength = ({ password }) => {
//   const getStrength = () => {
//     let score = 0;
//     if (password.length >= 8) score++;
//     if (/[a-z]/.test(password)) score++;
//     if (/[A-Z]/.test(password)) score++;
//     if (/[0-9]/.test(password)) score++;
//     if (/[^A-Za-z0-9]/.test(password)) score++;
//     return score;
//   };

//   const strength = getStrength();
//   const getColor = () => {
//     if (strength <= 2) return 'bg-red-500';
//     if (strength <= 3) return 'bg-yellow-500';
//     return 'bg-green-500';
//   };

//   const getLabel = () => {
//     if (strength <= 2) return 'Weak';
//     if (strength <= 3) return 'Medium';
//     return 'Strong';
//   };

//   return (
//     <div className="mt-2">
//       <div className="flex items-center gap-2 mb-1">
//         <span className="text-sm text-slate-600 dark:text-slate-400">Password strength:</span>
//         <span className={`text-sm font-medium ${
//           strength <= 2 ? 'text-red-500' : strength <= 3 ? 'text-yellow-500' : 'text-green-500'
//         }`}>
//           {getLabel()}
//         </span>
//       </div>
//       <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
//         <div
//           className={`h-2 rounded-full transition-all duration-300 ${getColor()}`}
//           style={{ width: `${(strength / 5) * 100}%` }}
//         />
//       </div>
//     </div>
//   );
// };

// const AuthForm = () => {
//   const navigate=useNavigate();

//   const [isLogin, setIsLogin] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     name: '',
//     confirmPassword: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const endpoint = isLogin ? 'login' : 'register';
//     const payload = isLogin
//       ? { email: formData.email, password: formData.password }
//       : formData;

//     if (!isLogin && formData.password !== formData.confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }

//     try {
//       const res = await fetch(`http://localhost:5000/api/${endpoint}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.msg || 'Something went wrong');
//         return;
//       }

//       if (isLogin) {
//         localStorage.setItem('token', data.token);
//         // Redirect or navigate to dashboard here
//         navigate('/dashboard');
//       } else {
//         alert('Account created successfully!');
//         setIsLogin(true);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('Server error');
//     }
//   };
// //   const handleLogin = async () => {
// //   if (!formData.email || !formData.password) {
// //     toast.error('Please enter both email and password.');
// //     return;
// //   }

// //   try {
// //     const res = await fetch('http://localhost:5000/api/login', {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json',
// //       },
// //       body: JSON.stringify({
// //         email: formData.email,
// //         password: formData.password,
// //       }),
// //     });

// //     const data = await res.json();

// //     if (res.ok) {
// //       toast.success('Login successful!');
// //       navigate('/dashboard'); // ✅ Redirect here
// //     } else {
// //       toast.error(data.message || 'Login failed');
// //     }
// //   } catch (error) {
// //     console.error('Login error:', error);
// //     toast.error('Something went wrong');
// //   }
// // };


//   const toggleForm = () => {
//     setIsLogin(!isLogin);
//     setFormData({
//       email: '',
//       password: '',
//       name: '',
//       confirmPassword: '',
//     });
//   };

//   return (
//     <div className="relative w-full max-w-md mx-auto">
//       <form
//         onSubmit={handleSubmit}
//         className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700/20 overflow-hidden p-8 transform transition-all duration-500 hover:scale-105"
//       >
//         {/* Animated background elements */}
//         <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
//         <div
//           className="absolute bottom-0 left-0 w-40 h-40 bg-purple-400/20 rounded-full blur-3xl animate-pulse"
//           style={{ animationDelay: '1s' }}
//         />

//         <div className="relative z-10">
//           <div className="text-center mb-8">
//             <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent mb-2 transition-all duration-300">
//               {isLogin ? 'Welcome Back' : 'Join HR Peers'}
//             </h1>
//             <p className="text-slate-500 dark:text-slate-400 transition-all duration-300">
//               {isLogin
//                 ? 'Sign in to access your account'
//                 : 'Create an account to get started'}
//             </p>
//           </div>

//           <div className="space-y-4">
//             {!isLogin && (
//               <FloatingInput
//                 type="text"
//                 name="name"
//                 label="Full Name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required={!isLogin}
//               />
//             )}

//             <FloatingInput
//               type="email"
//               name="email"
//               label="Email Address"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />

//             <div className="relative">
//               <FloatingInput
//                 type={showPassword ? 'text' : 'password'}
//                 name="password"
//                 label="Password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//               <button
//                 type="button"
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//               </button>
//             </div>

//             {!isLogin && (
//               <FloatingInput
//                 type="password"
//                 name="confirmPassword"
//                 label="Confirm Password"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 required={!isLogin}
//               />
//             )}

//             {formData.password && !isLogin && (
//               <PasswordStrength password={formData.password} />
//             )}

//             <button
//               type="submit"
//               className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-500 hover:from-blue-700 hover:to-purple-600 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transform hover:scale-105 active:scale-95"
//             >
//               {isLogin ? (
//                 <>
//                   <LogIn size={18} />
//                   Sign In
//                 </>
//               ) : (
//                 <>
//                   <UserPlus size={18} />
//                   Create Account
//                 </>
//               )}
//             </button>

//             <div className="relative flex items-center justify-center my-6">
//               <div className="border-t border-slate-200 dark:border-slate-700 w-full"></div>
//               <div className="absolute bg-white dark:bg-slate-900 px-3 text-sm text-slate-500 dark:text-slate-400">
//                 Or continue with
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-3">
//               <Link to="/dashboard">
//                 <button
//                   type="button"
//                   className="flex items-center justify-center gap-2 p-3 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
//                 >
//                   <img
//                     className="w-5 h-5"
//                     src="https://upload.wikimedia.org/wikipedia/commons/0/09/IOS_Google_icon.png"
//                     alt="Google"
//                   />
//                   Google
//                 </button>
//               </Link>
//               <Link to="/dashboard">
//                 <button
//                   type="button"
//                   className="flex items-center justify-center gap-2 p-3 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
//                 >
//                   <img
//                     className="w-5 h-5"
//                     src="https://upload.wikimedia.org/wikipedia/commons/9/99/Facebook_logo_2023.png"
//                     alt="Facebook"
//                   />
//                   Facebook
//                 </button>
//               </Link>
//             </div>

//             <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
//               {isLogin ? (
//                 <>
//                   Don't have an account?{' '}
//                   <button
//                     type="button"
//                     onClick={toggleForm}
//                     className="text-blue-600 hover:underline"
//                   >
//                     Sign Up
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   Already have an account?{' '}
//                   <button
//                     type="button"
//                     onClick={toggleForm}
//                     className="text-blue-600 hover:underline"
//                   >
//                     Sign In
//                   </button>
//                 </>
//               )}
//             </p>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AuthForm;

import React, { useState,useEffect } from 'react';
import { Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';

const FloatingInput = ({ type, name, label, className, value, onChange, required }) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value.length > 0;
  
  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full px-4 py-3 bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all backdrop-blur-sm peer"
        placeholder=" "
      />
      <label
        className={`absolute left-4 transition-all duration-200 pointer-events-none ${
          isFocused || hasValue
            ? '-top-2 text-xs bg-white dark:bg-slate-900 px-2 text-blue-600 dark:text-blue-400'
            : 'top-3 text-slate-500 dark:text-slate-400'
        }`}
      >
        {label}
      </label>
    </div>
  );
};

const PasswordStrength = ({ password }) => {
  const getStrength = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strength = getStrength();
  const getColor = () => {
    if (strength <= 2) return 'bg-red-500';
    if (strength <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getLabel = () => {
    if (strength <= 2) return 'Weak';
    if (strength <= 3) return 'Medium';
    return 'Strong';
  };

  return (
    <div className="mt-2">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-sm text-slate-600 dark:text-slate-400">Password strength:</span>
        <span className={`text-sm font-medium ${
          strength <= 2 ? 'text-red-500' : strength <= 3 ? 'text-yellow-500' : 'text-green-500'
        }`}>
          {getLabel()}
        </span>
      </div>
      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${getColor()}`}
          style={{ width: `${(strength / 5) * 100}%` }}
        />
      </div>
    </div>
  );
};

const AuthForm = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User Info:", user);

      // Store user info and token
      const token = await user.getIdToken();
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      }));

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Google login error:", error);
      alert("Google login failed: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };
  // LinkedInLoginButton.js

const handleLinkedInLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/linkedin'; 
  };

  // This hook runs when your app loads LinkedIn callback URL with token
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      // Save token and user info (optional: you can fetch user info from token)
      localStorage.setItem('token', token);
      
      // If your backend sends user info too, you can save that here

      // Clean URL after processing token (optional)
      window.history.replaceState({}, document.title, '/');

      // Redirect user after successful login
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const endpoint = isLogin ? 'login' : 'register';
    const payload = isLogin
      ? { email: formData.email, password: formData.password }
      : formData;

    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.msg || 'Something went wrong');
        return;
      }

      if (isLogin) {
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        alert('Account created successfully!');
        setIsLogin(true);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Server error');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      name: '',
      confirmPassword: '',
    });
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <form
        onSubmit={handleSubmit}
        className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700/20 overflow-hidden p-8 transform transition-all duration-500 hover:scale-105"
      >
        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-0 left-0 w-40 h-40 bg-purple-400/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />

        <div className="relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent mb-2 transition-all duration-300">
              {isLogin ? 'Welcome Back' : 'Join HR Peers'}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 transition-all duration-300">
              {isLogin
                ? 'Sign in to access your account'
                : 'Create an account to get started'}
            </p>
          </div>

          <div className="space-y-4">
            {!isLogin && (
              <FloatingInput
                type="text"
                name="name"
                className="text-black"
                label="Full Name"
                value={formData.name}
                onChange={handleChange}
                required={!isLogin}
              />
            )}

            <FloatingInput
              type="email"
              name="email"
              label="Email Address"
               className="text-black"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <div className="relative">
              <FloatingInput
                type={showPassword ? 'text' : 'password'}
                name="password"
                label="Password"
                className="text-black"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {!isLogin && (
              <FloatingInput
                type="password"
                name="confirmPassword"
                 className="text-black"
                label="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required={!isLogin}
              />
            )}

            {formData.password && !isLogin && (
              <PasswordStrength password={formData.password} />
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-500 hover:from-blue-700 hover:to-purple-600 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
              ) : isLogin ? (
                <>
                  <LogIn size={18} />
                  Sign In
                </>
              ) : (
                <>
                  <UserPlus size={18} />
                  Create Account
                </>
              )}
            </button>

            <div className="relative flex items-center justify-center my-6">
              <div className="border-t border-slate-200 dark:border-slate-700 w-full"></div>
              <div className="absolute bg-white dark:bg-slate-900 px-3 text-sm text-slate-500 dark:text-slate-400">
                Or continue with
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 p-3 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <img
                  className="w-5 h-5"
                  src="https://upload.wikimedia.org/wikipedia/commons/0/09/IOS_Google_icon.png"
                  alt="Google"
                />
               <p className='text-blue-950'>Google</p>
              </button>
              
                <button
              type="button"
              onClick={handleLinkedInLogin}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 p-3 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <img
                className="w-5 h-5"
                src="/linkedin.png" // LinkedIn icon
                alt="LinkedIn"
              />
              <p className='text-blue-700'>LinkedIn</p>
            </button>
              
            </div>

            <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
              {isLogin ? (
                <>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={toggleForm}
                    className="text-blue-600 hover:underline"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={toggleForm}
                    className="text-blue-600 hover:underline"
                  >
                    Sign In
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;