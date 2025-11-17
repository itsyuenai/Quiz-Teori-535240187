export default function HomePage() {
  const name = "Naisya Yuen R";
  const nim = "535240187"; 

  return (
    <section>
      <div className="card shadow-sm border-0">
        <div className="card-body p-5">
          <h1 className="display-6 fw-bold">Halo, {name}</h1>

          <p className="text-muted mb-1">NIM: {nim}</p>

          <p className="text-muted mt-3">
            Selamat datang di Wishlist App — simpan daftar barang impianmu.
          </p>

          <a href="/list" className="btn btn-primary btn-lg mt-3">
            <i className="bi bi-stars me-2"></i>
            Buka Wishlist
          </a>
        </div>
      </div>
    </section>
  );
}