// import React, { useState } from 'react';
// import { Auth } from 'aws-amplify';
// import { Authenticator } from '@aws-amplify/ui-react'

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             await Auth.signIn(email, password);
//             alert('Login successful!');
//         } catch (error) {
//             console.error('Login error:', error);
//             alert(error.message);
//         }
//     };

//     return (
//         <form onSubmit={handleLogin}>
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
//             <button type="submit">Log In</button>
//         </form>
//     );
// };

// export default Login;


import React from 'react'

function Login() {
  return (
    <div>Login</div>
  )
}

export default Login