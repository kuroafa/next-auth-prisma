'use client'
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Client } from "@prisma/client";
import React, { useState } from "react";


type Props = {
  clientData: Client[];
};

const EmailForm = ({ clientData }: Props) => {
    const [email, setEmail] = useState<string>("")
  return (
    <Card className="col-span-3 bg-gray-200 h-[800px]">
      <Input value={email} />
    </Card>
  );
};

export default EmailForm;
