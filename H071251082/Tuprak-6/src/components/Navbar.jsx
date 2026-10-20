function Navbar() {
  const menu = [
    { id: 1, nama: 'Home', target: '#home' },
    { id: 2, nama: 'About', target: '#about' },
    { id: 3, nama: 'Skills', target: '#skills' },
    { id: 4, nama: 'Gallery', target: '#gallery' },
  ]

  const handleClick = (nama) => {
    console.log(`Menu diklik: ${nama}`)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <a href="#home" className="text-xl font-extrabold text-slate-900">
          Naufal<span className="text-indigo-600">.</span>
        </a>
        <ul className="flex items-center gap-1 text-sm font-medium sm:gap-2">
          {menu.map((item) => (
            <li key={item.id}>
              <a
                href={item.target}
                onClick={() => handleClick(item.nama)}
                className="rounded-full px-2.5 py-2 text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-600 sm:px-4"
              >
                {item.nama}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
