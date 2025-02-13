import UserDetail from '@/components/user/user-detail'

export default async function DetailPesertaPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id

  return <UserDetail id={id} />
}
