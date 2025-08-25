import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex bg-blue-100 justify-between items-center p-5 h-[10vh] flex-shrink-0 ">
      <p className="text-center text-3xl w-full">
        <Link href={"/"}>Inventory Management System</Link>
      </p>
    </div>
  );
};

export default Navbar;
