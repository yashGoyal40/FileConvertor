import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./ui/card";
import { Button } from './ui/button';

const SignUp = () => {
  const [password, setPassword] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Password validation rules
  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_\-+=\[\]\\/;`~' ]/.test(password); // includes special chars and space
  const hasValidLength = password.length >= 8;
  const noLeadingOrTrailingSpace = password.trim() === password && password.length > 0;

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsTyping(true); // Start showing validation rules when typing begins
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-black overflow-hidden">
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(75, 75, 75, 0.3) 1px, transparent 1px), 
                          linear-gradient(to bottom, rgba(75, 75, 75, 0.3) 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
        zIndex:0,
      }}
    ></div>

    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md z-10">
        <Card className="bg-neutral-900">
          <CardHeader>
            <CardTitle className="text-white">Sign Up</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm text-white">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="w-full rounded border border-gray-700 bg-white p-2"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="name" className="block text-sm text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full rounded border border-gray-700 bg-white p-2"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full rounded border border-gray-700 bg-white p-2"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="w-full rounded border border-gray-700 bg-white p-2"
                    required
                  />
                </div>

                {isTyping && (
                  <ul className="mt-2 text-sm">
                    <li className={hasLowerCase ? "text-green-500" : "text-red-500"}>
                      {hasLowerCase ? "✓" : "✗"} Password must contain a lower case letter
                    </li>
                    <li className={hasUpperCase ? "text-green-500" : "text-red-500"}>
                      {hasUpperCase ? "✓" : "✗"} Password must contain an upper case letter
                    </li>
                    <li className={hasNumber ? "text-green-500" : "text-red-500"}>
                      {hasNumber ? "✓" : "✗"} Password must contain a number
                    </li>
                    <li className={hasValidLength ? "text-green-500" : "text-red-500"}>
                      {hasValidLength ? "✓" : "✗"} Password must contain at least 8 characters
                    </li>
                    <li className={hasSpecialChar ? "text-green-500" : "text-red-500"}>
                      {hasSpecialChar ? "✓" : "✗"} Password must contain a special character or a space
                    </li>
                    <li className={noLeadingOrTrailingSpace ? "text-green-500" : "text-red-500"}>
                      {noLeadingOrTrailingSpace ? "✓" : "✗"} Password must not contain a leading or trailing space
                    </li>
                  </ul>
                )}
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-4">
            <Button variant="outline" className="w-full text-black">Sign Up</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
    </div>
  );
};

export default SignUp;
