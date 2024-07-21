import { useStore } from "@/store/store";
import { Product } from "@/types/product";
import { useShallow } from "zustand/react/shallow";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";
import { useEffect } from "react";

type ChangeQtyButtonsProps = {
  productId: Product["id"];
};

export function ChangeQtyButtons({ productId }: ChangeQtyButtonsProps) {
  const { getProductById, incrementQty, decrementQty, setTotal } = useStore(
    useShallow((state) => ({
      getProductById: state.getProductById,
      incrementQty: state.incrementQty,
      decrementQty: state.decrementQty,
      setTotal: state.setTotal,
    }))
  );

  const product = getProductById(productId);

  useEffect(() => {
    const unSubscribeStore = useStore.subscribe(
      (state) => state.products,
      (products) => {
        setTotal(
          products.reduce((acc, { price, qty }) => price * qty + acc, 0)
        );
      },
      {
        fireImmediately: true,
      }
    );

    return unSubscribeStore;
  }, [setTotal]);

  return (
    <>
      {product && (
        <div className="flex gap-2 items-center">
          <Button onClick={() => decrementQty(product.id)} size="icon">
            <Minus />
          </Button>
          <span>{product.qty}</span>
          <Button onClick={() => incrementQty(product.id)} size="icon">
            <Plus />
          </Button>
        </div>
      )}
    </>
  );
}
