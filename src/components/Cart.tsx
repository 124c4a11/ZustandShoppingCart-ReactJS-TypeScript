import { CircleX, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ChangeQtyButtons } from "./ChangeQtyButtons";
import { useStore } from "@/store/store";
import { useShallow } from "zustand/react/shallow";

export function Cart() {
  const { reset, products, removeProduct, total, address } = useStore(
    useShallow((state) => ({
      reset: state.reset,
      products: state.products,
      removeProduct: state.removeProduct,
      total: state.total,
      address: state.address,
    }))
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" size="icon">
          <ShoppingCart />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="overflow-y-scroll space-y-2 w-96">
        <div className="flex gap-2 text-lg items-center">
          <h2>Cart:</h2>
          <Button onClick={reset} variant="destructive" size="icon">
            <CircleX />
          </Button>
        </div>
        <div className="space-y-2">
          {products.map((product) => (
            <Card className="flex flex-col" key={product.id}>
              <CardHeader className="flex flex-row items-center gap-2">
                <CardTitle>{product.title}</CardTitle>
                <Button
                  onClick={() => removeProduct(product.id)}
                  size="icon"
                  variant="destructive"
                >
                  <Trash2 />
                </Button>
              </CardHeader>
              <CardContent>{product.price}</CardContent>
              <CardFooter>
                <ChangeQtyButtons productId={product.id} />
              </CardFooter>
            </Card>
          ))}
        </div>
        <p>Total: {total}$</p>
        <p>Address: {address}</p>
      </PopoverContent>
    </Popover>
  );
}
