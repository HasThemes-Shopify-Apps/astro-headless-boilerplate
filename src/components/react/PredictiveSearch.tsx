// ============================================================
//  PredictiveSearch — header search trigger + instant-results
//  overlay. Debounced calls to /api/search; Enter goes to the
//  full /search page.
// ============================================================
import { useEffect, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import { formatMoney } from '~/lib/utils';
import { useFocusTrap } from './useFocusTrap';

interface PredictProduct {
  id: string;
  title: string;
  handle: string;
  featuredImage?: { url: string; altText?: string | null } | null;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
}
interface PredictCollection {
  id: string;
  title: string;
  handle: string;
}
interface Results {
  products: PredictProduct[];
  collections: PredictCollection[];
  queries: { text: string }[];
}

const EMPTY: Results = { products: [], collections: [], queries: [] };

export default function PredictiveSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Results>(EMPTY);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useFocusTrap<HTMLDivElement>(open);

  // Debounced fetch.
  useEffect(() => {
    if (!open) return;
    const q = query.trim();
    if (q.length < 2) {
      setResults(EMPTY);
      setLoading(false);
      return;
    }
    setLoading(true);
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
        const data = (await res.json()) as Results;
        setResults({
          products: data.products ?? [],
          collections: data.collections ?? [],
          queries: data.queries ?? [],
        });
      } catch {
        setResults(EMPTY);
      } finally {
        setLoading(false);
      }
    }, 220);
    return () => clearTimeout(t);
  }, [query, open]);

  // Body scroll lock + Esc + autofocus.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (q) window.location.href = `/search?q=${encodeURIComponent(q)}`;
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="grid h-11 w-11 place-items-center rounded-md text-ink transition-fluid hover:bg-ink/[0.05]"
        aria-label="Search"
      >
        <Search size={20} strokeWidth={1.6} />
      </button>

      {open && (
        <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label="Search">
          <div
            className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
          />
          <div
            ref={dialogRef}
            className="absolute inset-x-0 top-0 mx-auto max-h-[88vh] w-full max-w-2xl overflow-hidden rounded-b-xl bg-snow shadow-2xl"
          >
            <form onSubmit={submit} className="flex items-center gap-3 border-b border-line px-5 py-4">
              <Search size={20} strokeWidth={1.6} className="shrink-0 text-mist" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, collections…"
                className="w-full bg-transparent text-base text-ink outline-none placeholder:text-mist"
                aria-label="Search query"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-md text-graphite transition-fluid hover:bg-ink/[0.06]"
                aria-label="Close search"
              >
                <X size={18} strokeWidth={1.6} />
              </button>
            </form>

            <p className="sr-only" role="status" aria-live="polite">
              {query.trim().length < 2
                ? ''
                : loading
                  ? 'Searching'
                  : results.products.length + results.collections.length === 0
                    ? `No matches for ${query.trim()}`
                    : `${results.products.length} products and ${results.collections.length} collections found`}
            </p>

            <div className="max-h-[70vh] overflow-y-auto px-5 py-4">
              {query.trim().length < 2 ? (
                <p className="py-6 text-center text-sm text-mist">
                  Type at least two characters to search.
                </p>
              ) : loading && !results.products.length ? (
                <p className="py-6 text-center text-sm text-mist">Searching…</p>
              ) : results.products.length === 0 && results.collections.length === 0 ? (
                <p className="py-6 text-center text-sm text-mist">
                  No matches for “{query.trim()}”.
                </p>
              ) : (
                <div className="flex flex-col gap-5">
                  {results.collections.length > 0 && (
                    <section>
                      <h3 className="eyebrow mb-2 text-graphite">Collections</h3>
                      <div className="flex flex-wrap gap-2">
                        {results.collections.map((c) => (
                          <a
                            key={c.id}
                            href={`/collections/${c.handle}`}
                            className="rounded-md border border-line bg-paper px-3 py-1.5 text-sm transition-fluid hover:border-ink"
                          >
                            {c.title}
                          </a>
                        ))}
                      </div>
                    </section>
                  )}

                  {results.products.length > 0 && (
                    <section>
                      <h3 className="eyebrow mb-2 text-graphite">Products</h3>
                      <ul className="flex flex-col">
                        {results.products.map((p) => (
                          <li key={p.id}>
                            <a
                              href={`/products/${p.handle}`}
                              className="flex items-center gap-3 rounded-md px-2 py-2 transition-fluid hover:bg-ink/[0.04]"
                            >
                              <span className="h-12 w-12 shrink-0 overflow-hidden rounded border border-line bg-paper">
                                {p.featuredImage && (
                                  <img
                                    src={p.featuredImage.url}
                                    alt={p.featuredImage.altText ?? p.title}
                                    className="h-full w-full object-cover"
                                    loading="lazy"
                                  />
                                )}
                              </span>
                              <span className="min-w-0 flex-1 truncate text-sm text-ink">
                                {p.title}
                              </span>
                              <span className="font-mono text-sm tabular text-graphite">
                                {formatMoney(
                                  p.priceRange.minVariantPrice.amount,
                                  p.priceRange.minVariantPrice.currencyCode,
                                )}
                              </span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
