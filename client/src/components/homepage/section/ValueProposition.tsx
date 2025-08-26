const ValueProposition = () => {
  return (
    <section className="bg-gray-50/15 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center my-8">
          Mengapa Mainan Edukasi?
        </h2>
        <p className="text-gray-600 text-base sm:text-lg font-normal text-center mb-8">
          Berdasarkan penelitian terbaru, mainan edukasi terbukti
          meningkatkan kemampuan kognitif anak hingga 40% lebih efektif
          dibanding metode pembelajaran konvensional.
        </p>
        <div className="flex flex-col sm:flex-col md:flex-row md:justify-between gap-6 md:gap-8 lg:gap-10">
          <div className="flex-1 min-w-full md:min-w-[30%] bg-white rounded-xl shadow-lg hover:shadow-2xl p-6 sm:p-8 flex flex-col items-center transform transition-all duration-300">
            <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-4 sm:mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 sm:w-8 h-6 sm:h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 12.75V14.25a3 3 0 003 3h.75a3 3 0 003-3V12.75a3 3 0 00-3-3H19.5a3 3 0 00-3 3zm0-7.5V7.5a3 3 0 003 3h.75a3 3 0 003-3V5.25a3 3 0 00-3-3H19.5a3 3 0 00-3 3zM7.5 12.75V14.25a3 3 0 003 3h.75a3 3 0 003-3V12.75a3 3 0 00-3-3H10.5a3 3 0 00-3 3zm0-7.5V7.5a3 3 0 003 3h.75a3 3 0 003-3V5.25a3 3 0 00-3-3H10.5a3 3 0 00-3 3z"
                />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-center">
              Problem Solving
            </h3>
            <p className="text-gray-500 text-sm sm:text-base text-center">
              Mengasah kemampuan berpikir logis dan analitis melalui
              tantangan yang menyenangkan dan terstruktur.
            </p>
          </div>
          <div className="flex-1 min-w-full md:min-w-[30%] bg-white rounded-xl shadow-lg hover:shadow-2xl p-6 sm:p-8 flex flex-col items-center transform transition-all duration-300">
            <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center mb-4 sm:mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 sm:w-8 h-6 sm:h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 3.75h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
                />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-center">
              Kreativitas & Inovasi
            </h3>
            <p className="text-gray-500 text-sm sm:text-base text-center">
              Membangun imajinasi dan kemampuan berpikir out-of-the-box
              untuk menghadapi tantangan masa depan.
            </p>
          </div>
          <div className="flex-1 min-w-full md:min-w-[30%] bg-white rounded-xl shadow-lg hover:shadow-2xl p-6 sm:p-8 flex flex-col items-center transform transition-all duration-300">
            <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-4 sm:mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 sm:w-8 h-6 sm:h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-center">
              Keterampilan STEM
            </h3>
            <p className="text-gray-500 text-sm sm:text-base text-center">
              Memperkenalkan konsep Science, Technology, Engineering, dan
              Mathematics sejak dini dengan cara yang menyenangkan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;