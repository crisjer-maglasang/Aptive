import { useFormContext } from 'react-hook-form';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { productManagerConstants } from '@/modules/AdminTools/lib/constants';
import { productImageFileSizeSelector } from '@/modules/AdminTools/redux/productManager/products';
import { formatBytes } from '@/lib/validations/files/files';
import UploadButton from '@/modules/AdminTools/modules/ProductManager/components/UploadButton';

const { IMAGE } = productManagerConstants;

const useImageSelect = () => {
  const { register, setValue } = useFormContext();

  const [imageError, setImageError] = useState('');

  const maxFileSizeInBytes = useSelector(productImageFileSizeSelector);

  const createProductErrors = useSelector(
    (state) => state?.errors?.errors?.productsUpdate
  );
  const uploadError = createProductErrors?.[IMAGE] || null;

  const checkFileSize = (file) => {
    if (file.size > maxFileSizeInBytes) {
      const currentSize = formatBytes(file.size);
      const maxSize = formatBytes(maxFileSizeInBytes);

      const errorMessage = `File size is too large. Current file size: ${currentSize}. Must be below ${maxSize}.`;

      setImageError(errorMessage);

      return false;
    }

    return true;
  };

  const onChangeHandler = ({ target: { files } }) => {
    const file = files[0];

    if (file && checkFileSize(file)) {
      setImageError('');

      setValue(IMAGE, file);
    }
  };

  const ImageSelect = (
    <label htmlFor={IMAGE}>
      <input
        {...register(IMAGE)}
        name={IMAGE}
        id={IMAGE}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={onChangeHandler}
      />
      <UploadButton />
    </label>
  );

  return {
    ImageSelect,
    uploadError,
    imageError,
  };
};

export default useImageSelect;
