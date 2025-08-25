import { ToastContainer } from "react-toastify";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-1 bg-gray-100">
        <div className="max-w-7xl mx-auto h-full p-5">{children}</div>
      </div>
      <ToastContainer />
    </div>
  );
}
