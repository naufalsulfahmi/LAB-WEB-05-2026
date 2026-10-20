let BASE_URL = "https://jsonplaceholder.typicode.com";

let daftarAnggota = document.getElementById("daftar-anggota");
let statusAnggota = document.getElementById("status-anggota");
let judulTugas = document.getElementById("judul-tugas");
let ringkasan = document.getElementById("ringkasan");
let barProgres = document.getElementById("bar-progres");
let inputCari = document.getElementById("cari");
let formTambah = document.getElementById("form-tambah");
let inputJudul = document.getElementById("judul-baru");
let btnSimpan = document.getElementById("btn-simpan");
let errorForm = document.getElementById("error-form");
let statusTugas = document.getElementById("status-tugas");
let kosong = document.getElementById("kosong");
let daftarTugas = document.getElementById("daftar-tugas");
let notifikasi = document.getElementById("notifikasi");

let KELAS_ANGGOTA = "rounded p-2 text-left hover:bg-gray-100";
let KELAS_BARIS = "flex items-center gap-2 border-b border-gray-200 py-2";
let KELAS_TOMBOL = "rounded border border-gray-300 px-2 py-1 text-sm hover:bg-gray-100";

let anggotaTerpilih = null; 
let nomorPermintaan = 0;    
let nomorNotif = 0;         

function tampilkanError(wadah, pesan, fungsiUlang) {
  wadah.textContent = pesan + " ";
  wadah.classList.add("text-red-500");

  let tombol = document.createElement("button");
  tombol.textContent = "Coba lagi";
  tombol.setAttribute("class", KELAS_TOMBOL);
  tombol.addEventListener("click", fungsiUlang);
  wadah.appendChild(tombol);
}

async function muatAnggota() {
  statusAnggota.classList.remove("text-red-500");
  statusAnggota.textContent = "Memuat anggota...";

  try {
    let respons = await fetch(BASE_URL + "/users");
    if (!respons.ok) {
      throw new Error("Status " + respons.status);
    }
    let users = await respons.json();
    statusAnggota.textContent = ""; 

    users.forEach((user) => {
      let tombol = document.createElement("button");
      tombol.textContent = user.name;
      tombol.setAttribute("class", KELAS_ANGGOTA);
      tombol.addEventListener("click", () => {
        pilihAnggota(user, tombol);
      });
      daftarAnggota.appendChild(tombol);
    });
  } catch (error) {
    tampilkanError(statusAnggota, "Gagal memuat anggota: " + error.message, muatAnggota);
  }
}

function pilihAnggota(user, tombolDiklik) {
  let semuaTombol = daftarAnggota.querySelectorAll("button");
  semuaTombol.forEach((tombol) => {
    tombol.classList.remove("bg-blue-100");
    tombol.classList.remove("font-bold");
  });

  tombolDiklik.classList.add("bg-blue-100");
  tombolDiklik.classList.add("font-bold");

  anggotaTerpilih = user;
  judulTugas.textContent = "Tugas " + user.name;
  muatTugas(user);
}

async function muatTugas(user) {
  nomorPermintaan++;
  let nomorIni = nomorPermintaan;

  daftarTugas.innerHTML = "";
  kosong.classList.add("hidden");
  inputCari.value = "";
  errorForm.textContent = "";
  statusTugas.classList.remove("text-red-500");
  statusTugas.textContent = "Memuat tugas " + user.name + "...";
  perbaruiRingkasan();

  try {
    let respons = await fetch(BASE_URL + "/todos?userId=" + user.id);
    if (!respons.ok) {
      throw new Error("Status " + respons.status);
    }
    let data = await respons.json();

    if (nomorIni !== nomorPermintaan) {
      return;
    }

    statusTugas.textContent = "";
    data.forEach((t) => {
      buatBarisTugas(t.title, t.completed);
    });
    perbaruiRingkasan();
  } catch (error) {
    if (nomorIni !== nomorPermintaan) {
      return;
    }
    tampilkanError(
      statusTugas,
      "Gagal memuat tugas " + user.name + ": " + error.message,
      () => {
        muatTugas(user);
      }
    );
  }
}

