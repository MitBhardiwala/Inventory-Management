import { Button } from "@mui/material";

export default function Home() {
  return (
    <>
      <div className="h-full flex flex-col gap-5 justify-center items-center">
        <p className="text-3xl font-bold">Inventory Management System</p>

        <Button variant="outlined" href="/products">
          Manage Products
        </Button>
        <Button color="secondary" href="/purchase">
          Purchase Products
        </Button>
      </div>
    </>
  );
}
