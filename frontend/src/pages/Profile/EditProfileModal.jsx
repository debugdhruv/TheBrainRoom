// import { useState, useEffect } from "react";
// import EditIcon from "@/assets/icons/Edit.svg";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
// import { Calendar } from "@/components/ui/calendar";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { format } from "date-fns";
// import CalendarIcon from "@/assets/icons/calendar.svg";

// export default function EditProfileModal({ open, onClose }) {
//   const [editMode, setEditMode] = useState(false);
//   const [dob, setDob] = useState(null);

//   useEffect(() => {
//     if (!open) {
//       setEditMode(false);
//     }
//   }, [open]);

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-md">
//         <DialogHeader>
//           <div className="flex items-center justify-between w-full">
//             <DialogTitle className="text-xl">Profile Details</DialogTitle>
//             <Button
//               type="button"
//               size="icon"
//               variant="ghost"
//               onClick={() => setEditMode((prev) => !prev)}>
//               <img src={EditIcon} alt="Edit" className="w-6 h-6" />
//             </Button>
//           </div>
//         </DialogHeader>

//         <form className="space-y-4">
//           <div className="grid gap-2">
//             <Label htmlFor="name">Full Name</Label>
//             <Input id="name" placeholder="Dhruv Tiwari" disabled={!editMode} />
//           </div>

//           <div className="grid gap-2">
//             <Label>Date of Birth</Label>
//             <Popover>
//               <PopoverTrigger asChild>
//                 <Button
//                   variant="outline"
//                   className="opacity-60 hover:opacity-100 transition-opacity w-full justify-between text-left font-normal text-zinc-800 px-3"
//                   disabled={!editMode}
//                 >
//                   <span>{dob ? format(dob, "dd-MM-yyyy") : "Date of Birth"}</span>
//                   <img src={CalendarIcon} alt="calendar icon" className="h-5 w-5" />
//                 </Button>
//               </PopoverTrigger>
//               <PopoverContent className="w-auto max-h-[300px] overflow-y-auto p-0" align="start">
//                 <Calendar
//                   mode="single"
//                   selected={dob}
//                   onSelect={setDob}
//                   captionLayout="dropdown"
//                   dropdownCaption={true}
//                   fromYear={1950}
//                   toYear={new Date().getFullYear()}
//                 />
//               </PopoverContent>
//             </Popover>
//           </div>

//           <div className="grid gap-2">
//             <Label htmlFor="gender">Gender</Label>
//             <Select>
//               <SelectTrigger className="w-full" disabled={!editMode}>
//                 <SelectValue placeholder="Select gender" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="male">Male</SelectItem>
//                 <SelectItem value="female">Female</SelectItem>
//                 <SelectItem value="other">Other</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="grid gap-2">
//             <Label htmlFor="email">Email</Label>
//             <Input id="email" type="email" placeholder="you@example.com" disabled={!editMode} />
//           </div>

//           <div className="grid gap-2">
//             <Label htmlFor="password">Password</Label>
//             <Input id="password" type="password" placeholder="••••••••" disabled={!editMode} />
//           </div>
//         </form>

//         <DialogFooter className="pt-4">
//           <Button type="button" variant="outline" onClick={onClose}>
//             Close
//           </Button>
//           {editMode && (
//             <Button type="submit">Save Changes</Button>
//           )}
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }

import { useEffect, useState } from "react";
import EditIcon from "@/assets/icons/Edit.svg";
import CalendarIcon from "@/assets/icons/calendar.svg";
import { toast } from "sonner";
import { format } from "date-fns";
import { useUser } from "@/context/useUser";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function EditProfileModal({ open, onClose }) {
  const { userDetails, setUserDetails } = useUser();
  const [editMode, setEditMode] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState(null);
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (userDetails) {
      setFirstName(userDetails.firstName || "");
      setLastName(userDetails.lastName || "");
      setDob(userDetails.dob ? new Date(userDetails.dob) : null);
      setGender(userDetails.gender || "");
      setEmail(userDetails.email || "");
    }
  }, [userDetails]);

  useEffect(() => {
    if (!open) {
      setEditMode(false);
    }
  }, [open]);

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    const payload = {
      firstName,
      lastName,
      gender,
      dob,
      email,
    };
    if (currentPassword && newPassword) {
      payload.currentPassword = currentPassword;
      payload.newPassword = newPassword;
    }

    try {
      const baseUrl = import.meta.env.VITE_APP_BASE_URL;
      const res = await fetch(`${baseUrl}/api/profile/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");

      toast.success("Profile updated successfully");
      setUserDetails(data.user);
      localStorage.setItem("userData", JSON.stringify(data.user));
      setEditMode(false);
      onClose();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between w-full">
            <DialogTitle className="text-xl">Profile Details</DialogTitle>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => setEditMode((prev) => !prev)}>
              <img src={EditIcon} alt="Edit" className="w-6 h-6" />
            </Button>
          </div>
        </DialogHeader>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid gap-2">
            <Label htmlFor="name">First Name</Label>
            <Input
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={!editMode}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={!editMode}
            />
          </div>

          <div className="grid gap-2">
            <Label>Date of Birth</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="opacity-60 hover:opacity-100 transition-opacity w-full justify-between text-left font-normal text-zinc-800 px-3"
                  disabled={!editMode}>
                  <span>{dob ? format(dob, "dd-MM-yyyy") : "Date of Birth"}</span>
                  <img src={CalendarIcon} alt="calendar icon" className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto max-h-[300px] overflow-y-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dob}
                  onSelect={setDob}
                  captionLayout="dropdown"
                  dropdownCaption={true}
                  fromYear={1950}
                  toYear={new Date().getFullYear()}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="gender">Gender</Label>
            <Select value={gender} onValueChange={setGender} disabled={!editMode}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Others">Others</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!editMode}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              type="password"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              disabled={!editMode}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={!editMode}
            />
          </div>
        </form>

        <DialogFooter className="pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Close
          </Button>
          {editMode && <Button onClick={handleSave}>Save Changes</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}