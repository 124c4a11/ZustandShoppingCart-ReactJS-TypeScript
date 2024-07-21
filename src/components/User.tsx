import { useStore } from "@/store/store";
import { useShallow } from "zustand/react/shallow";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { UserIcon } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useEffect } from "react";

export function User() {
  const { name, email, setAddress, address, fetchUser } = useStore(
    useShallow((state) => ({
      name: state.name,
      email: state.email,
      setAddress: state.setAddress,
      address: state.address,
      fetchUser: state.fetchUser,
    }))
  );

  useEffect(() => {
    (async () => {
      await fetchUser();
    })();
  }, [fetchUser]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" size="icon">
          <UserIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="overflow-y-scroll space-y-2 w-96">
        <div className="flex items-center gap-2">
          <p>{name}</p>
          <p className="text-sm">{email}</p>
        </div>
        <Label htmlFor="address">Your Address:</Label>
        <Input
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </PopoverContent>
    </Popover>
  );
}
