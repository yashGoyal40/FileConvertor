import React, { useState } from "react";
import { useSelector } from "react-redux"; // Import useSelector
import { isLoggedIn } from '../store/authSlice'; // Import isLoggedIn selector
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerClose,
  DrawerTitle,
} from "./ui/drawer";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from "./ui/alert-dialog";
import NOLoggedIn from "./NOLoggedIn";

function Csvtojson() {
  const [csvContent, setCsvContent] = useState("");
  const [output, setOutput] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  
  // Use useSelector to check if the user is logged in
  const isAuthenticated = useSelector(isLoggedIn);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      showAlert("Please select a file first.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setCsvContent(e.target.result);
    };
    reader.readAsText(file);
  };

  const convertFile = async () => {
    if (csvContent) {
      try {
        const response = await fetch(import.meta.env.VITE_CSV_TO_JSON, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain",
          },
          body: csvContent,
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const json = await response.json();
        setOutput(JSON.stringify(json, null, 2));
        setIsDrawerOpen(true);
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
        showAlert("There has been a problem with your fetch operation.");
      }
    } else {
      showAlert("Please upload a CSV file first.");
    }
  };

  const showAlert = (message) => {
    setAlertMessage(message);
    setIsAlertOpen(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    showAlert("JSON copied to clipboard!");
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "output.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  // Render nothing if not authenticated
  if (!isAuthenticated) {
    return (<NOLoggedIn />);
  }

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
      <div className="flex flex-col items-center justify-center h-screen bg-black">
        <Card className="w-full max-w-3xl bg-black text-white border-white p-8 z-10">
          <CardHeader>
            <CardTitle className="text-2xl">CSV to JSON Converter</CardTitle>
            <CardDescription>
              Upload your CSV file to convert it to JSON.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="mb-4 w-full bg-black text-white border-white p-2"
            />
            <Button onClick={convertFile} className="w-full p-4">
              Convert
            </Button>
          </CardContent>
        </Card>

        <Drawer
          shouldScaleBackground={false}
          open={isDrawerOpen}
          onOpenChange={setIsDrawerOpen}
        >
          <DrawerContent className="bg-black text-white">
            <DrawerHeader>
              <DrawerTitle>JSON Output</DrawerTitle>
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
                  className="flex-1 mx-2 my-2"
                >
                  Copy
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleDownload}
                  className="flex-1 mx-2 my-2"
                >
                  Download
                </Button>
                <DrawerClose asChild>
                  <Button variant="destructive" className="flex-1 mx-2 my-2">
                    Close
                  </Button>
                </DrawerClose>
              </div>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
          <AlertDialogTrigger asChild>
            <Button style={{ display: "none" }} />
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

export default Csvtojson;
