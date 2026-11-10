
// ======================================
// LAVENDER POS - APLIKASI KASIR DIGITAL
// ======================================


// 1. DATA PRODUK AWAL

const produkAwal = [
    {
        id: 1,
        nama: "Nasi Goreng",
        kategori: "Makanan",
        harga: 15000,
        stok: 20,
        gambar: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500"
    },
    {
        id: 2,
        nama: "Mie Goreng",
        kategori: "Makanan",
        harga: 12000,
        stok: 15,
        gambar: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500"
    },
    {
        id: 3,
        nama: "Ayam Geprek",
        kategori: "Makanan",
        harga: 18000,
        stok: 12,
        gambar: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500"
    },
    {
        id: 4,
        nama: "Burger",
        kategori: "Makanan",
        harga: 20000,
        stok: 10,
        gambar: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500"
    },
    {
        id: 5,
        nama: "Pizza",
        kategori: "Makanan",
        harga: 25000,
        stok: 8,
        gambar: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500"
    },
    {
        id: 6,
        nama: "Kentang Goreng",
        kategori: "Makanan",
        harga: 10000,
        stok: 20,
        gambar: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500"
    },
    {
        id: 7,
        nama: "Sate Ayam",
        kategori: "Makanan",
        harga: 18000,
        stok: 14,
        gambar: "https://images.unsplash.com/photo-1529563021893-cc83c992d75d?w=500"
    },
    {
        id: 8,
        nama: "Roti Bakar",
        kategori: "Makanan",
        harga: 12000,
        stok: 16,
        gambar: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500"
    },
    {
        id: 9,
        nama: "Es Teh",
        kategori: "Minuman",
        harga: 5000,
        stok: 30,
        gambar: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500"
    },
    {
        id: 10,
        nama: "Jus Jeruk",
        kategori: "Minuman",
        harga: 8000,
        stok: 18,
        gambar: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500"
    },
    {
        id: 11,
        nama: "Kopi Susu",
        kategori: "Minuman",
        harga: 12000,
        stok: 15,
        gambar: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500"
    },
    {
        id: 12,
        nama: "Air Mineral",
        kategori: "Minuman",
        harga: 4000,
        stok: 40,
        gambar: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500"
    }
];


// 2. PENYIMPANAN DATA

let produk = JSON.parse(localStorage.getItem("produkPOS")) || produkAwal;

let riwayat = JSON.parse(localStorage.getItem("riwayatPOS")) || [];

let keranjang = [];


// 3. FUNGSI PENYIMPANAN

function simpanData() {
    localStorage.setItem("produkPOS", JSON.stringify(produk));
    localStorage.setItem("riwayatPOS", JSON.stringify(riwayat));
}


// 4. FORMAT RUPIAH

function rupiah(angka) {
    return "Rp" + Number(angka).toLocaleString("id-ID");
}


// 5. MENGAMANKAN TEKS

