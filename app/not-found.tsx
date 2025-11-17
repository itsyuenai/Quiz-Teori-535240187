import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="text-center py-5">
      <h1 className="display-1 fw-bold">404</h1>
      <p className="fs-3">
        <span className="text-danger">Opps!</span> Halaman tidak ditemukan.
      </p>
      <p className="lead">
        Halaman yang Anda cari mungkin telah dihapus atau tidak ada.
      </p>
      <Link href="/" className="btn btn-primary">
        Kembali ke Home
      </Link>
    </div>
  );
}