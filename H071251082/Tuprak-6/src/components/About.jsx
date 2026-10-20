function About() {
  const dataDiri = [
    { id: 1, label: 'Nama', nilai: 'Andi Muhammad Naufal Sulfahmi' },
    { id: 2, label: 'Peran', nilai: 'Mahasiswa & Visual Designer' },
    { id: 3, label: 'Domisili', nilai: 'Makassar' },
    { id: 5, label: 'Minat', nilai: 'Branding dan Layout' },
  ]

  return (
    <section id="about" className="scroll-mt-16 py-16">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-center text-3xl font-bold text-slate-900">Tentang Saya</h2>
        <div className="mx-auto mt-2 h-1 w-16 rounded bg-indigo-600" />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <p className="leading-relaxed text-slate-600">
              Saya Naufal, mahasiswa yang suka desain visual. Saya pernah
              mengerjakan desain untuk usaha kuliner. Melalui portofolio ini saya ingin
              menunjukkan bahwa desain dan pemrograman web bisa saling
              melengkapi.
            </p>
          </div>
          <ul className="divide-y divide-slate-100 rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
            {dataDiri.map((item) => (
              <li key={item.id} className="flex justify-between gap-4 px-6 py-3">
                <span className="font-semibold text-indigo-600">{item.label}</span>
                <span className="text-right">{item.nilai}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default About
