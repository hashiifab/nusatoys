const Footer = () => {
  return (
    <footer id="kontak" className="bg-gray-900 text-gray-300 pt-16 pb-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-white text-xl font-bold mb-4">NusaToys</h3>
          <p className="text-gray-400">
            Mainan edukasi premium untuk masa depan anak Indonesia yang lebih
            cerah.
          </p>
          <div className="flex gap-4 mt-4">
            <a href="#" aria-label="Instagram">
              <svg
                className="w-5 h-5 text-gray-400 hover:text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.803.24 2.225.402a4.602 4.602 0 0 1 1.675 1.084 4.602 4.602 0 0 1 1.084 1.675c.162.422.348 1.055.402 2.225.058 1.266.07 1.645.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.803-.402 2.225a4.602 4.602 0 0 1-1.084 1.675 4.602 4.602 0 0 1-1.675 1.084c-.422.162-1.055.348-2.225.402-1.266.058-1.645.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.803-.24-2.225-.402a4.602 4.602 0 0 1-1.675-1.084 4.602 4.602 0 0 1-1.084-1.675c-.162-.422-.348-1.055-.402-2.225C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.054-1.17.24-1.803.402-2.225a4.602 4.602 0 0 1 1.084-1.675 4.602 4.602 0 0 1 1.675-1.084c.422-.162 1.055-.348 2.225-.402C8.416 2.175 8.796 2.163 12 2.163zm0 1.838a6.002 6.002 0 1 0 0 12.003 6.002 6.002 0 0 0 0-12.003zm0 9.867a3.865 3.865 0 1 1 0-7.73 3.865 3.865 0 0 1 0 7.73zm6.406-11.845a1.44 1.44 0 1 1 0-2.88 1.44 1.44 0 0 1 0 2.88z" />
              </svg>
            </a>
            <a href="#" aria-label="YouTube">
              <svg
                className="w-5 h-5 text-gray-400 hover:text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23.498 6.186a2.987 2.987 0 0 0-2.104-2.104C19.514 3.5 12 3.5 12 3.5s-7.514 0-9.394.582a2.987 2.987 0 0 0-2.104 2.104C0 8.066 0 12 0 12s0 3.934.502 5.814a2.987 2.987 0 0 0 2.104 2.104C4.486 20.5 12 20.5 12 20.5s7.514 0 9.394-.582a2.987 2.987 0 0 0 2.104-2.104C24 15.934 24 12 24 12s0-3.934-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Produk</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-white">
                LEGO & Building
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Robotik & STEM
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Sains & Eksperimen
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Puzzle & Logic
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Bantuan</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-white">
                Kebijakan Privasi
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Syarat & Ketentuan
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Pengembalian Barang
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                FAQ
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Kontak</h4>
          <ul className="space-y-2 text-gray-400">
            <li>📞 +62 21 1234 5678</li>
            <li>✉ hello@nusatoys.com</li>
            <li>📍 Jl. Pendidikan No. 123, Jakarta Selatan 12345</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-500">
        © 2025 NusaToys. Semua hak cipta dilindungi.
      </div>
    </footer>
  );
};

export default Footer;