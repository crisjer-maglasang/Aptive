import { useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';

import InputBox from '@/modules/AdminTools/modules/ProductManager/components/InputBox';
import usePreviewImage from './PreviewImage';
import useImageSelect from './ImageSelect';
import RemoveImage from './RemoveImage';
import PreviewFullImage from './PreviewFullImage';
import { productManagerConstants } from '@/modules/AdminTools/lib/constants';
import ImageSize from './ImageSize';

const { IMAGE, IMAGE_NAME } = productManagerConstants;

const Image = () => {
  const { PreviewImage, showingImage, previewImageUrl } = usePreviewImage();

  const { ImageSelect, imageError } = useImageSelect();

  const imageName = useWatch({ name: IMAGE_NAME });
  const image = useWatch({ name: IMAGE });

  const [displayName, setDisplayName] = useState(imageName);
  const [displayImage, setDisplayImage] = useState(image);

  useEffect(() => {
    if (image?.name) {
      setDisplayName(image.name);
    }
  }, [image]);

  useEffect(() => {
    if (previewImageUrl) {
      setDisplayImage(previewImageUrl);
    }
  }, [previewImageUrl]);

  return (
    <InputBox className="p-8">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-row space-x-4 items-center">
          <InputBox>{PreviewImage}</InputBox>
          <div className="flex flex-col space-y-2 my-0.5">
            <div className="flex flex-col">
              <div className="text-gray-900 text-xl font-semibold">
                {showingImage ? displayName : 'Service image'}
              </div>
              <div className="text-gray-500">
                {showingImage && <ImageSize src={displayImage} />}
              </div>
            </div>
            {ImageSelect}
          </div>
        </div>
        {imageError && <div className={'text-red-600'}>{imageError}</div>}
      </div>
      <div className="flex-grow" />
      {showingImage && (
        <div className="flex flex-row space-x-8 text-gray-400 text-[14px]">
          <PreviewFullImage {...{ displayImage, displayName }} />
          <RemoveImage />
        </div>
      )}
    </InputBox>
  );
};

export default Image;
