# Panduan Deploy ke Vercel

## Persiapan Database

1. **Buat Database Postgres di Vercel**

   - Masuk ke dashboard Vercel
   - Pilih project Anda
   - Pergi ke tab "Storage"
   - Klik "Create Database"
   - Pilih "Postgres"
   - Beri nama database (misal: belajar-nodejs-db)

2. **Copy Environment Variables**
   - Setelah database dibuat, Vercel akan otomatis membuat environment variables
   - Pastikan variable `POSTGRES_PRISMA_URL` ada
   - Di project settings → Environment Variables, tambahkan:
     - `DATABASE_URL` = `POSTGRES_PRISMA_URL` value
     - `NODE_ENV` = `production`

## Deploy ke Vercel

### Metode 1: Deploy via CLI

```bash
# Install Vercel CLI jika belum
npm i -g vercel

# Login ke Vercel
vercel login

# Deploy
vercel

# Deploy production
vercel --prod
```

### Metode 2: Deploy via Git

1. Push code ke GitHub/GitLab/Bitbucket
2. Import project di Vercel dashboard
3. Vercel akan otomatis detect dan deploy

## Jalankan Migrasi Database

Setelah deploy, jalankan migrasi database:

```bash
# Dari local, connect ke production database
DATABASE_URL="your-vercel-postgres-url" npx prisma migrate deploy
```

Atau tambahkan script postbuild di package.json:

```json
{
  "scripts": {
    "vercel-build": "prisma generate && prisma migrate deploy"
  }
}
```

## Testing Lokal

```bash
# Setup database URL di .env
DATABASE_URL="postgresql://username:password@localhost:5432/dbname"

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Start server
npm start
```

## Troubleshooting

### Error: Can't reach database server

- Pastikan DATABASE_URL benar
- Cek koneksi database aktif
- Untuk Vercel Postgres, gunakan POSTGRES_PRISMA_URL

### Error: Prisma Client not generated

- Run `npx prisma generate` di local
- Pastikan `vercel-build` script ada di package.json

### Error: Migration failed

- Pastikan migrations folder ter-commit ke Git
- Run `prisma migrate deploy` setelah deploy
