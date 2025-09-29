// Image upload utility functions
export const uploadImage = async (file, folder = 'profiles') => {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('folder', folder);

  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const data = await response.json();
    return data.filename;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};

export const deleteImage = async (filename) => {
  try {
    const response = await fetch(`/api/upload/${filename}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Delete failed');
    }

    return true;
  } catch (error) {
    console.error('Delete error:', error);
    throw error;
  }
};

export const getImageUrl = (filename, folder = 'profiles') => {
  return `/uploads/${folder}/${filename}`;
};

export const validateImageFile = (file, maxSize = 5 * 1024 * 1024, acceptedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']) => {
  if (!file) {
    return { valid: false, error: 'No file selected' };
  }

  if (!acceptedTypes.includes(file.type)) {
    return { 
      valid: false, 
      error: `Invalid file type. Please upload: ${acceptedTypes.map(type => type.split('/')[1].toUpperCase()).join(', ')}` 
    };
  }

  if (file.size > maxSize) {
    return { 
      valid: false, 
      error: `File too large. Maximum size: ${(maxSize / (1024 * 1024)).toFixed(0)}MB` 
    };
  }

  return { valid: true };
};

export const compressImage = (file, maxWidth = 1200, maxHeight = 1200, quality = 0.8) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions while maintaining aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              reject(new Error('Image compression failed'));
            }
          },
          'image/jpeg',
          quality
        );
      };
      
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target.result;
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};