// import React, { useState } from 'react';
// import { Auth } from 'aws-amplify';

// const SignUp = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const handleSignup = async (e) => {
//         e.preventDefault();
//         try {
//             await Auth.signUp({
//                 username: email,
//                 password,
//                 attributes: { email },
//             });
//             alert('Signup successful! Check your email for a verification link.');
//         } catch (error) {
//             console.error('Signup error:', error);
//             alert(error.message);
//         }
//     };

//     return (
//         <form onSubmit={handleSignup}>
//             <input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//             />
//             <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//             />
//             <button type="submit">Sign Up</button>
//         </form>
//     );
// };

// export default SignUp;


import React from 'react'

function SignUp() {
  return (
    <div>SignUp</div>
  )
}

export default SignUp