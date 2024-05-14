import { useEffect, useState } from 'react';
import heic2any from 'heic2any';
import { useWatch } from 'react-hook-form';

import Image from '@/modules/AdminTools/modules/ProductManager/components/Image';
import PlaceHolderImage from '@/modules/AdminTools/modules/ProductManager/components/PlaceHolderImage';
import { productManagerConstants } from '@/modules/AdminTools/lib/constants';

const { IMAGE } = productManagerConstants;

// FileReader doesn't work with HEIC
// https://stackoverflow.com/a/68222529
const getHeicBlob = async (file) => {
  // get image as blob url
  const blobURL = URL.createObjectURL(file);

  // convert "fetch" the new blob url
  const blobRes = await fetch(blobURL);

  // convert response to blob
  const blob = await blobRes.blob();

  // convert to PNG - response is blob
  return await heic2any({ blob, toType: 'jpeg' });
};

const usePreviewImage = () => {
  const image = useWatch({ name: IMAGE });

  const [previewImageUrl, setPreviewImageUrl] = useState();

  useEffect(() => {
    if (!image) {
      setPreviewImageUrl(null);

      return;
    }

    if (typeof image === 'string' || !image) {
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreviewImageUrl(reader.result);
    };

    getHeicBlob(image)
      .then((blob) => {
        reader.readAsDataURL(blob);
      })
      .catch(() => {
        reader.readAsDataURL(image);
      });
  }, [image]);

  let PreviewImage = null;

  const className = 'w-auto h-28 rounded-md';

  if (!previewImageUrl && !image) {
    PreviewImage = <PlaceHolderImage className={className} />;
  } else if (!previewImageUrl) {
    PreviewImage = <Image className={className} src={image} />;
  } else {
    PreviewImage = <Image className={className} src={previewImageUrl} />;
  }

  return {
    PreviewImage,
    showingImage: Boolean(previewImageUrl || image),
    previewImageUrl,
  };
};

export default usePreviewImage;
