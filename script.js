const kategoriAlani = document.getElementById('kategori-alani');
const kelimeAlani = document.getElementById('kelime-alani');
const yanlisTahminlerAlani = document.getElementById('yanlis-tahminler');
const adamParcalari = [
    document.getElementById('bacak-sag'),
    document.getElementById('kafa'),
    document.getElementById('govde'),
    document.getElementById('kol-sag'),                             
    document.getElementById('kol-sol'),   
    document.getElementById('bacak-sol'), 
      
];
const mesajAlani = document.getElementById('mesaj');
const harfGirisi = document.getElementById('harf-girisi');
const tahminEtButonu = document.getElementById('tahmin-et');
const yeniKelimeButonu = document.getElementById('yeni-kelime');

const kelimeListesi = [
    { kelime: 'elma', kategori: 'Meyve' },
    { kelime: 'armut', kategori: 'Meyve' },
    { kelime: 'gömlek', kategori: 'Kıyafet' },
    { kelime: 'pantolon', kategori: 'Kıyafet' },
    { kelime: 'futbol', kategori: 'Spor' },
    { kelime: 'basketbol', kategori: 'Spor' },
    { kelime: 'domates', kategori: 'Sebze' },
    { kelime: 'salatalık', kategori: 'Sebze' }
];

let secilenKelimeObjesi;
let secilenKelime;
let secilenKategori;
let dogruTahminler;
let yanlisTahminSayisi;
const maxYanlisTahmin = adamParcalari.length;
let yanlisHarfler;

function oyunuBaslat() {
    secilenKelimeObjesi = kelimeListesi[Math.floor(Math.random() * kelimeListesi.length)];
    secilenKelime = secilenKelimeObjesi.kelime;
    secilenKategori = secilenKelimeObjesi.kategori;
    dogruTahminler = Array(secilenKelime.length).fill('_');
    yanlisTahminSayisi = 0;
    yanlisHarfler = [];

    kelimeyiGoster();
    yanlisTahminleriGoster();
    adamiParcalariniGizle();
    mesajAlani.textContent = '';
    harfGirisi.disabled = false;
    tahminEtButonu.disabled = false;
    yeniKelimeButonu.style.display = 'none';
}

function kelimeyiGoster() {
    kelimeAlani.textContent = dogruTahminler.join(' ');
    kategoriAlani.textContent = `Kategori: ${secilenKategori}`;
}

function yanlisTahminleriGoster() {
    yanlisTahminlerAlani.textContent = `Yanlış Tahminler: ${yanlisHarfler.join(', ')}`;
}

function adamiCiz() {
    if (yanlisTahminSayisi < maxYanlisTahmin) {
        adamParcalari[yanlisTahminSayisi].style.display = 'block';
    }
}

function adamiParcalariniGizle() {
    adamParcalari.forEach(parca => parca.style.display = 'none');
}

function oyunuKontrolEt() {
    if (dogruTahminler.join('') === secilenKelime) {
        mesajAlani.textContent = 'Tebrikler, kelimeyi doğru tahmin ettiniz!';
        tahminEtButonu.disabled = true;
        harfGirisi.disabled = true;
        yeniKelimeButonu.style.display = 'block';
    } else if (yanlisTahminSayisi >= maxYanlisTahmin) {
        mesajAlani.textContent = `Kaybettiniz! Doğru kelime: ${secilenKelime}`;
        tahminEtButonu.disabled = true;
        harfGirisi.disabled = true;
        adamParcalari.forEach(parca => parca.style.display = 'block'); // Tüm adamı göster
        yeniKelimeButonu.style.display = 'block';
    }
}

function tahminEt() {
    const tahminEdilenHarf = harfGirisi.value.toLowerCase();
    harfGirisi.value = ''; // Inputu temizle

    if (!/^[a-zçğışöüi̇]$/.test(tahminEdilenHarf)) {
        alert('Lütfen geçerli bir harf girin.');
        return;
    }

    if (yanlisHarfler.includes(tahminEdilenHarf) || dogruTahminler.includes(tahminEdilenHarf)) {
        alert('Bu harfi zaten tahmin ettiniz.');
        return;
    }

    let dogruMu = false;
    for (let i = 0; i < secilenKelime.length; i++) {
        if (secilenKelime[i] === tahminEdilenHarf) {
            dogruTahminler[i] = tahminEdilenHarf;
            dogruMu = true;
        }
    }

    if (dogruMu) {
        kelimeyiGoster();
    } else {
        yanlisTahminSayisi++;
        yanlisHarfler.push(tahminEdilenHarf);
        yanlisTahminleriGoster();
        adamiCiz();
    }

    oyunuKontrolEt();
}

// Oyunu başlat
oyunuBaslat();

// Olay dinleyicileri
tahminEtButonu.addEventListener('click', tahminEt);
harfGirisi.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        tahminEt();
    }
});
yeniKelimeButonu.addEventListener('click', oyunuBaslat);