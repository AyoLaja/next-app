'use client';

import { useState } from 'react';
import { CldUploadWidget, CldImage } from 'next-cloudinary';

interface CloudinaryUploadWidgetInfo {
  public_id: string;
}

export default function UploadPage() {
  const [publidId, setPublidId] = useState<string | null>(null);

  return (
    <div>
      <CldUploadWidget
        uploadPreset='next_app'
        onUploadAdded={(result) => console.log(result)}
        options={{
          sources: ['local'],
          multiple: false,
          styles: {
            palette: {
              window: '#000000',
              sourceBg: '#000000',
              windowBorder: '#8E9FBF',
              tabIcon: '#FFFFFF',
              inactiveTabIcon: '#8E9FBF',
              menuIcons: '#2AD9FF',
              link: '#08C0FF',
              action: '#336BFF',
              inProgress: '#00BFFF',
              complete: '#33ff00',
              error: '#EA2727',
              textDark: '#000000',
              textLight: '#FFFFFF',
            },
          },
        }}
        onSuccess={(result) => {
          if (result.event !== 'success') return;
          const info = result.info as CloudinaryUploadWidgetInfo;
          setPublidId(info.public_id);
        }}
      >
        {({ open }) => {
          return (
            <button className='btn btn-primary' onClick={() => open()}>
              Upload
            </button>
          );
        }}
      </CldUploadWidget>

      {publidId && (
        <CldImage
          src={publidId}
          width={300}
          height={300}
          alt='Uploaded Image'
        />
      )}
    </div>
  );
}
