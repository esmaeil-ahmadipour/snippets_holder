import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return <div className="mx-auto max-w-4xl px-6 py-10">{children}</div>;
}
