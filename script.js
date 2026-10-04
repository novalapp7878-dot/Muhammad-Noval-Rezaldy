function bukaMenu() {
    const menu = document.getElementById("menu");

    if (menu) {
        menu.classList.toggle("aktif");
    }
}

const dataProduk = {
    Indigo: {
        nama: "Motif Sasirangan Indigo",
        harga: 150000,
        gambar: "Motif Indigo.jpeg"
    },

    Bata: {
        nama: "Motif Sasirangan Bata",
        harga: 160000,
        gambar: "Motif Bata.jpeg"
    },

    Emas: {
        nama: "Motif Sasirangan Emas",
        harga: 140000,
        gambar: "Motif Emas.jpeg"
    },

    Coklat: {
        nama: "Motif Sasirangan Coklat",
        harga: 180000,
        gambar: "Motif Coklat.jpeg"
    }
};

let jumlahProduk = 1;
let produkYangDipilih = "";

function formatRupiah(angka) {
    return "Rp." + angka.toLocaleString("id-ID");
}

function produkBerubah() {
    const pilihan = document.getElementById("produkPilihan");
    const gambar = document.getElementById("gambarProduk");
    const harga = document.getElementById("hargaProdukRingkasan");

    if (!pilihan || !gambar || !harga) {
        return;
    }

    const produk = dataProduk[pilihan.value];

    if (!produk) {
        return;
    }

    gambar.src = produk.gambar;
    gambar.alt = produk.nama;
    harga.textContent = formatRupiah(produk.harga);

    hitungSubtotal();
}

function ubahJumlah(perubahan) {
    jumlahProduk += perubahan;

    if (jumlahProduk < 1) {
        jumlahProduk = 1;
    }

    if (jumlahProduk > 99) {
        jumlahProduk = 99;
    }

    const jumlah = document.getElementById("jumlahRingkasan");
    const jumlahDesktop = document.getElementById("jumlahRingkasanDesktop");

    if (jumlah) {
        jumlah.textContent = jumlahProduk;
    }

    if (jumlahDesktop) {
        jumlahDesktop.textContent = jumlahProduk;
    }

    hitungSubtotal();
}

function hitungSubtotal() {
    const pilihan = document.getElementById("produkPilihan");
    const subtotal = document.getElementById("subtotalHarga");

    if (!pilihan || !subtotal) {
        return;
    }

    const produk = dataProduk[pilihan.value];

    if (!produk) {
        return;
    }

    const total = produk.harga * jumlahProduk;

    subtotal.textContent = formatRupiah(total);
}

function pesanProduk(namaProduk) {
    produkYangDipilih = namaProduk;

    const popup = document.getElementById("popupPesan");
    const namaPopup = document.getElementById("namaProdukPopup");

    if (namaPopup) {
        namaPopup.textContent = "Motif Sasirangan " + namaProduk;
    }

    if (popup) {
        popup.classList.add("aktif");
    }
}

function tutupPopup() {
    const popup = document.getElementById("popupPesan");

    if (popup) {
        popup.classList.remove("aktif");
    }
}

function lanjutPesan() {
    if (!produkYangDipilih) {
        return;
    }

    window.location.href =
        "kontak.html?produk=" +
        encodeURIComponent(produkYangDipilih);
}

function cekProdukURL() {
    const parameter = new URLSearchParams(
        window.location.search
    );

    const produkURL = parameter.get("produk");
    const pilihan = document.getElementById("produkPilihan");

    if (!produkURL || !pilihan) {
        return;
    }

    if (dataProduk[produkURL]) {
        pilihan.value = produkURL;
        produkBerubah();
    }
}

function tampilkanSemua() {
    const produk = document.querySelectorAll(".produk");

    produk.forEach(function(item) {
        item.style.display = "block";
    });
}

function tampilkanIndigo() {
    filterProduk("indigo");
}

function tampilkanBata() {
    filterProduk("bata");
}

function tampilkanEmas() {
    filterProduk("emas");
}

