import Sidebar from "./sidebar/Sidebar";

export default function AccountLauout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <>
        <Sidebar/>
        {children}
      </>
    );
  }