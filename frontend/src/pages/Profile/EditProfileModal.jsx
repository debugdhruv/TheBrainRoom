import { useState, useEffect } from "react";
import EditIcon from "@/assets/icons/Edit.svg";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import CalendarIcon from "@/assets/icons/calendar.svg";

export default function EditProfileModal({ open, onClose }) {
  const [editMode, setEditMode] = useState(false);
  const [dob, setDob] = useState(null);

  useEffect(() => {
    if (!open) {
      setEditMode(false);
    }
  }, [open]);

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

        <form className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="Dhruv Tiwari" disabled={!editMode} />
          </div>

          <div className="grid gap-2">
            <Label>Date of Birth</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="opacity-60 hover:opacity-100 transition-opacity w-full justify-between text-left font-normal text-zinc-800 px-3"
                  disabled={!editMode}
                >
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
            <Select>
              <SelectTrigger className="w-full" disabled={!editMode}>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" disabled={!editMode} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" disabled={!editMode} />
          </div>
        </form>

        <DialogFooter className="pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Close
          </Button>
          {editMode && (
            <Button type="submit">Save Changes</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}