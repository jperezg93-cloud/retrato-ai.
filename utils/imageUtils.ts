
export const resizeImage = (file: File, maxSize: number): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            if (!event.target?.result) {
                return reject(new Error("FileReader did not load the image."));
            }
            const img = new Image();
            img.onload = () => {
                let width = img.width;
                let height = img.height;

                // Force a safer max size to avoid RPC/Payload errors with the API
                // 800px is usually sufficient for reference without hitting default payload limits
                const effectiveMaxSize = Math.min(maxSize, 800);

                if (width > height) {
                    if (width > effectiveMaxSize) {
                        height *= effectiveMaxSize / width;
                        width = effectiveMaxSize;
                    }
                } else {
                    if (height > effectiveMaxSize) {
                        width *= effectiveMaxSize / height;
                        height = effectiveMaxSize;
                    }
                }

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    return reject(new Error('Could not get canvas context'));
                }
                ctx.drawImage(img, 0, 0, width, height);
                
                // Always convert to JPEG with 0.8 quality to ensure compact payload
                const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
                resolve(dataUrl);
            };
            img.onerror = (err) => reject(err);
            img.src = event.target.result as string;
        };
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(file);
    });
};
