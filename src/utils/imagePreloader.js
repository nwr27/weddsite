export async function preloadImages(urls, onProgress) {
  const images = [...new Set(urls.filter(Boolean))];
  const total = images.length;
  if (total === 0) {
    onProgress?.(100);
    return;
  }
  let completed = 0;
  const loadImage = (url) => new Promise((resolve) => {
    const img = new Image();
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      completed += 1;
      onProgress?.(Math.round((completed / total) * 100));
      resolve();
    };
    img.onload = async () => {
      try {
        if (img.decode) await img.decode();
      } catch {
        // Continue if decoding fails.
      }
      finish();
    };
    img.onerror = finish;
    img.src = url;
  });
  await Promise.all(images.map(loadImage));
}
