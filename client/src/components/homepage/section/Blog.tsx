const Blog = () => {
  return (
    <section id="edukasi-blog" className="py-20 bg-white scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
          Edukasi & Blog
        </h2>
        <p className="text-gray-600 text-base sm:text-lg mb-12">
          Tips dan panduan untuk memaksimalkan manfaat mainan edukasi
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col text-left">
            <div className="relative w-full aspect-[3/2] overflow-hidden">
              <img
                src="blog-1.png"
                alt="Tips Memilih Mainan"
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <span className="absolute top-3 left-3 text-white text-xs font-semibold px-2 py-1 rounded bg-blue-900">
                Tips
              </span>
            </div>
            <div className="p-4 flex flex-col gap-2 flex-1">
              <span className="text-gray-400 text-sm">15 Jan 2024</span>
              <h3 className="font-semibold text-gray-900 text-lg">
                5 Tips Memilih Mainan Edukasi yang Tepat
              </h3>
              <p className="text-gray-600 text-sm flex-1">
                Panduan lengkap untuk orang tua dalam memilih mainan yang
                sesuai dengan usia dan minat anak...
              </p>
              <a
                href="#"
                className="text-blue-700 font-medium mt-2 inline-block"
              >
                Baca Selengkapnya →
              </a>
            </div>
          </div>
          <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col text-left">
            <div className="relative w-full aspect-[3/2] overflow-hidden">
              <img
                src="blog-2.png"
                alt="Manfaat LEGO"
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <span className="absolute top-3 left-3 text-white text-xs font-semibold px-2 py-1 rounded bg-blue-900">
                Edukasi
              </span>
            </div>
            <div className="p-4 flex flex-col gap-2 flex-1">
              <span className="text-gray-400 text-sm">12 Jan 2024</span>
              <h3 className="font-semibold text-gray-900 text-lg">
                Manfaat LEGO untuk Perkembangan Kognitif
              </h3>
              <p className="text-gray-600 text-sm flex-1">
                Penelitian terbaru menunjukkan bagaimana bermain LEGO dapat
                meningkatkan kemampuan spasial anak...
              </p>
              <a
                href="#"
                className="text-blue-700 font-medium mt-2 inline-block"
              >
                Baca Selengkapnya →
              </a>
            </div>
          </div>
          <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col text-left">
            <div className="relative w-full aspect-[3/2] overflow-hidden">
              <img
                src="blog-3.png"
                alt="Robotik untuk Anak"
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <span className="absolute top-3 left-3 text-white text-xs font-semibold px-2 py-1 rounded bg-blue-900">
                Robotik
              </span>
            </div>
            <div className="p-4 flex flex-col gap-2 flex-1">
              <span className="text-gray-400 text-sm">10 Jan 2024</span>
              <h3 className="font-semibold text-gray-900 text-lg">
                Robotik untuk Anak: Mulai dari Mana?
              </h3>
              <p className="text-gray-600 text-sm flex-1">
                Langkah-langkah mudah memperkenalkan dunia robotik kepada
                anak dengan cara yang menyenangkan...
              </p>
              <a
                href="#"
                className="text-blue-700 font-medium mt-2 inline-block"
              >
                Baca Selengkapnya →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;