function tampilkanCoklat() {
    filterProduk("coklat");
}

function filterProduk(kategori) {
    const produk = document.querySelectorAll(".produk");

    produk.forEach(function(item) {
        if (item.classList.contains(kategori)) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}

function kirimPemesanan(event) {
    event.preventDefault();

    const nama = document.getElementById("nama")?.value.trim();
    const telepon = document.getElementById("telepon")?.value.trim();
    const alamat = document.getElementById("alamat")?.value.trim();
    const catatan = document.getElementById("catatan")?.value.trim();

    const pilihan = document.getElementById("produkPilihan");

    if (!nama) {
        alert("Silakan masukkan nama lengkap.");
        return;
    }

    if (!telepon) {
        alert("Silakan masukkan nomor HP.");
        return;
    }

    if (!alamat) {
        alert("Silakan masukkan alamat.");
        return;
    }

    if (!pilihan) {
        return;
    }

    const produk = dataProduk[pilihan.value];

    if (!produk) {
        return;
    }

    const pembayaran = document.querySelector(
        'input[name="pembayaran"]:checked'
    );

    const metodePembayaran = pembayaran
        ? pembayaran.value
        : "Transfer";

    const total = produk.harga * jumlahProduk;

    const tombol = document.querySelector(
        ".btn-pesan-sekarang"
    );

    if (tombol) {
        tombol.disabled = true;
        tombol.textContent = "⏳ Memproses Pesanan...";
    }

    setTimeout(function() {
        tampilkanPesananBerhasil({
            nama: nama,
            telepon: telepon,
            alamat: alamat,
            catatan: catatan,
            produk: produk.nama,
            jumlah: jumlahProduk,
            pembayaran: metodePembayaran,
            total: total
        });

        if (tombol) {
            tombol.disabled = false;
            tombol.textContent = "Pesan Sekarang";
        }
    }, 1200);
}

function tampilkanPesananBerhasil(data) {
    const popupLama = document.getElementById(
        "popupSuksesPesanan"
    );

    if (popupLama) {
        popupLama.remove();
    }

    const popup = document.createElement("div");

    popup.id = "popupSuksesPesanan";
    popup.className = "popup aktif";

    popup.innerHTML = `
        <div class="popup-box">

            <div class="wajah">
                😊
            </div>

            <h2>
                Pesanan Berhasil! 🎉
            </h2>

            <p>
                Terima kasih, ${data.nama}
            </p>

            <div class="hasil">
                <strong>Detail Pesanan</strong>
                <br>
                Produk: ${data.produk}
                <br>
                Jumlah: ${data.jumlah}
                <br>
                Pembayaran: ${data.pembayaran}
                <br>
                No. HP: ${data.telepon}
                <br>
                Alamat: ${data.alamat}

                ${
                    data.catatan
                        ? `<br>Catatan: ${data.catatan}`
                        : ""
                }

                <br>

                <strong>
                    Total: ${formatRupiah(data.total)}
                </strong>
            </div>

            <p>
                Pesanan sedang diproses.
            </p>

            <button
                class="btn-ya"
                onclick="tutupPesananBerhasil()"
                style="width:100%;padding:10px;border:none;border-radius:6px;cursor:pointer;"
            >
                Selesai
            </button>

        </div>
    `;

    document.body.appendChild(popup);
}

function tutupPesananBerhasil() {
    const popup = document.getElementById(
        "popupSuksesPesanan"
    );

    if (popup) {
        popup.classList.remove("aktif");

        setTimeout(function() {
            popup.remove();
        }, 300);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const pilihan = document.getElementById(
        "produkPilihan"
    );

    const form = document.getElementById(
        "formPemesanan"
    );

    if (pilihan) {
        pilihan.addEventListener(
            "change",
            produkBerubah
        );

        cekProdukURL();
        hitungSubtotal();
    }

    if (form) {
        form.addEventListener(
            "submit",
            kirimPemesanan
        );
    }
});