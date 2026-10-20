function Hero() {
  const handleClick = () => {
    console.log('Tombol Lihat Karya diklik!')
  }

  return (
    <section
      id="home"
      className="scroll-mt-16 bg-linear-to-br from-indigo-50 via-white to-sky-50"
    >
      <div className="mx-auto flex max-w-5xl flex-col-reverse items-center gap-10 px-4 py-14 md:flex-row md:justify-between md:py-24">
        <div className="text-center md:text-left">
          <span className="inline-block rounded-full bg-indigo-100 px-4 py-1 text-sm font-semibold text-indigo-700">
            Visual Designer
          </span>
          <h1 className="mt-4 text-2xl font-extrabold text-slate-900 sm:text-3xl">
            Halo! Saya Andi Muhammad Naufal Sulfahmi
          </h1>
          <h2 className="mt-2 text-xl font-medium text-slate-600">
            Antusias terhadap desain visual
          </h2>
          <p className="mt-4 max-w-md text-slate-600">
            Saya suka membuat desain logo, layout menu, dan tampilan website
            yang rapi. Sekarang sedang belajar membuat website dengan React.
          </p>
          <a
            href="#gallery"
            onClick={handleClick}
            className="mt-8 inline-block rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700"
          >
            Lihat Karya
          </a>
        </div>
        <div className="rounded-full bg-linear-to-tr from-indigo-500 to-sky-400 p-1.5 shadow-xl">
          <img
            src="/images/profil.jpg"
            alt="Foto profil Naufal"
            className="h-52 w-52 rounded-full border-4 border-white object-cover sm:h-72 sm:w-72"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
