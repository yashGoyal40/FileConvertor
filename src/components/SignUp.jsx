import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Button } from "./ui/button";
import {
  signUp,
  confirmSignUp,
  signIn,
  resendSignUpCode,
} from "@aws-amplify/auth"; // Import from AWS Amplify Auth

import { login } from "@/store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    code: "",
  });
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isTyping, setIsTyping] = useState(false);
  const [step, setStep] = useState(1); // Tracks the current step in the flow
  const [isResendingCode, setIsResendingCode] = useState(false);
  const [message, setMessage] = useState("");

  // Password validation rules
  const hasLowerCase = /[a-z]/.test(formData.password);
  const hasUpperCase = /[A-Z]/.test(formData.password);
  const hasNumber = /\d/.test(formData.password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_\-+=\[\]\\/;`~' ]/.test(
    formData.password
  );
  const hasValidLength = formData.password.length >= 8;
  const noLeadingOrTrailingSpace =
    formData.password.trim() === formData.password &&
    formData.password.length > 0;


  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    if (id === "password") setIsTyping(true);
  };

  // Function to sign up the user
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signUp({
        username: formData.email, // Use email as the username
        password: formData.password,
        attributes: {
          email: formData.email,
          name: formData.name, // Send the name attribute
        },
      });
      setMessage("A confirmation code has been sent to your email.");
      setStep(2); // Move to the confirmation step
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  // Function to confirm the sign-up
  const handleConfirmSignUp = async (e) => {
    e.preventDefault();
    try {
      await confirmSignUp(
        {
          username: formData.email,
          confirmationCode: formData.code,
        }
      ); // Use email for confirmation
      setMessage("Sign up confirmed. Signing you in...");
      await signIn({
        username:formData.email,
        password:formData.password
      }); // Automatically sign in after confirmation
      dispatch(login(formData.emailn))
      navigate("/")
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  // Function to resend the confirmation code
  const handleResendSignUpCode = async () => {
    setIsResendingCode(true);
    try {
      await resendSignUpCode(formData.email); // Use email to resend the code
      setMessage("A new confirmation code has been sent to your email.");
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
    setIsResendingCode(false);
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
              <CardTitle className="text-white">
                {step === 1 ? "Sign Up" : "Confirm Your Sign Up"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={step === 1 ? handleSignUp : handleConfirmSignUp}>
                <div className="space-y-4">
                  {step === 1 ? (
                    <>
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm text-white"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full rounded border border-gray-700 bg-white p-2"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm text-white"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full rounded border border-gray-700 bg-white p-2"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="password"
                          className="block text-sm text-white"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="w-full rounded border border-gray-700 bg-white p-2"
                          required
                        />
                      </div>

                      {isTyping && (
                        <ul className="mt-2 text-sm">
                          <li
                            className={
                              hasLowerCase ? "text-green-500" : "text-red-500"
                            }
                          >
                            {hasLowerCase ? "✓" : "✗"} Lower case letter
                          </li>
                          <li
                            className={
                              hasUpperCase ? "text-green-500" : "text-red-500"
                            }
                          >
                            {hasUpperCase ? "✓" : "✗"} Upper case letter
                          </li>
                          <li
                            className={
                              hasNumber ? "text-green-500" : "text-red-500"
                            }
                          >
                            {hasNumber ? "✓" : "✗"} Number
                          </li>
                          <li
                            className={
                              hasValidLength ? "text-green-500" : "text-red-500"
                            }
                          >
                            {hasValidLength ? "✓" : "✗"} At least 8 characters
                          </li>
                          <li
                            className={
                              hasSpecialChar ? "text-green-500" : "text-red-500"
                            }
                          >
                            {hasSpecialChar ? "✓" : "✗"} Special character or
                            space
                          </li>
                          <li
                            className={
                              noLeadingOrTrailingSpace
                                ? "text-green-500"
                                : "text-red-500"
                            }
                          >
                            {noLeadingOrTrailingSpace ? "✓" : "✗"} No
                            leading/trailing space
                          </li>
                        </ul>
                      )}
                    </>
                  ) : (
                    <>
                      <div>
                        <label
                          htmlFor="code"
                          className="block text-sm text-white"
                        >
                          Confirmation Code
                        </label>
                        <input
                          type="text"
                          id="code"
                          value={formData.code}
                          onChange={handleChange}
                          className="w-full rounded border border-gray-700 bg-white p-2"
                          required
                        />
                      </div>
                    </>
                  )}
                </div>
              </form>
              <p className="text-white mt-4">{message}</p>
            </CardContent>
            <CardFooter className="flex flex-col items-center space-y-4">
              {step === 1 ? (
                <Button
                  variant="outline"
                  className="w-full text-black"
                  onClick={handleSignUp}
                >
                  Sign Up
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    className="w-full text-black"
                    onClick={handleConfirmSignUp}
                  >
                    Confirm Sign Up
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full text-black"
                    disabled={isResendingCode}
                    onClick={handleResendSignUpCode}
                  >
                    {isResendingCode ? "Resending..." : "Resend Code"}
                  </Button>
                </>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
