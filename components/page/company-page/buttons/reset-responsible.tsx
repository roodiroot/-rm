"use client";

import { changeResponsible } from "@/actions/company/change-responsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "@prisma/client";

interface ResetResponsibleButtonProps
  extends React.ComponentPropsWithoutRef<"button"> {
  userId: string | null;
  users: User[] | null;
  companyId: string;
}

const ResetResponsibleButton: React.FC<ResetResponsibleButtonProps> = ({
  companyId,
  userId,
  users,
}) => {
  const resetResponsible = async (e: string) => {
    if (e && companyId) {
      await changeResponsible(companyId, e);
    }
  };

  return (
    <Select value={userId || "null"} onValueChange={resetResponsible}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Ответственный" />
      </SelectTrigger>
      <SelectContent>
        {users?.map((user) => (
          <SelectItem key={user.id} value={user.id}>
            {user.name}
          </SelectItem>
        ))}
        <SelectItem value={"null"}>Не назначен</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default ResetResponsibleButton;
