import React, { useRef, useState } from 'react';
import {
  Image as ImageIcon,
  ImagePlus,
  RefreshCw,
  Trash2,
  UploadCloud,
  X,
} from 'lucide-react';
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_GALLERY_IMAGES,
  MAX_IMAGE_BYTES,
} from '../../../data/listingWizardOptions';
import { ListingWizardImage } from '../../../types';

const formatBytes = (bytes?: number) => {
  if (!bytes) return '';
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const validateImageFile = (file: File) => {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return 'Please upload a PNG, JPG or WebP image.';
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return 'Image must be 5 MB or smaller.';
  }
  return '';
};

const readImageFile = (file: File): Promise<ListingWizardImage> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () =>
      resolve({
        id: `img-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        src: String(reader.result),
        name: file.name,
        size: file.size,
      });
    reader.onerror = () => reject(new Error('Could not read this image. Please try another file.'));
    reader.readAsDataURL(file);
  });

const fieldErrorText = (message: string) => (
  <p className="mt-2 text-[11px] font-medium text-status-rejected-text">{message}</p>
);

interface SingleImageUploadProps {
  label: string;
  description: string;
  value: ListingWizardImage | null;
  onChange: (image: ListingWizardImage | null) => void;
  variant: 'logo' | 'cover';
  required?: boolean;
  error?: string;
}

export const SingleImageUpload: React.FC<SingleImageUploadProps> = ({
  label,
  description,
  value,
  onChange,
  variant,
  required = false,
  error,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileError, setFileError] = useState('');
  const [isReading, setIsReading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const openFilePicker = () => inputRef.current?.click();

  const handleFiles = async (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;

    const validationMessage = validateImageFile(file);
    if (validationMessage) {
      setFileError(validationMessage);
      return;
    }

    setFileError('');
    setIsReading(true);

    try {
      const image = await readImageFile(file);
      onChange(image);
    } catch (readError) {
      setFileError(
        readError instanceof Error ? readError.message : 'Could not read this image.'
      );
    } finally {
      setIsReading(false);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);
    void handleFiles(event.dataTransfer.files);
  };

  const aspectClass = variant === 'logo' ? 'aspect-square' : 'aspect-[16/9]';
  const message = fileError || error;

  return (
    <div>
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <label className="text-xs font-semibold text-text-primary">
          {label} {required && <span className="text-status-rejected-text">*</span>}
        </label>
        {value && (
          <span className="text-[10px] text-text-muted truncate max-w-[60%]">
            {value.name}
            {value.size ? ` · ${formatBytes(value.size)}` : ''}
          </span>
        )}
      </div>
      <p className="text-[11px] text-text-muted mb-2">{description}</p>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_IMAGE_TYPES.join(',')}
        className="sr-only"
        onChange={(event) => {
          void handleFiles(event.target.files);
          event.target.value = '';
        }}
      />

      <div
        className={`relative ${aspectClass} overflow-hidden rounded-xl border-2 border-dashed transition-colors ${
          dragActive
            ? 'border-primary bg-teal-wash'
            : message
              ? 'border-status-rejected-text/50 bg-status-rejected-bg/30'
              : 'border-border-subtle bg-surface-container-lowest hover:border-primary/50 hover:bg-teal-wash/40'
        }`}
        onDragOver={(event) => {
          event.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
      >
        {value ? (
          <>
            <img
              src={value.src}
              alt={`${label} preview`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-text-primary/70 via-transparent to-transparent" />
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-end gap-1.5">
              <button
                type="button"
                onClick={openFilePicker}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-surface-card/95 text-text-primary text-[11px] font-semibold shadow-sm hover:bg-surface-card transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Replace
              </button>
              <button
                type="button"
                onClick={() => {
                  onChange(null);
                  setFileError('');
                }}
                aria-label={`Remove ${label}`}
                className="p-1.5 rounded-lg bg-status-rejected-bg/95 text-status-rejected-text shadow-sm hover:bg-status-rejected-bg transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </>
        ) : (
          <button
            type="button"
            onClick={openFilePicker}
            className="w-full h-full flex flex-col items-center justify-center gap-2 p-4 text-center"
          >
            <span className="w-10 h-10 rounded-xl bg-teal-wash text-primary flex items-center justify-center border border-primary/20">
              {isReading ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : variant === 'logo' ? (
                <ImageIcon className="w-5 h-5" />
              ) : (
                <UploadCloud className="w-5 h-5" />
              )}
            </span>
            <span className="text-xs font-semibold text-text-primary">
              {isReading ? 'Reading image...' : `Upload ${variant === 'logo' ? 'logo' : 'cover image'}`}
            </span>
            <span className="text-[10px] text-text-muted">
              Drag & drop or click · PNG, JPG or WebP · up to 5 MB
            </span>
          </button>
        )}
      </div>

      {message && fieldErrorText(message)}
    </div>
  );
};

interface GalleryUploadProps {
  images: ListingWizardImage[];
  onChange: (images: ListingWizardImage[]) => void;
}

export const GalleryUpload: React.FC<GalleryUploadProps> = ({ images, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileError, setFileError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [isReading, setIsReading] = useState(false);

  const openFilePicker = () => inputRef.current?.click();

  const handleFiles = async (files: FileList | null) => {
    const selectedFiles = Array.from(files ?? []);
    if (selectedFiles.length === 0) return;

    setIsReading(true);

    const remainingSlots = MAX_GALLERY_IMAGES - images.length;
    if (remainingSlots <= 0) {
      setFileError(`You can add up to ${MAX_GALLERY_IMAGES} gallery images.`);
      setIsReading(false);
      return;
    }

    const filesToRead = selectedFiles.slice(0, remainingSlots);
    let nextError =
      selectedFiles.length > remainingSlots
        ? `Only ${remainingSlots} more image${remainingSlots === 1 ? '' : 's'} can be added.`
        : '';

    const validImages: ListingWizardImage[] = [];

    for (const file of filesToRead) {
      const validationMessage = validateImageFile(file);
      if (validationMessage) {
        nextError = validationMessage;
        continue;
      }

      try {
        validImages.push(await readImageFile(file));
      } catch (readError) {
        nextError =
          readError instanceof Error ? readError.message : 'Could not read this image.';
      }
    }

    setFileError(nextError);
    setIsReading(false);

    if (validImages.length > 0) {
      onChange([...images, ...validImages]);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);
    void handleFiles(event.dataTransfer.files);
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <label className="text-xs font-semibold text-text-primary">
          Gallery images <span className="font-normal text-text-muted">(optional)</span>
        </label>
        <span className="text-[10px] font-semibold text-text-muted">
          {images.length} of {MAX_GALLERY_IMAGES}
        </span>
      </div>
      <p className="text-[11px] text-text-muted mb-2">
        Show the atmosphere, team or space customers will visit.
      </p>

      <input
        ref={inputRef}
        type="file"
        multiple
        accept={ACCEPTED_IMAGE_TYPES.join(',')}
        className="sr-only"
        onChange={(event) => {
          void handleFiles(event.target.files);
          event.target.value = '';
        }}
      />

      <div
        className={`rounded-xl border-2 border-dashed p-4 transition-colors ${
          dragActive
            ? 'border-primary bg-teal-wash'
            : 'border-border-subtle bg-surface-container-lowest hover:border-primary/50 hover:bg-teal-wash/40'
        }`}
        onDragOver={(event) => {
          event.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
      >
        <button
          type="button"
          onClick={openFilePicker}
          className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-text-primary"
        >
          <span className="w-8 h-8 rounded-lg bg-teal-wash text-primary flex items-center justify-center border border-primary/20">
            {isReading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <ImagePlus className="w-4 h-4" />
            )}
          </span>
          {isReading ? 'Reading images...' : 'Add gallery images'}
          <span className="text-[10px] font-normal text-text-muted">
            · PNG, JPG or WebP · up to 5 MB each
          </span>
        </button>

        {images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
            {images.map((image) => (
              <div
                key={image.id}
                className="relative aspect-[4/3] rounded-lg overflow-hidden border border-border-subtle group"
              >
                <img
                  src={image.src}
                  alt={image.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-text-primary/0 group-hover:bg-text-primary/30 transition-colors" />
                <button
                  type="button"
                  onClick={() => onChange(images.filter((item) => item.id !== image.id))}
                  aria-label={`Remove ${image.name}`}
                  className="absolute top-1.5 right-1.5 p-1.5 rounded-md bg-surface-card/95 text-status-rejected-text shadow-sm hover:bg-status-rejected-bg transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                <span className="absolute bottom-1.5 left-1.5 right-1.5 text-[9px] font-medium text-white truncate drop-shadow-sm">
                  {image.name}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {fileError && fieldErrorText(fileError)}
    </div>
  );
};
