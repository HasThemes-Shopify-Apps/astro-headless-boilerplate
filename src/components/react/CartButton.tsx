// Header cart trigger — bag icon + live item-count badge.
import { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { ShoppingBag } from 'lucide-react';
import { $cart, initCart, openCart } from '~/stores/cart';

export default function CartButton() {
  const cart = useStore($cart);

  // Hydrate the cart once when the first island mounts.
  useEffect(() => {
    initCart();
  }, []);

  const count = cart?.totalQuantity ?? 0;

  return (
    <button
      type="button"
      onClick={openCart}
      className="relative grid h-11 w-11 place-items-center rounded-md text-ink transition-fluid hover:bg-ink/[0.05]"
      aria-label={count > 0 ? `Open cart, ${count} item${count === 1 ? '' : 's'}` : 'Open cart'}
    >
      <ShoppingBag size={21} strokeWidth={1.6} />
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-accent-strong px-1 font-mono text-[10px] font-semibold leading-none text-white tabular">
          {count}
        </span>
      )}
    </button>
  );
}
