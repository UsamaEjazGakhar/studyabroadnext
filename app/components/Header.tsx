"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header: React.FC = () => {
  const pathname = usePathname();
  return (
    <header id="header">
      <div className="navbar">
        <div className="logo">StudyVerse</div>
        <nav className="nav-links" id="nav-links">
          <a href="/">Home</a>
          <a href="#programs">Programs</a>
          <a href="/universities">Universities</a>
          <a href="/opportunities">Opportunities</a>
          <a href="/blog">Blog</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="nav-cta" style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          <a href="https://wa.me/923001234567" className="btn btn-ghost">
            <i className="fab fa-whatsapp" /> WhatsApp
          </a>
          {pathname !== "/login" && (
            <a href="#consultation" className="btn btn-primary btn-sm">Apply Now</a>
          )}
          <Link href="/login" className="btn btn-primary" style={{ padding: "0.5rem 1rem", fontSize: "0.9rem" }}>Login</Link>
          <button className="menu-toggle" id="menu-toggle" aria-label="Toggle menu">
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
