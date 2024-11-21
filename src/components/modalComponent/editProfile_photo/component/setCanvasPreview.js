const setCanvasPreview = (image, canvas, crop) => {
    const ctx = canvas.getContext("2d");

    if (!ctx) {
        throw new Error('사진만 넣어주세요');
    }

    const pixelRatio = window.devicePixelRatio || 1;
    const scaleX = image.naturalWidth / image.width; // 원본 이미지의 가로 비율
    const scaleY = image.naturalHeight / image.height; // 원본 이미지의 세로 비율

    canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
    canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

    ctx.scale(pixelRatio, pixelRatio);
    ctx.imageSmoothingQality = 'high';
    ctx.save();
    
    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleY;

    ctx.translate(-cropX, -cropY)

    // 크롭 영역을 캔버스에 그리기
    ctx.drawImage(
        image,
        0,
        0,
        image.naturalWidth,
        image.naturalHeight,
        0,
        0,
        image.naturalWidth,
        image.naturalHeight,
    );

    ctx.restore();
};

export default setCanvasPreview;
