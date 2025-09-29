import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

const ImageUpload = ({ 
  onImageSelect, 
  maxSize = 5 * 1024 * 1024, // 5MB default
  acceptedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  folder = 'profiles',
  preview = true,
  multiple = false 
}) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const validateFile = (file) => {
    if (!acceptedTypes.includes(file.type)) {
      alert(`Invalid file type. Please upload: ${acceptedTypes.join(', ')}`);
      return false;
    }
    if (file.size > maxSize) {
      alert(`File too large. Maximum size: ${(maxSize / (1024 * 1024)).toFixed(0)}MB`);
      return false;
    }
    return true;
  };

  const handleFileSelect = (files) => {
    const validFiles = Array.from(files).filter(validateFile);
    
    if (validFiles.length === 0) return;

    const newImages = validFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      id: Date.now() + Math.random()
    }));

    if (multiple) {
      setSelectedImages(prev => [...prev, ...newImages]);
      onImageSelect && onImageSelect(newImages.map(img => img.file));
    } else {
      // Clean up old preview URLs
      selectedImages.forEach(img => URL.revokeObjectURL(img.preview));
      setSelectedImages(newImages);
      onImageSelect && onImageSelect(newImages[0].file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const removeImage = (id) => {
    const image = selectedImages.find(img => img.id === id);
    if (image) {
      URL.revokeObjectURL(image.preview);
    }
    setSelectedImages(prev => prev.filter(img => img.id !== id));
    onImageSelect && onImageSelect(selectedImages.filter(img => img.id !== id).map(img => img.file));
  };

  const handleFileInput = (e) => {
    handleFileSelect(e.target.files);
  };

  return (
    <div className="w-full">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="flex flex-col items-center space-y-2">
          <Upload className="w-8 h-8 text-gray-400" />
          <p className="text-sm text-gray-600">
            Drag and drop your images here, or{' '}
            <label className="text-blue-600 hover:text-blue-500 cursor-pointer font-medium">
              browse
              <input
                type="file"
                className="hidden"
                accept={acceptedTypes.join(',')}
                onChange={handleFileInput}
                multiple={multiple}
              />
            </label>
          </p>
          <p className="text-xs text-gray-500">
            {acceptedTypes.map(type => type.split('/')[1].toUpperCase()).join(', ')} • Max {(maxSize / (1024 * 1024)).toFixed(0)}MB
          </p>
        </div>
      </div>

      {preview && selectedImages.length > 0 && (
        <div className={`mt-4 ${multiple ? 'grid grid-cols-2 sm:grid-cols-3 gap-4' : 'flex justify-center'}`}>
          {selectedImages.map((image) => (
            <div key={image.id} className="relative group">
              <img
                src={image.preview}
                alt="Preview"
                className={`object-cover rounded-lg ${multiple ? 'w-full h-32' : 'w-48 h-48'}`}
              />
              <button
                onClick={() => removeImage(image.id)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;