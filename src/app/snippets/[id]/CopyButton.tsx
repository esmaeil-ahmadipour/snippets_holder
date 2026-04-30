"use client";

import { Button } from "@/components/Button";
import { CopyIcon } from "@/components/icons/CopyIcon";

interface CopyButtonProps {
  code: string;
}

export function CopyButton({ code }: CopyButtonProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <Button onClick={handleCopy} variant="ghost" size="sm" icon={<CopyIcon />}>
      Copy code
    </Button>
  );
}
