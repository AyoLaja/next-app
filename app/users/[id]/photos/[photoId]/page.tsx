interface PhotoPageProps {
  params: {
    id: number;
    photoId: number;
  };
}

export default async function PhotoPage({ params }: PhotoPageProps) {
  const { id, photoId } = await params;

  return (
    <div>
      Photo {id} {photoId}
    </div>
  );
}
