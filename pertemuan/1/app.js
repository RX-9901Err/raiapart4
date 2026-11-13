// Data State Keranjang
let keranjang = [];
let totalHarga = 0;

// Fungsi Menambahkan Game ke Keranjang
function tambahKeKeranjang(namaGame, harga) {
  keranjang.push({ nama: namaGame, harga: harga });
  totalHarga += harga;
  updateTampilanKeranjang();
}

// Fungsi Mengubah Tampilan HTML Keranjang
function updateTampilanKeranjang() {
  const elemDaftar = document.getElementById('daftar-keranjang');
  const elemTotal = document.getElementById('total-harga');

  // Kosongkan list HTML terlebih dahulu
  elemDaftar.innerHTML = '';

  if (keranjang.length === 0) {
    elemDaftar.innerHTML = '<li class="empty-msg">Belum ada game di keranjang.</li>';
  } else {
    keranjang.forEach((item) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${item.nama}</span>
        <span>Rp ${item.harga.toLocaleString('id-ID')}</span>
      `;
      elemDaftar.appendChild(li);
    });
  }

  // Update Teks Total Harga
  elemTotal.textContent = 'Rp ' + totalHarga.toLocaleString('id-ID');
}

// Fungsi Kosongkan Keranjang
function kosongkanKeranjang() {
  keranjang = [];
  totalHarga = 0;
  updateTampilanKeranjang();
}

// Fungsi Checkout / Bayar
function checkout() {
  if (keranjang.length === 0) {
    alert('Keranjang kamu masih kosong!');
    return;
  }

  alert(`Pembayaran berhasil sebesar Rp ${totalHarga.toLocaleString('id-ID')}!\nGame telah ditambahkan ke Library kamu.`);
  kosongkanKeranjang();
}