function aman(teks) {
    return String(teks).replace(/[&<>"']/g, karakter => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[karakter]);
}


// 6. TANGGAL

function tanggalSekarang() {
    return new Date().toLocaleDateString("id-ID");
}

function tanggalWaktu() {
    return new Date().toLocaleString("id-ID");
}


// 7. DASHBOARD

function perbaruiTampilan() {

    document.getElementById("tanggal").textContent =
        tanggalSekarang();

    let transaksiHariIni = riwayat.filter(item =>
        new Date(item.waktu).toDateString() ===
        new Date().toDateString()
    );

    let omzet = transaksiHariIni.reduce(
        (total, item) => total + item.total, 0
    );

    let stok = produk.reduce(
        (total, item) => total + Number(item.stok), 0
    );

    document.getElementById("omzet").textContent =
        rupiah(omzet);

    document.getElementById("totalStok").textContent =
        stok;

    document.getElementById("jumlahTransaksi").textContent =
        transaksiHariIni.length;

    tampilkanProduk();
    tampilkanKeranjang();
    tampilkanRiwayat();
}


// 8. MENAMPILKAN PRODUK

function tampilkanProduk() {

    const tempat = document.getElementById("daftarProduk");

    const cari = document.getElementById("searchProduk")
        .value.toLowerCase();

    const kategori = document.getElementById("filterKategori")
        .value;

    const hasil = produk.filter(item =>
        item.nama.toLowerCase().includes(cari) &&
        (kategori === "Semua" || item.kategori === kategori)
    );

    tempat.innerHTML = "";

    if (hasil.length === 0) {
        tempat.innerHTML = `
            <div class="col-12 text-center text-secondary py-4">
                Produk tidak ditemukan.
            </div>
        `;
        return;
    }

    hasil.forEach(item => {

        let badge = "";

        if (item.stok === 0) {
            badge = `<span class="badge badge-habis">Stok Habis</span>`;
        } else if (item.stok < 5) {
            badge = `<span class="badge badge-menipis">Stok Menipis</span>`;
        } else {
            badge = `<span class="badge badge-aman">Stok Aman</span>`;
        }

        tempat.innerHTML += `
            <div class="col-md-6 col-xl-4">

                <div class="card produk-card">

                    <img
                        src="${aman(item.gambar)}"
                        alt="${aman(item.nama)}"
                        onerror="this.src='https://placehold.co/500x300?text=Produk'"
                    >

                    <div class="p-3">

                        <h6 class="fw-bold">
                            ${aman(item.nama)}
                        </h6>

                        <small class="text-secondary">
                            ${aman(item.kategori)}
                        </small>

                        <h6 class="mt-2" style="color:#8060c1">
                            ${rupiah(item.harga)}
                        </h6>

                        <div class="mb-2">
                            ${badge}
                            <small class="ms-1">
                                Stok: ${item.stok}
                            </small>
                        </div>

                        <button
                            class="btn btn-ungu btn-sm w-100 mb-2"
                            onclick="tambahKeranjang(${item.id})"
                            ${item.stok === 0 ? "disabled" : ""}
                        >
                            <i class="bi bi-cart-plus"></i>
                            Beli
                        </button>

                        <div class="d-flex gap-2">

                            <button
                                class="btn btn-outline-secondary btn-sm w-50"
                                onclick="editProduk(${item.id})"
                            >
                                Edit
                            </button>

                            <button
                                class="btn btn-outline-danger btn-sm w-50"
                                onclick="hapusProduk(${item.id})"
                            >
                                Hapus
                            </button>

                        </div>

                    </div>
                </div>
            </div>
        `;
    });
}


// 9. TAMBAH PRODUK

function tambahProduk() {

    let nama = prompt("Masukkan nama produk:");

    if (!nama || !nama.trim()) return;

    let kategori = prompt(
        "Kategori produk (Makanan/Minuman):",
        "Makanan"
    );

    if (!kategori) return;

    kategori = kategori.trim().toLowerCase();

    if (kategori === "makanan") {
        kategori = "Makanan";
    } else if (kategori === "minuman") {
        kategori = "Minuman";
    } else {
        alert("Kategori harus Makanan atau Minuman.");
        return;
    }

    let harga = Number(prompt("Masukkan harga produk:"));

    if (!Number.isFinite(harga) || harga <= 0) {
        alert("Harga tidak valid.");
        return;
    }

    let stok = Number(prompt("Masukkan jumlah stok:"));

    if (!Number.isInteger(stok) || stok < 0) {
        alert("Jumlah stok tidak valid.");
        return;
    }

    let gambar = prompt("Masukkan link gambar produk:");

    if (!gambar || !gambar.trim()) {
        gambar = "https://placehold.co/500x300?text=Produk";
    }

    produk.push({
        id: Date.now(),
        nama: nama.trim(),
        kategori,
        harga,
        stok,
        gambar: gambar.trim()
    });

    simpanData();
    perbaruiTampilan();

    alert("Produk berhasil ditambahkan!");
}


// 10. EDIT PRODUK

function editProduk(id) {

    let item = produk.find(p => p.id === id);

    if (!item) return;

    let nama = prompt("Nama produk:", item.nama);

    if (!nama || !nama.trim()) return;

    let harga = Number(prompt("Harga produk:", item.harga));

    if (!Number.isFinite(harga) || harga <= 0) {
        alert("Harga tidak valid.");
        return;
    }

    let stok = Number(prompt("Jumlah stok:", item.stok));

    if (!Number.isInteger(stok) || stok < 0) {
        alert("Stok tidak valid.");
        return;
    }

    let gambar = prompt("Link gambar:", item.gambar);

    if (gambar === null) return;

    item.nama = nama.trim();
    item.harga = harga;
    item.stok = stok;
    item.gambar = gambar.trim();

    simpanData();
    perbaruiTampilan();

    alert("Produk berhasil diperbarui!");
}


// 11. HAPUS PRODUK

function hapusProduk(id) {

    let yakin = confirm("Apakah kamu yakin ingin menghapus produk?");

    if (!yakin) return;

    produk = produk.filter(item => item.id !== id);

    keranjang = keranjang.filter(item => item.id !== id);

    simpanData();
    perbaruiTampilan();

    alert("Produk berhasil dihapus!");
}


// 12. TAMBAH KE KERANJANG

function tambahKeranjang(id) {

    let item = produk.find(p => p.id === id);

    if (!item || item.stok <= 0) return;

    let ada = keranjang.find(p => p.id === id);

    if (ada) {

        if (ada.jumlah >= item.stok) {
            alert("Jumlah melebihi stok tersedia.");
            return;
        }

        ada.jumlah++;

    } else {

        keranjang.push({
            ...item,
            jumlah: 1
        });

    }

    tampilkanKeranjang();
}


// 13. UBAH JUMLAH PRODUK

function ubahJumlah(id, perubahan) {

    let item = keranjang.find(p => p.id === id);

    let dataProduk = produk.find(p => p.id === id);

    if (!item || !dataProduk) return;

    let jumlahBaru = item.jumlah + perubahan;

    if (jumlahBaru <= 0) {

        keranjang = keranjang.filter(p => p.id !== id);

    } else if (jumlahBaru > dataProduk.stok) {

        alert("Jumlah melebihi stok tersedia.");

    } else {

        item.jumlah = jumlahBaru;

    }

    tampilkanKeranjang();
}


// 14. MENGHITUNG TOTAL BELANJA

function totalKeranjang() {

    return keranjang.reduce(
        (total, item) => total + item.harga * item.jumlah,
        0
    );

}


// 15. MENAMPILKAN KERANJANG

function tampilkanKeranjang() {

    const tempat = document.getElementById("keranjang");

    tempat.innerHTML = "";

    if (keranjang.length === 0) {

        tempat.innerHTML = `
            <p class="text-secondary text-center">
                Belum ada produk dipilih.
            </p>
        `;

    }

    keranjang.forEach(item => {

        tempat.innerHTML += `
            <div class="keranjang-item">

                <div class="d-flex justify-content-between">
                    <strong>${aman(item.nama)}</strong>
                    <span>${rupiah(item.harga * item.jumlah)}</span>
                </div>

                <div class="d-flex justify-content-between align-items-center mt-2">

                    <small>${rupiah(item.harga)} / item</small>

                    <div>

                        <button
                            class="btn btn-sm btn-light"
                            onclick="ubahJumlah(${item.id}, -1)"
                        >
                            −
                        </button>

                        <span class="mx-2">${item.jumlah}</span>

                        <button
                            class="btn btn-sm btn-light"
                            onclick="ubahJumlah(${item.id}, 1)"
                        >
                            +
                        </button>

                    </div>

                </div>

            </div>
        `;

    });

    document.getElementById("totalBelanja").textContent =
        rupiah(totalKeranjang());

    hitungKembalian();
}


// 16. METODE PEMBAYARAN

function ubahMetode() {

    let metode = document.getElementById("metode").value;

    document.getElementById("bagianTunai").style.display =
        metode === "Tunai" ? "block" : "none";

}


// 17. HITUNG KEMBALIAN

function hitungKembalian() {

    let total = totalKeranjang();

    let uang = Number(
        document.getElementById("uangBayar").value
    ) || 0;

    let kembalian = Math.max(0, uang - total);

    document.getElementById("kembalian").textContent =
        rupiah(kembalian);

}


// 18. PROSES PEMBAYARAN

function prosesPembayaran() {

    if (keranjang.length === 0) {
        alert("Keranjang masih kosong.");
        return;
    }

    // Periksa stok sebelum transaksi
    for (let item of keranjang) {

        let data = produk.find(p => p.id === item.id);

        if (!data || item.jumlah > data.stok) {
            alert("Stok " + item.nama + " tidak mencukupi.");
            return;
        }

    }

    let total = totalKeranjang();

    let metode = document.getElementById("metode").value;

    let uang = metode === "Tunai"
        ? Number(document.getElementById("uangBayar").value) || 0
        : total;

    if (uang < total) {
        alert("Uang pembayaran masih kurang.");
        return;
    }

    if (
        metode !== "Tunai" &&
        !confirm("Apakah pembayaran melalui " + metode + " sudah diterima?")
    ) {
        return;
    }

    // Kurangi stok produk
    keranjang.forEach(item => {

        let data = produk.find(p => p.id === item.id);

        data.stok -= item.jumlah;

    });

    // Simpan transaksi
    let transaksi = {

        nomor: "TRX-" + Date.now(),

        waktu: new Date().toISOString(),

        total: total,

        metode: metode,

        uang: uang,

        kembalian: uang - total,

        barang: keranjang.map(item => ({...item}))

    };

    riwayat.unshift(transaksi);

    // Buat struk
    buatStruk(transaksi);

    // Kosongkan keranjang
    keranjang = [];

    document.getElementById("uangBayar").value = "";

    // Simpan dan perbarui halaman
    simpanData();

    perbaruiTampilan();

    // Tampilkan struk langsung
    document.getElementById("receipt").style.display = "block";

    document.getElementById("receipt").scrollIntoView({
        behavior: "smooth"
    });

    alert("Pembayaran berhasil! Struk sudah ditampilkan.");

}


// 19. MEMBUAT STRUK

function buatStruk(data) {

    let isiBarang = data.barang.map(item => `

        <tr>
            <td colspan="2">${aman(item.nama)}</td>
        </tr>

        <tr>
            <td>${item.jumlah} x ${rupiah(item.harga)}</td>

            <td class="text-end">
                ${rupiah(item.jumlah * item.harga)}
            </td>
        </tr>

    `).join("");

    document.getElementById("receipt").innerHTML = `

        <div class="text-center">

            <div class="receipt-logo">
                <i class="bi bi-bag-heart"></i>
            </div>

            <h4 class="receipt-title mt-2">
                LAVENDER STORE
            </h4>

            <p class="receipt-subtitle mb-1">
                Kasir Digital
            </p>

            <small>Terima kasih sudah berbelanja!</small>

        </div>


        <div class="receipt-line"></div>


        <div class="d-flex justify-content-between small">

            <span>No. Transaksi</span>

            <span>${aman(data.nomor)}</span>

        </div>


        <div class="d-flex justify-content-between small mt-1">

            <span>Tanggal</span>

            <span>${new Date(data.waktu).toLocaleString("id-ID")}</span>

        </div>


        <div class="receipt-line"></div>


        <table class="receipt-table">

            ${isiBarang}

        </table>


        <div class="receipt-line"></div>


        <div class="receipt-total">

            <div class="d-flex justify-content-between">

                <strong>Total Belanja</strong>

                <strong>${rupiah(data.total)}</strong>

            </div>


            <div class="d-flex justify-content-between mt-2 small">

                <span>Metode Pembayaran</span>

                <span>${aman(data.metode)}</span>

            </div>


            <div class="d-flex justify-content-between mt-1 small">

                <span>Uang Diterima</span>

                <span>${rupiah(data.uang)}</span>

            </div>


            <div class="d-flex justify-content-between mt-1 small">

                <span>Kembalian</span>

                <span>${rupiah(data.kembalian)}</span>

            </div>

        </div>


        <div class="text-center receipt-footer mt-4">

            <strong>Terima Kasih!</strong>

            <p class="mb-0">
                Semoga hari Anda menyenangkan.
            </p>

            <small>
                Lavender Store - Belanja jadi lebih mudah
            </small>

        </div>

    `;

}


// 20. RIWAYAT TRANSAKSI

function tampilkanRiwayat() {

    const tempat = document.getElementById("daftarRiwayat");

    tempat.innerHTML = "";

    if (riwayat.length === 0) {

        tempat.innerHTML = `

            <tr>
                <td colspan="4" class="text-center text-secondary">
                    Belum ada transaksi.
                </td>
            </tr>

        `;

        return;

    }

    riwayat.forEach((item, index) => {

        tempat.innerHTML += `

            <tr>

                <td>${index + 1}</td>

                <td>
                    ${new Date(item.waktu).toLocaleString("id-ID")}
                </td>

                <td>${rupiah(item.total)}</td>

                <td>${aman(item.metode)}</td>

            </tr>

        `;

    });

}


// 21. TAMPILKAN STRUK DARI RIWAYAT

function lihatStrukTerakhir() {

    if (riwayat.length === 0) {
        alert("Belum ada transaksi.");
        return;
    }

    buatStruk(riwayat[0]);

    document.getElementById("receipt").style.display = "block";

    document.getElementById("receipt").scrollIntoView({
        behavior: "smooth"
    });

}


// 22. JALANKAN APLIKASI

perbaruiTampilan();

ubahMetode();
