/* eslint-disable @next/next/no-img-element */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Link from 'next/link';

// Tipe data untuk produk (dari API dummyJSON)
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

// Tipe data untuk respons API (dummyJSON membungkus array-nya)
interface ApiResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

async function getProducts() {
  const res = await fetch('https://dummyjson.com/products?limit=12');

  if (!res.ok) {
    throw new Error('Gagal mengambil data dari API');
  }

  return res.json() as Promise<ApiResponse>;
}

export default async function ExplorePage() {
  const data = await getProducts();
  const products = data.products;

  return (
    <div>
      <h1 className="mb-4">Eksplorasi Produk (External API)</h1>
      <p className="lead mb-4">
        Temukan item untuk ditambahkan ke wishlist Anda. Ini adalah data dari
        API publik eksternal.
      </p>

      {/* 5. Tampilkan data menggunakan Bootstrap (looping/map) */}
      <div className="row g-4">
        {products.map((product) => (
          <div key={product.id} className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm">
              <img
                src={product.thumbnail}
                className="card-img-top"
                alt={product.title}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text text-muted flex-grow-1">
                  {product.description.substring(0, 70)}...
                </p>
                <h4 className="text-end text-success">${product.price}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}