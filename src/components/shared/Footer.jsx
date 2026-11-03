import Link from "next/link";
import { HandHeart, Mail } from "lucide-react";
import {
  FaInstagram,
  FaLinkedin,
  FaFacebookF,
  FaXTwitter,
} from "react-icons/fa6";

const Footer = () => {
  const linkStyle =
    "transition-colors duration-200 hover:text-green-400 focus-visible:text-green-400 focus-visible:outline-none";

  return (
    <footer className="bg-[#102A22] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-3">
        {/* Brand */}
        <div>
          <div className="mb-4 flex items-center gap-2">
            <HandHeart size={28} className="text-green-400" />
            <h2 className="text-2xl font-bold">Ekota</h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-gray-300">
            Bringing people together through kindness, volunteering, and
            meaningful community action.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-5 text-lg font-semibold">Quick Links</h3>

          <div className="flex flex-col gap-3 text-sm text-gray-300">
            <Link href="/" className={linkStyle}>
              Home
            </Link>
            <Link href="/events" className={linkStyle}>
              Upcoming Events
            </Link>
            <Link href="/login" className={linkStyle}>
              Login
            </Link>
            <Link href="/register" className={linkStyle}>
              Register
            </Link>
          </div>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="mb-5 text-lg font-semibold">Connect With Us</h3>

          <div className="flex items-center gap-5">
            <Link
              href="https://www.facebook.com/yeasin.khan.67651"
              aria-label="Facebook"
              className={linkStyle}
            >
              <FaFacebookF size={21} />
            </Link>

            <Link href="#" aria-label="Instagram" className={linkStyle}>
              <FaInstagram size={21} />
            </Link>

            <Link
              href="https://www.linkedin.com/in/khan-yeasin/ "
              aria-label="LinkedIn"
              className={linkStyle}
            >
              <FaLinkedin size={21} />
            </Link>

            <Link
              href="https://x.com/kyeasin58"
              aria-label="X"
              className={linkStyle}
            >
              <FaXTwitter size={21} />
            </Link>

            <Link
              href="kyeasin58@gmail.com"
              aria-label="Email"
              className={linkStyle}
            >
              <Mail size={21} />
            </Link>
          </div>

          <p className="mt-5 text-sm text-gray-300">
            Together, We Make a Difference.
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/15 px-5 py-5 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Ekota. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
