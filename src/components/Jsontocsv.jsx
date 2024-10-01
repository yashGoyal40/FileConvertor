import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from './ui/card'; 
import { Drawer, DrawerContent, DrawerHeader, DrawerFooter, DrawerClose, DrawerTitle } from './ui/drawer'; 
import { Button } from './ui/button'; 
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel } from './ui/alert-dialog'; 

import { useSelector } from "react-redux"; // Import useSelector
import { isLoggedIn } from '../store/authSlice'; // Import isLoggedIn selector
import NOLoggedIn from './NOLoggedIn';

function Jsontocsv() {
  const [jsonContent, setJsonContent] = useState('');
  const [output, setOutput] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const isAuthenticated = useSelector(isLoggedIn);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      showAlert("Please select a file first.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setJsonContent(e.target.result);
      setAlertMessage('');
    };
    reader.readAsText(file);
  };

  const convertFile = async () => {
    if (jsonContent) {
      try {
        const response = await fetch(import.meta.env.VITE_JSON_TO_CSV, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: jsonContent,
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const csv = await response.text();
        setOutput(csv);
        setIsDrawerOpen(true);
      } catch (error) {
        showAlert('There has been a problem with your fetch operation.');
      }
    } else {
      showAlert("Please upload a JSON file first.");
    }
  };

  const showAlert = (message) => {
    setAlertMessage(message);
    setIsAlertOpen(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    showAlert('CSV copied to clipboard!');
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'output.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!isAuthenticated) {
    return (<NOLoggedIn />)
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-black overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(75, 75, 75, 0.3) 1px, transparent 1px), 
                            linear-gradient(to bottom, rgba(75, 75, 75, 0.3) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          zIndex: 0
        }}
      ></div>
      <div className="flex flex-col items-center justify-center h-screen bg-black ">
        <Card className="w-full max-w-3xl bg-black text-white border-white p-8 z-10">
          <CardHeader>
            <CardTitle className="text-2xl">JSON to CSV Converter</CardTitle>
            <CardDescription>Upload your JSON file to convert it to CSV.</CardDescription>
          </CardHeader>
          <CardContent>
            <input
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="mb-4 w-full bg-black text-white border-white p-2"
            />
            <Button onClick={convertFile} className="w-full p-4">Convert</Button>
          </CardContent>
        </Card>

        <Drawer
          shouldScaleBackground={false}
          open={isDrawerOpen}
          onOpenChange={setIsDrawerOpen}
        >
          <DrawerContent className="bg-black text-white">
            <DrawerHeader>
              <DrawerTitle>CSV Output</DrawerTitle>
            </DrawerHeader>
            <div className="p-4">
              <pre className="bg-black text-white p-4 rounded overflow-auto border-white max-h-96">
                {output}
              </pre>
            </div>
            <DrawerFooter className="flex justify-between">
              <div className="flex flex-wrap justify-between w-full">
                <Button
                  variant="secondary"
                  onClick={handleCopy}
                  className="mx-2 my-2 flex-1"
                >
                  Copy
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleDownload}
                  className="mx-2 my-2 flex-1"
                >
                  Download
                </Button>
                <DrawerClose asChild>
                  <Button
                    variant="destructive"
                    className="mx-2 my-2 flex-1"
                  >
                    Close
                  </Button>
                </DrawerClose>
              </div>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
          <AlertDialogTrigger asChild>
            <Button style={{ display: 'none' }} />
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-black text-white border-white">
            <AlertDialogHeader>
              <AlertDialogTitle>Alert</AlertDialogTitle>
              <AlertDialogDescription>{alertMessage}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <Button variant="outline" className="text-black">Close</Button>
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default Jsontocsv;
