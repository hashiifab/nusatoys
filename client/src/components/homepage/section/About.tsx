const About = () => {
  return (
    <section id="tentang-kami" className="py-20 bg-gray-50 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Tentang NusaToys
          </h2>
          <p className="text-gray-600 mb-4">
            Sejak 2018, NusaToys berkomitmen menyediakan mainan edukasi
            premium yang tidak hanya menghibur, tetapi juga mengembangkan
            potensi anak Indonesia. Kami percaya bahwa setiap anak berhak
            mendapatkan akses terhadap alat pembelajaran terbaik.
          </p>
          <p className="text-gray-600 mb-6">
            Dengan kurasi ketat dari tim ahli pendidikan dan psikologi anak,
            setiap produk NusaToys telah melalui uji kualitas dan keamanan
            internasional. Kami bangga menjadi mitra terpercaya ribuan
            keluarga Indonesia dalam membangun masa depan yang lebih cerah.
          </p>
          <div className="flex flex-row gap-6 mt-6">
            <div className="flex flex-col items-start gap-2">
              <span className="text-blue-700 font-bold text-xl">100%</span>
              <p className="text-gray-500 text-sm">Produk Original</p>
            </div>
            <div className="flex flex-col items-start gap-2">
              <span className="text-blue-700 font-bold text-xl">SNI</span>
              <p className="text-gray-500 text-sm">Bersertifikat</p>
            </div>
          </div>
        </div>
        <div className="w-full h-96 lg:h-full rounded-2xl overflow-hidden">
          <img
            src="about.png"
            alt="Nusatoys"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default About;