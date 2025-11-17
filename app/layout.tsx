/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @next/next/no-html-link-for-pages */
import './globals.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export const metadata = {
  title: 'Wishlist App',
  description: 'A simple wishlist app built with Next.js + Bootstrap',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css"
        />
      </head>

      <body>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
          <div className="container">
            <a className="navbar-brand d-flex align-items-center" href="/">
              <i className="bi bi-heart-fill me-2"></i>
              Wishlist App
            </a>
            <div className="ms-auto">
              <a className="btn btn-outline-light btn-sm me-2" href="/">Home</a>
              <a className="btn btn-light btn-sm" href="/list">
                <i className="bi bi-list-stars me-1"></i>Wishlist
              </a>
            </div>
          </div>
        </nav>

        <main className="container my-5">{children}</main>

        {/* FOOTER */}
        <footer>
          <div className="container py-3 d-flex justify-content-between align-items-center border-top">
            <div>&copy; {new Date().getFullYear()} Wishlist App</div>
            <div className="text-muted small">
              Made by <strong>Yuen &lt;3</strong>
            </div>
          </div>
        </footer>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
      </body>
    </html>
  );
}