const Testimonials = () => {
  return (
    <section className="bg-blue-50/65 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-center">
          Testimoni & Kisah Sukses
        </h2>
        <p className="text-gray-600 text-base sm:text-lg mb-12 text-center">
          Dengarkan pengalaman nyata dari keluarga yang telah merasakan
          manfaatnya
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-start">
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-700 mb-4 italic">
              "Sejak bermain dengan robotik kit dari NusaToys, Kenzo jadi
              lebih tertarik dengan matematika dan sains. Nilainya di
              sekolah meningkat drastis!"
            </p>
            <div className="flex items-start gap-3 mt-auto">
              <img
                src="profile-1.png"
                alt="Ibu Sarah Wijaya"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <p className="font-semibold text-gray-800">
                  Ibu Sarah Wijaya
                </p>
                <p className="text-gray-500 text-sm">
                  Ibu dari Kenzo (8 tahun)
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-start">
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-700 mb-4 italic">
              "Produk NusaToys sangat membantu dalam pembelajaran STEM di
              kelas. Anak-anak lebih antusias dan mudah memahami konsep yang
              diajarkan."
            </p>
            <div className="flex items-start gap-3 mt-auto">
              <img
                src="profile-2.png"
                alt="Pak Budi Santoso"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <p className="font-semibold text-gray-800">
                  Pak Budi Santoso
                </p>
                <p className="text-gray-500 text-sm">
                  Guru SD Negeri 15 Jakarta
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-start">
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-700 mb-4 italic">
              "Investasi terbaik untuk anak! Ariel sekarang bisa membuat
              robot sederhana dan sangat bangga dengan karyanya.
              Kreativitasnya berkembang pesat."
            </p>
            <div className="flex items-start gap-3 mt-auto">
              <img
                src="profile-3.png"
                alt="Ibu Lisa Chen"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <p className="font-semibold text-gray-800">Ibu Lisa Chen</p>
                <p className="text-gray-500 text-sm">
                  Ibu dari Ariel (10 tahun)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;