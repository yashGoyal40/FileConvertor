import React from 'react';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';


function MyCard({ name }) {
  let card = {
    title: "",
    description: "",
    image: ""
  };
  
  if (name === "csvtojson") {
    card.title = "CSV TO JSON";
    card.description = "Convert your CSV file format, structured like a table, into JSON";
    card.image = "/csvtojson.jpg";
  } else {
    card.title = "JSON TO CSV";
    card.description = "Convert JSON objects back into a simple CSV format";
    card.image = "/jsontocsv.jpg";
  }

  return (
    <>
      <Card className="h-full bg-neutral-900">
      <CardHeader>
        <CardTitle className="text-white">{card.title}</CardTitle>
        <CardDescription className="text-white">{card.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <img src={card.image} alt="" className="object-contain h-full w-full" />
        </div>
      </CardContent>
      <CardFooter>
        <Link to={name === "csvtojson" ? "/csvtojson" : "/jsontocsv"}>
          <Button variant="outline">Convert</Button>
        </Link>
      </CardFooter>
    </Card>
    </>
  );
}

export default MyCard;
