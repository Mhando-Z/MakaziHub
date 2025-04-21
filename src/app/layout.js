import "./globals.css";
import { DataProvider } from "@/context/DataContext";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "@/context/UserContext";
import "react-activity/dist/library.css";

export const metadata = {
  title: "MakaziHub",
  description:
    "Find your next home the smart way with MakaziHub — Tanzania's trusted hub for renting rooms and houses, connecting people to comfortable and affordable living spaces with just a few clicks.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex bg-green-50 flex-col min-h-screen overflow-x-hidden">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <UserProvider>
          <DataProvider>{children}</DataProvider>
        </UserProvider>
      </body>
    </html>
  );
}
