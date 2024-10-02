import sharp from 'sharp';

type ConvertToWebpProps = {
  inputBuffer: Buffer;
  maxWidth: number;
  maxHeight?: number;
};

export async function convertToWebPServer({
  inputBuffer,
  maxWidth = 720,
  maxHeight = 720,
}: ConvertToWebpProps): Promise<Buffer> {
  let image = sharp(inputBuffer, { density: 72 });

  // EXIF 데이터를 기반으로 이미지 회전
  image = image.rotate();

  // 이미지의 원래 크기를 가져옴
  const metadata = await image.metadata();
  let width = metadata.width;
  let height = metadata.height;

  if (width && height) {
    const aspectRatio = width / height;

    // maxWidth만 넘어왔을 경우
    if (maxWidth) {
      if (aspectRatio > 1) {
        // 가로가 더 긴 경우
        width = maxWidth;
        height = Math.floor(maxWidth / aspectRatio);
      } else {
        // 세로가 더 긴 경우
        height = maxWidth;
        width = Math.floor(maxWidth * aspectRatio);
      }
    } else if (maxWidth && maxHeight) {
      if (aspectRatio > 1) {
        // 가로가 더 긴 경우
        width = maxWidth;
        height = Math.floor(maxWidth / aspectRatio);
      } else {
        // 세로가 더 긴 경우
        height = maxHeight;
        width = Math.floor(maxHeight * aspectRatio);
      }
    } else {
      // maxWidth 또는 maxHeight가 제공되지 않은 경우 기존 로직 유지
      if (aspectRatio > 1) {
        // 가로가 더 긴 경우
        if (width > 720) {
          width = 720;
          height = Math.floor(720 / aspectRatio);
        }
      } else {
        // 세로가 더 긴 경우
        if (height > 720) {
          height = 720;
          width = Math.floor(720 * aspectRatio);
        }
      }
    }

    image = image.resize(width, height, {
      fit: 'inside', // 이미지가 잘리지 않도록 함
    });
  }

  const buffer = await image.toFormat('webp').toBuffer();
  return buffer;
}

export default async function convertToWebP(file: Blob, maxWidth: number, maxHeight?: number) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const convertedBuffer = await convertToWebPServer({
      inputBuffer: buffer,
      maxWidth,
      maxHeight,
    });
    return convertedBuffer;
  } catch (error) {
    console.error('이미지 변환 중 에러 발생 버퍼???:', error);
    return null;
  }
}
