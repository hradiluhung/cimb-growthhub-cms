export default function HrBanner() {
  // TODO: Replace with real data
  const profile = {
    nama: 'Hakam Royhan Adiluhung',
  }

  return (
    <div className="p-8 bg-primary/20 rounded-xl flex items-center gap-8 justify-between">
      <div>
        <h2>Selamat datang kembali,</h2>
        <h1 className="font-bold text-xl md:text-2xl lg:text-4xl text-primary mt-2">
          {profile.nama}
        </h1>
        <p className="mt-8">Kelola Training Anda</p>
      </div>
      <div>
        <img src="/hr.png" alt="User" className="size-36" />
      </div>
    </div>
  )
}
