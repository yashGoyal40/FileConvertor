import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardFooter, CardContent } from './ui/card';
import { Button } from './ui/button';

function NOLoggedIn() {
  return (
    <>
      <div className="relative min-h-screen flex flex-col bg-black overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(75, 75, 75, 0.3) 1px, transparent 1px), 
                              linear-gradient(to bottom, rgba(75, 75, 75, 0.3) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
        <div className="relative z-10 flex justify-center items-center min-h-screen p-6">
          <Card className="bg-neutral-900 w-full max-w-md">
            <CardHeader>
              <CardContent className="text-white font-extrabold">You are not logged in</CardContent>
              <CardContent>
                <p className="text-white mt-1">
                  Please log in to convert files and access the file conversion tools.
                </p>
              </CardContent>
            </CardHeader>
            <CardFooter className="flex justify-center">
              <Link to="/auth/login">
                <Button variant="outline">Log In</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}

export default NOLoggedIn;
