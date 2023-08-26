"use client";

import { Client } from "@prisma/client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FormLabel } from "./ui/form";
import { Textarea } from "./ui/textarea";

type ClientProfileProps = { clientData: Client };

const ClientProfile = ({ clientData }: ClientProfileProps) => {
  const [edit, setEdit] = useState(true);

  const placeholderStyles = "placeholder:text-black disabled:text-black";
  return (
    <div>
      <Input
        disabled={edit}
        placeholder={clientData.name ? clientData.name : "No Data on Record"}
        className={placeholderStyles}
      />
      <Input
        disabled={edit}
        placeholder={
          clientData.phoneNumber ? clientData.phoneNumber : "No Data on Record"
        }
        className={placeholderStyles}
      />
      <Input
        disabled={edit}
        placeholder={clientData.email ? clientData.email : "No Data on Record"}
        className={placeholderStyles}
      />
      <Input
        disabled={edit}
        placeholder={
          clientData.budget ? `$${clientData.budget}` : "No Data on Record"
        }
        className={placeholderStyles}
      />
      <Input
        disabled={edit}
        placeholder={
          clientData.preApproved ? "Pre-Approved" : "Not Pre-Approved"
        }
        className={placeholderStyles}
      />
      <Input
        disabled={edit}
        placeholder={
          clientData.occupation ? clientData.occupation : "No Data on Record"
        }
        className={placeholderStyles}
      />
      <Input
        disabled={edit}
        placeholder={
          clientData.maritalStatus
            ? clientData.maritalStatus
            : "No Data on Record"
        }
        className={placeholderStyles}
      />
      <Input
        disabled={edit}
        placeholder={
          clientData.children ? clientData.children : "No Data on Record"
        }
        className={placeholderStyles}
      />
      <Textarea
        disabled={edit}
        placeholder={clientData.notes ? clientData.notes : "No Notes"}
        className={placeholderStyles}
      />
      <Button onClick={() => setEdit(false)}>
        {edit ? "Edit" : "Save Changes"}
      </Button>
    </div>
  );
};

export default ClientProfile;
