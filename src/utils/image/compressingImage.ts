import imageCompression from 'browser-image-compression';

export const compressingImage = async (
  e: React.ChangeEvent<HTMLInputElement>,
) => {
  const reader = new FileReader();
  const file = e.target.files?.[0];
  if (!file) return;
  const compress = await imageCompression(file, {
    initialQuality: 0.3,
  });

  reader.readAsDataURL(compress);

  console.log('original', Math.ceil(file.size / 1000), 'KB');
  console.log(Math.ceil(compress.size / 1000), 'KB');

  return compress;
};
