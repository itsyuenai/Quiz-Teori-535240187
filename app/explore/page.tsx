'use client';
import React, { useEffect, useState } from 'react';

type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

export default function ExplorePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=12')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2 className="mb-4">
        <i className="bi bi-globe2 me-2"></i>Explore Produk
      </h2>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="row g-3">
          {products.map(prod => (
            <div className="col-md-4" key={prod.id}>
              <div className="card shadow-sm h-100">
                <img src={prod.thumbnail} className="card-img-top" alt={prod.title} />

                <div className="card-body">
                  <h5>{prod.title}</h5>
                  <p className="text-muted">Harga: ${prod.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
