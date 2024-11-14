# DMG Cloud Project

Ini adalah proyek aplikasi Next.js yang pakai ShadCN UI buat komponen antarmuka dan Appwrite sebagai backend untuk ngurusin autentikasi, database, dan penyimpanan.

## Persiapan Sebelum Mulai

Sebelum menjalankan aplikasi ini, pastikan kamu sudah punya:

- **Node.js** (versi 16 ke atas)
- **npm** atau **yarn**
- **Server Appwrite** (kalau pakai Appwrite lokal, pastikan udah diatur dengan benar)

## Cara Mulai

Ikuti langkah-langkah ini untuk setup dan menjalankan aplikasinya.

### 1. Clone Repositori

```bash
git clone https://github.com/username-kamu/repositori-kamu.git
cd repositori-kamu
```

### 2. Install Dependencies

Install semua package yang diperlukan dengan menjalankan:

```bash
npm install
# atau
yarn install
```

### 3. Setting Environment Variables

Buat file `.env.local` di root proyek dan tambahkan konfigurasi Appwrite kamu di sana. Bisa lihat contoh di `.env.example` kalau ada.

Contoh `.env.local`:

```plaintext
NEXT_PUBLIC_APPWRITE_ENDPOINT=<APPWRITE_ENDPOINT_KAMU>
NEXT_PUBLIC_APPWRITE_PROJECT_ID=<APPWRITE_PROJECT_ID_KAMU>
NEXT_PUBLIC_APPWRITE_DATABASE_ID=<APPWRITE_DATABASE_ID_KAMU>
NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID=<APPWRITE_USER_COLLECTION_ID_KAMU>
NEXT_PUBLIC_APPWRITE_FILES_COLLECTION_ID=<APPWRITE_FILES_COLLECTION_ID_KAMU>
NEXT_PUBLIC_APPWRITE_BUCKET_ID=<APPWRITE_BUCKET_ID_KAMU>
NEXT_PUBLIC_APPWRITE_SECRET_KEY=<APPWRITE_SECRET_KEY_KAMU>
```

### 4. Jalankan Aplikasi

Jalankan aplikasi Next.js dalam mode development:

```bash
npm run dev
# atau
yarn dev
```

Aplikasinya bakal bisa diakses di `http://localhost:3000`.

## Cara Pakai

- **ShadCN UI**: Aplikasi ini pakai ShadCN buat bangun antarmuka yang keren dan mudah diakses.
- **Appwrite Integration**: Appwrite jadi backend untuk ngurusin autentikasi pengguna, database, dan penyimpanan file.

## Build untuk Produksi

Buat build aplikasi untuk produksi dengan:

```bash
npm run build
# atau
yarn build
```

Dan untuk mulai build produksinya:

```bash
npm start
# atau
yarn start
```

## Sumber Tambahan

- [Dokumentasi Next.js](https://nextjs.org/docs)
- [Dokumentasi ShadCN](https://shadcn.dev/docs)
- [Dokumentasi Appwrite](https://appwrite.io/docs)

---

Selamat mencoba, semoga lancar ya!
```
