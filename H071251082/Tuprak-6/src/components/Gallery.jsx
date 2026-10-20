import foto1 from '../assets/gallery/foto1.jpg'
import foto2 from '../assets/gallery/foto2.jpg'
import foto4 from '../assets/gallery/foto3.jpg'

function Gallery() {
  const galeriFoto = [
    { id: 1, src: foto1, judul: 'Landing Page Kopicoy' },
    { id: 2, src: foto2, judul: 'Website Sugiban' },
    { id: 4, src: foto4, judul: 'Portofolio' },
  ]

  return (
    <section id="gallery" className="scroll-mt-16 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-center text-3xl font-bold text-slate-900">Galeri</h2>
        <div className="mx-auto mt-2 h-1 w-16 rounded bg-indigo-600" />
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {galeriFoto.map((foto) => (
            <figure
              key={foto.id}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200"
            >
              <div className="overflow-hidden">
                <img
                  src={foto.src}
                  alt={foto.judul}
                  className="aspect-video w-full object-cover object-top transition duration-300 group-hover:scale-105"
                />
              </div>
              <figcaption className="p-3 text-center text-sm font-medium">
                {foto.judul}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Gallery
