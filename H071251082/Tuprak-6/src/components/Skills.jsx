function Skills() {
  const keahlian = [
    'Branding',
    'Layout Menu',
    'UI Design',
    'HTML & CSS',
    'React',
  ]

  return (
    <section id="skills" className="scroll-mt-16 bg-white py-16">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-center text-3xl font-bold text-slate-900">Keahlian</h2>
        <div className="mx-auto mt-2 h-1 w-16 rounded bg-indigo-600" />
        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {keahlian.map((skill, index) => (
            <li
              key={index}
              className="rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-5 text-center font-semibold text-indigo-700 transition hover:-translate-y-1 hover:bg-indigo-600 hover:text-white"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Skills
