"use client";

import { Client } from "@prisma/client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FormLabel } from "./ui/form";
import { Textarea } from "./ui/textarea";
import { Mail, Phone, UserCircle, ThumbsDown, ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";

type ClientProfileProps = { clientData: Client };

const ClientProfile = ({ clientData }: ClientProfileProps) => {
  const [edit, setEdit] = useState(true);

  const placeholderStyles =
    " placeholder:text-black disabled:text-black text-2xl border-b-1 border-t-0 border-x-0 rounded-none focus-visible:ring-0 border-black outline-none focus";

  const inputLabelStyles = "font-light";

  return (
    <div className="flex flex-col gap-8 md:grid-4 mt-8">
      <div className="flex flex-col gap-4 items-center md:flex-row">
        <div>
          <UserCircle size={130} />
        </div>
        <div className="flex flex-col gap-2 items-center md:items-start">
          <h2 className="text-4xl font-semibold">{clientData.name}</h2>
          <div className="flex flex-col gap-1 items-center md:items-start">
            <h2 className="uppercase font-medium">Contact Info:</h2>
            <div>
              <h3 className="flex gap-2">
                <Mail size={20} /> {clientData.email}
              </h3>
              <h3 className="flex gap-2">
                <Phone size={20} />
                {`+1 (${clientData.phoneNumber.slice(0, 3)})-
                ${clientData.phoneNumber.slice(3, 6)}-
                ${clientData.phoneNumber.slice(6, 10)}`}
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className={inputLabelStyles}>Budget:</h2>
          <Input
            disabled={edit}
            type="currency"
            placeholder={
              clientData.budget ? `$${clientData.budget}` : "No Budget"
            }
            className={cn(placeholderStyles, "")}
          />
        </div>
        <div>
          <h2 className={inputLabelStyles}>Pre-Approved?</h2>{" "}
          <Input
            disabled={edit}
            placeholder={
              clientData.preApproved ? "Pre-Approved " : "Not Pre-Approved"
            }
            className={placeholderStyles}
          />
        </div>
        <div>
          <h2 className={inputLabelStyles}>Occupation:</h2>
          <Input
            disabled={edit}
            placeholder={
              clientData.occupation
                ? clientData.occupation
                : "No Data on Record"
            }
            className={placeholderStyles}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className={inputLabelStyles}>Martial Status:</h2>
          <Input
            disabled={edit}
            placeholder={
              clientData.maritalStatus
                ? clientData.maritalStatus
                : "No Data on Record"
            }
            className={placeholderStyles}
          />
        </div>
        <div>
          <h2 className={inputLabelStyles}>Number of Children:</h2>
          <Input
            disabled={edit}
            placeholder={
              clientData.children ? clientData.children : "No Data on Record"
            }
            className={placeholderStyles}
          />
        </div>
      </div>
      <div className="grid grid-cols-1">
        <div>
          <h2 className={inputLabelStyles}>Notes:</h2>
          <Textarea
            disabled={edit}
            placeholder={clientData.notes ? clientData.notes : "No Notes"}
            className="placeholder:text-black h-[125px]"
          />
        </div>
      </div>
      <Button onClick={() => setEdit(false)} className="w-fit px-14 self-start">
        {edit ? "Edit" : "Save Changes"}
      </Button>
    </div>
  );
};

export default ClientProfile;
