import TrainingDetail from '@/components/training/training-detail'

export default async function TrainingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id

  return <TrainingDetail id={id} />
}
