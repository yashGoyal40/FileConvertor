import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { signIn, resetPassword, confirmResetPassword } from "@aws-amplify/auth"; 
import { login } from "@/store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom"; // Import Link here

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotPasswordCode, setForgotPasswordCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signIn({
        username: username,
        password: password,
      });
      dispatch(login(username));
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleForgotPassword = async () => {
    try {
      await resetPassword({ username: username }); // Send reset password code
      setIsForgotPassword(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleConfirmForgotPassword = async () => {
    try {
      await confirmResetPassword({
        username: username,
        confirmationCode: forgotPasswordCode,
        newPassword: newPassword,
      }); // Confirm reset password
      setError("Password reset successful. Please log in with your new password.");
      setIsForgotPassword(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-black overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(75, 75, 75, 0.3) 1px, transparent 1px), 
                            linear-gradient(to bottom, rgba(75, 75, 75, 0.3) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          zIndex: 0,
        }}
      ></div>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md z-10">
          <Card className="bg-neutral-900">
            <CardHeader>
              <CardTitle className="text-white">{isForgotPassword ? "Reset Password" : "Login"}</CardTitle>
            </CardHeader>
            <CardContent>
              {!isForgotPassword ? (
                <form onSubmit={handleSignIn}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="username" className="block text-sm text-white">Email</label>
                      <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full rounded border border-gray-700 bg-white p-2"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="password" className="block text-sm text-white">Password</label>
                      <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded border border-gray-700 bg-white p-2"
                        required
                      />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <div className="text-right text-sm text-gray-400">
                      <button
                        type="button"
                        className="hover:underline mb-4"
                        onClick={handleForgotPassword}
                      >
                        Forgot password?
                      </button>
                    </div>
                  </div>
                  <Button type="submit" variant="outline" className="w-full text-black">Login</Button>
                </form>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="forgotPasswordCode" className="block text-sm text-white">Confirmation Code</label>
                    <input
                      type="text"
                      id="forgotPasswordCode"
                      value={forgotPasswordCode}
                      onChange={(e) => setForgotPasswordCode(e.target.value)}
                      className="w-full rounded border border-gray-700 bg-white p-2"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="newPassword" className="block text-sm text-white">New Password</label>
                    <input
                      type="password"
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full rounded border border-gray-700 bg-white p-2"
                      required
                    />
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full text-black"
                    onClick={handleConfirmForgotPassword}
                  >
                    Confirm Reset Password
                  </Button>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <p className="text-center text-sm text-gray-400">
                Don't have an account? <Link to="/auth/signup" className="text-blue-500 hover:underline">Sign Up</Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
