import IconCase from "@/components/page/blocks/case-item/icon-case";
import TextCloud from "@/components/page/blocks/case-item/text-cloud";
import CaseItemHeader from "@/components/page/blocks/case-item/case-item-header";

import { ActionType } from "@prisma/client";

interface CompletedCaseProps extends React.HTMLAttributes<HTMLDivElement> {
  comment: string | null;
  date: Date | null;
  type: ActionType;
  responsible?: string | null;
}
const CompletedCase: React.FC<CompletedCaseProps> = ({
  type,
  responsible,
  date,
  comment,
}) => {
  return (
    <div className="relative flex flex-col gap-2 md:pl-6 [&:not(:first-child)]:before:w-[2px] [&:not(:first-child)]:before:h-[17px] [&:not(:first-child)]:before:absolute [&:not(:first-child)]:before:top-full [&:not(:first-child)]:before:left-8 [&:not(:first-child)]:before:bg-border">
      <div className="absolute top-0 left-0 hidden md:block">
        <IconCase type={type} />
      </div>
      <CaseItemHeader
        type={type}
        responsible={responsible || "not assigned"}
        date={date || new Date()}
      />
      <div className="w-full border rounded-md py-4 px-6 bg-muted/40">
        <TextCloud text={comment} />
      </div>
    </div>
  );
};

export default CompletedCase;
