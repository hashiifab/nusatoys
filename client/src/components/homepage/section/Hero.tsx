const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-blue-50/65 to-white py-30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-block bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full mb-4">
            ✨ Mainan Edukasi Premium
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-black leading-tight max-w-lg sm:max-w-xl lg:max-w-2xl">
            Investasi Terbaik untuk Masa Depan Anak Anda
          </h1>
          <p className="mt-6 text-lg text-black-100">
            Kembangkan logika, kreativitas, dan keterampilan teknis melalui
            mainan edukasi pilihan yang telah dipercaya ribuan keluarga
            Indonesia.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-start gap-4 w-full">
            <button className="w-full sm:w-auto bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 flex items-center justify-center">
              Jelajahi Koleksi Kami
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
            <button className="w-full sm:w-auto bg-white text-gray-700 px-6 py-3 rounded-lg font-semibold border border-gray-300 hover:bg-gray-100 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Lihat Video Demo
            </button>
          </div>
          <div className="mt-12 flex flex-row items-center justify-center sm:justify-start gap-4 sm:gap-8 text-center overflow-x-auto">
            <div className="flex flex-col items-center min-w-[80px]">
              <p className="text-2xl sm:text-3xl font-bold text-black">
                10K+
              </p>
              <p className="text-black-100 text-sm sm:text-base">
                Keluarga Puas
              </p>
            </div>
            <div className="flex flex-col items-center min-w-[80px]">
              <p className="text-2xl sm:text-3xl font-bold text-black">
                500+
              </p>
              <p className="text-black-100 text-sm sm:text-base">
                Produk Premium
              </p>
            </div>
            <div className="flex flex-col items-center min-w-[80px]">
              <p className="text-2xl sm:text-3xl font-bold text-black flex items-center justify-center">
                4.9
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 sm:h-5 sm:w-5 ml-1 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </p>
              <p className="text-black-100 text-sm sm:text-base">
                Rating Pelanggan
              </p>
            </div>
          </div>
        </div>
        <div className="relative">
          <img
            src="hero.png"
            alt="Anak-anak bermain"
            className="rounded-lg shadow-lg"
          />
          <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-lg shadow-md flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-yellow-500 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span className="font-semibold">Sertifikat SNI</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;