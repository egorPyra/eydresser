import Sidebar from "./sidebar/Sidebar";
import styles from "./layout.module.css"; 
import { Toaster } from 'react-hot-toast';

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.main}>{children}</main>
      <Toaster position="bottom-center" />
    </div>
  );
}
