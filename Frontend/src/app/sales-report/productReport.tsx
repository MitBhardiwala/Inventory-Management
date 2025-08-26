import { TableCell } from "@mui/material";
import { fetchProductById } from "../lib/services/products";

export default async function ProductDetails({
  productId,
}: {
  productId: number;
}) {
  const productDetails = await fetchProductById(productId);

  return (
    <>
      <TableCell component="th" scope="row">
        {productDetails.id}
      </TableCell>

      <TableCell align="right">{productDetails.name}</TableCell>
      <TableCell align="right">{productDetails.description}</TableCell>
      <TableCell align="right">{productDetails.category}</TableCell>
      <TableCell align="right">{productDetails.stock}</TableCell>
    </>
  );
}
