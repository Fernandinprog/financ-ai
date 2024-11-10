import { ReactNode } from "react";

interface percentegeItemProps {
  icon: ReactNode;
  title: string;
  value: number;
}

const PercentegeItem = ({ icon, title, value }: percentegeItemProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
      <p className="text-sm font-bold">{value}</p>
    </div>
  );
};

export default PercentegeItem;
