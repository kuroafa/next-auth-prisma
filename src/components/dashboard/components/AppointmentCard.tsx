import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

type Props = {};

const AppointmentCard = (props: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Property Showing</CardTitle>
        <CardDescription>Nader Abdulrub</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};

export default AppointmentCard;
