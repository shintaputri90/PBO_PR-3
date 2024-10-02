class Kapal {
    constructor(nama, jenis, panjang, lebar) {
        this.nama = nama;
        this.jenis = jenis;
        this.panjang = panjang;
        this.lebar = lebar; 
    }

    infokapal() {
        return `Kapal ${this.nama} merupakan jenis ${this.jenis} yang berukuran ${this.panjang}m x ${this.lebar}m.`;
    }
}

class KapalPenumpang extends Kapal {
    constructor(nama, jenis, panjang, lebar, kapasitaspenumpang) {
        super(nama, jenis, panjang, lebar); 
        this.kapasitaspenumpang = kapasitaspenumpang; 
    }

    infokapal() {
        return `${super.infokapal()} Kapal ini memiliki kapasitas ${this.kapasitaspenumpang} orang.`;
    }
}

// Subclass untuk mengelola tiket kapal
class TiketKapal extends KapalPenumpang {
    constructor(nama, jenis, panjang, lebar, kapasitaspenumpang, jumlahTiket) {
        super(nama, jenis, panjang, lebar, kapasitaspenumpang);
        this.jumlahTiket = jumlahTiket;
    }

    infoTiket() {
        return `Jumlah tiket yang tersedia pada kapal ${this.nama} adalah ${this.jumlahTiket}.`;
    }

    kurangiTiket(jumlah) {
        if (jumlah > this.jumlahTiket) {
            return `Tiket tidak cukup. Hanya tersedia ${this.jumlahTiket} tiket.`;
        } else {
            this.jumlahTiket -= jumlah;
            return `${jumlah} tiket berhasil dibeli. Sisa tiket: ${this.jumlahTiket}.`;
        }
    }
}

// Subclass untuk melakukan pembelian tiket dan memilih tujuan, hari, dan jam keberangkatan
class PembelianTiketKapal extends TiketKapal {
    constructor(nama, jenis, panjang, lebar, kapasitaspenumpang, jumlahTiket, hargaTiket) {
        super(nama, jenis, panjang, lebar, kapasitaspenumpang, jumlahTiket);
        this.hargaTiket = hargaTiket;
        this.tujuan = null; 
        this.hariKeberangkatan = null; 
        this.jamKeberangkatan = null; 
    }

    pilihTujuan(tujuan) {
        const tujuanTersedia = ["Paris", "Italia"];
        if (tujuanTersedia.includes(tujuan)) {
            this.tujuan = tujuan;
            return `Anda telah memilih tujuan ke ${tujuan}.`;
        } else {
            return `Pilih tujuan keberangkatan.`;
        }
    }

    aturHariKeberangkatan(hari) {
        const hariTersedia = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
        if (hariTersedia.includes(hari)) {
            this.hariKeberangkatan = hari;
            return `Keberangkatan dijadwalkan pada hari ${hari}.`;
        } else {
            return `Hari tidak valid. Pilih hari antara Senin hingga Minggu.`;
        }
    }

    aturJamKeberangkatan(jam) {
        const regexJam = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if (regexJam.test(jam)) {
            this.jamKeberangkatan = jam;
            return `Keberangkatan dijadwalkan pada jam ${jam}.`;
        } else {
            return `Format jam tidak valid. Gunakan format 24-jam (contoh: 14:30).`;
        }
    }

    pembelianTiket(jumlahBeli) {
        if (!this.tujuan || !this.hariKeberangkatan || !this.jamKeberangkatan) {
            return `Anda belum melengkapi tujuan, hari, atau jam keberangkatan. Silakan pilih tujuan, hari, dan jam terlebih dahulu.`;
        }

        let totalHarga = jumlahBeli * this.hargaTiket;
        let hasilPembelian = this.kurangiTiket(jumlahBeli);
        return `${hasilPembelian} Tujuan: ${this.tujuan}. Keberangkatan pada hari ${this.hariKeberangkatan}, jam ${this.jamKeberangkatan}. Total harga: Rp${totalHarga}.`;
    }
}


const kapalFerry = new PembelianTiketKapal("Budi Siregar", "ferry", 200, 150, 1000, 950, 250,000);

console.log(kapalFerry.infokapal());
console.log(kapalFerry.infoTiket());
console.log(kapalFerry.pilihTujuan("Paris")); 
console.log(kapalFerry.aturHariKeberangkatan("Senin")); 
console.log(kapalFerry.aturJamKeberangkatan("14:30")); 
console.log(kapalFerry.pembelianTiket(7)); 
console.log(kapalFerry.aturHariKeberangkatan("Jumat")); 
console.log(kapalFerry.aturJamKeberangkatan("11:20")); 
console.log(kapalFerry.pembelianTiket(1)); 
