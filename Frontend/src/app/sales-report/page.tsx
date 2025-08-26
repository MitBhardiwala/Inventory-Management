import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ProductSalesType } from "../lib/definitions";
import { getSalesReport } from "../lib/services/sales";
import ProductDetails from "./productReport";

export default async function salesReport() {
  const { productsReport, totalSales } = await getSalesReport();

  return (
    <>
      <div className="bg-white p-3 border-1 border-gray-500 rounded-md">
        <div className="text-2xl font-bold text-center p-2">
          Sales Report Page
        </div>

        <div className="p-5 mx-10 border-1 border-gray-300 rounded-md">
          <p className="text-xl font-semibold">Sales per Product Section</p>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Product Id</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Description</TableCell>
                  <TableCell align="right">Category</TableCell>
                  <TableCell align="right">Current Stock Available</TableCell>
                  <TableCell align="right">Total Quantiity Sold</TableCell>
                  <TableCell align="right">Total Sales</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productsReport.map((product: ProductSalesType) => (
                  <TableRow
                    key={product.productId}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <ProductDetails productId={product.productId} />

                    <TableCell align="right" sx={{ color: "green" }}>
                      {product._sum.quantity}
                    </TableCell>
                    <TableCell align="right" sx={{ color: "blue" }}>
                      {product._sum.totalPrice}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="p-5 mx-10 text-right text-gray-500">
          <p>
            Total Products Sold Generated :
            <span className="text-black">{totalSales._sum.totalQuantity}</span>
          </p>
          <p>
            Total Sales Generated :
            <span className="text-black">{totalSales._sum.totalAmount}</span>
          </p>
        </div>
      </div>
    </>
  );
}
