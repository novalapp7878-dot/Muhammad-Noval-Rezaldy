function bukaMenu() {
    var menu =
        document.getElementById("menu");
    menu.classList.toggle("aktif");
}

var produkYangDipilih = "";
function pesanProduk(namaProduk) {
    produkYangDipilih = namaProduk;
    var popup =
        document.getElementById("popupPesan");
    var nama =
        document.getElementById("namaProdukPopup");
    if (popup != null && nama != null) {
        nama.innerHTML =
            "Sasirangan " + namaProduk;
        popup.classList.add("aktif");
    }
}

function tutupPopup() {
    var popup =
        document.getElementById("popupPesan");
    if (popup != null) {
        popup.classList.remove("aktif");
    }
}

function lanjutPesan() {
    window.location.href =
        "kontak.html?produk=" +
        produkYangDipilih;
}
function tampilkanSemua() {
    var produk =
        document.querySelectorAll(".produk");
    for (
        var i = 0;
        i < produk.length;
        i++
    ) {
        produk[i].style.display =
            "block";
    }
}
function tampilkanIndigo() {
    sembunyikanProduk();
    var produk =
        document.querySelector(".indigo");
    if (produk != null) {
        produk.style.display =
            "block";
    }
}

function tampilkanBata() {
    sembunyikanProduk();
    var produk =
        document.querySelector(".bata");
    if (produk != null) {
        produk.style.display =
            "block";
    }
}
function tampilkanEmas() {
    sembunyikanProduk();
    var produk =
        document.querySelector(".emas");
    if (produk != null) {
        produk.style.display =
            "block";
    }
}
function tampilkanCoklat() {
    sembunyikanProduk();
    var produk =
        document.querySelector(".coklat");
    if (produk != null) {
        produk.style.display =
            "block";
    }
}
function sembunyikanProduk() {
    var produk =
        document.querySelectorAll(".produk");
    for (
        var i = 0;
        i < produk.length;
        i++
    ) {
        produk[i].style.display =
            "none";
    }
}
var alamat =
    window.location.search;
var data =
    new URLSearchParams(alamat);
var produk =
    data.get("produk");
if (produk != null) {
    var pilihan =
        document.getElementById(
            "produkPilihan"
        );
    if (pilihan != null) {
        if (produk == "Indigo") {
            pilihan.value =
                "Sasirangan Indigo";
        }

        if (produk == "Bata") {
            pilihan.value =
                "Sasirangan Bata";
        }
        if (produk == "Emas") {
            pilihan.value =
                "Sasirangan Emas";
        }
        if (produk == "Coklat") {
            pilihan.value =
                "Sasirangan Coklat";
        }
    }
}

function kirimPesanan(event) {

    event.preventDefault();
    var nama =
        document.getElementById(
            "nama"
        ).value;
    var telepon =
        document.getElementById(
            "telepon"
        ).value;
    var produk =
        document.getElementById(
            "produkPilihan"
        ).value;
    var jumlah =
        document.getElementById(
            "jumlah"
        ).value;
    var alamat =
        document.getElementById(
            "alamat"
        ).value;
    var hasil =
        document.getElementById(
            "hasilPesanan"
        );
    hasil.innerHTML =
        "<h3>😊 Pesanan Berhasil Dicatat!</h3>" +
        "<p><b>Nama:</b> " +
        nama +
        "</p>" +
        "<p><b>No. WhatsApp:</b> " +
        telepon +
        "</p>" +
        "<p><b>Produk:</b> " +
        produk +
        "</p>" +
        "<p><b>Jumlah:</b> " +
        jumlah +
        "</p>" +
        "<p><b>Alamat:</b> " +
        alamat +
        "</p>" +
        "<p>Terima kasih sudah memilih NusaBanjar.</p>";
}