function buatBarisTugas(judul, selesai) {
  let baris = document.createElement("li");
  baris.setAttribute("class", KELAS_BARIS);

  let teks = document.createElement("span");
  teks.setAttribute("class", "flex-1");
  teks.textContent = judul;

  let tombolSelesai = document.createElement("button");
  tombolSelesai.textContent = "Tandai selesai";
  tombolSelesai.setAttribute("class", KELAS_TOMBOL);

  let tombolHapus = document.createElement("button");
  tombolHapus.textContent = "Hapus";
  tombolHapus.setAttribute("class", KELAS_TOMBOL);

  baris.appendChild(teks);
  baris.appendChild(tombolSelesai);
  baris.appendChild(tombolHapus);

  tombolSelesai.addEventListener("click", () => {
    tandaiSelesai(baris, teks, tombolSelesai);
    perbaruiRingkasan();
  });

  tombolHapus.addEventListener("click", () => {
    baris.remove();
    perbaruiRingkasan();
    cariTugas(); 
  });

  if (selesai) {
    tandaiSelesai(baris, teks, tombolSelesai);
  }

  daftarTugas.appendChild(baris);
}

function tandaiSelesai(baris, teks, tombolSelesai) {
  baris.classList.add("selesai");
  teks.classList.add("line-through");
  teks.classList.add("text-gray-400");
  tombolSelesai.remove(); 
}

function ambilJudul(baris) {
  return baris.querySelector("span").textContent;
}

function perbaruiRingkasan() {
  if (anggotaTerpilih === null) {
    return;
  }

  let total = daftarTugas.querySelectorAll("li").length;
  let selesai = daftarTugas.querySelectorAll("li.selesai").length;

  ringkasan.textContent = selesai + " dari " + total + " tugas selesai";

  let persen = 0;
  if (total > 0) {
    persen = (selesai / total) * 100;
  }
  barProgres.style.width = persen + "%"; 
}

function cariTugas() {
  let kataKunci = inputCari.value.trim().toLowerCase();
  let semuaBaris = daftarTugas.querySelectorAll("li");
  let jumlahCocok = 0;

  semuaBaris.forEach((baris) => {
    let judul = ambilJudul(baris).toLowerCase();
    if (judul.includes(kataKunci)) {
      baris.classList.remove("hidden"); 
      jumlahCocok++;
    } else {
      baris.classList.add("hidden"); 
    }
  });

  if (semuaBaris.length > 0 && jumlahCocok === 0) {
    kosong.classList.remove("hidden");
  } else {
    kosong.classList.add("hidden");
  }
}

inputCari.addEventListener("input", cariTugas);

function simpanTugas(judul) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let sudahAda = false;
      daftarTugas.querySelectorAll("li").forEach((baris) => {
        if (ambilJudul(baris).toLowerCase() === judul.toLowerCase()) {
          sudahAda = true;
        }
      });

      if (sudahAda) {
        reject(new Error('Tugas "' + judul + '" sudah ada di daftar.'));
      } else {
        resolve({ title: judul, completed: false });
      }
    }, 3000);
  });
}

formTambah.addEventListener("submit", async function (event) {
  event.preventDefault(); 
  errorForm.textContent = "";

  if (anggotaTerpilih === null) {
    errorForm.textContent = "Pilih anggota terlebih dahulu.";
    return;
  }

  let judul = inputJudul.value.trim();
  if (judul.length < 5) {
    errorForm.textContent = "Judul tugas minimal 5 karakter.";
    return;
  }

  let anggotaSaatKlik = anggotaTerpilih;
  btnSimpan.disabled = true;
  btnSimpan.textContent = "Menyimpan...";
  try {
    let tugasBaru = await simpanTugas(judul);

    
    if (anggotaSaatKlik !== anggotaTerpilih) {
      return;
    }

    buatBarisTugas(tugasBaru.title, tugasBaru.completed);
    perbaruiRingkasan();
    cariTugas();
    inputJudul.value = "";
    tampilkanNotifikasi("Tugas berhasil ditambahkan.");
  } catch (error) {
    errorForm.textContent = error.message;
  } finally {
    btnSimpan.disabled = false;
    btnSimpan.textContent = "Simpan";
  }
});

function tampilkanNotifikasi(pesan) {
  nomorNotif++;
  let nomorIni = nomorNotif;

  notifikasi.textContent = pesan;
  notifikasi.classList.remove("hidden");

  setTimeout(() => {
    if (nomorIni === nomorNotif) {
      notifikasi.classList.add("hidden");
    }
  }, 3000);
}

muatAnggota();