const Newsletter = () => {
  return (
    <section className="bg-blue-900 text-white py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Dapatkan Tips Edukasi Terbaru
        </h2>
        <p className="mb-10 text-lg font-light">
          Berlangganan newsletter kami untuk mendapatkan artikel edukatif
          dan info produk terbaru
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-2xl mx-auto">
          <input
            type="email"
            placeholder="Masukkan email Anda"
            className="w-full sm:flex-1 px-5 py-3 text-lg rounded-lg text-white border border-amber-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          />
          <button
            className="w-full sm:w-auto px-8 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition text-lg"
          >
            Berlangganan
          </button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;