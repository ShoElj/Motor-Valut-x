import { useRef, useState, useCallback } from 'react';
import { Box, LinearProgress, Typography, IconButton, Tooltip } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import { uploadCarImage } from '../../services/uploadService';

/**
 * ImageUpload
 * value:    { imageUrl, imagePath } | string (legacy)
 * onChange: ({ imageUrl, imagePath }) => void
 * size:     number (fixed px) | '100%' (fluid width, fixed height)
 */
export default function ImageUpload({ value, onChange, disabled = false, size = 180 }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [dragging, setDragging] = useState(false);

  const previewUrl = typeof value === 'string' ? value : value?.imageUrl || '';
  const isFluid = size === '100%';

  const processFile = useCallback(async (file) => {
    if (!file || disabled) return;
    setError('');
    setUploading(true);
    setProgress(0);
    try {
      const result = await uploadCarImage(file, setProgress);
      onChange(result);
    } catch (err) {
      setError(err.message || 'Upload failed.');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  }, [disabled, onChange]);

  const handleFileInput = (e) => processFile(e.target.files?.[0]);
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    if (!disabled && !uploading) processFile(e.dataTransfer.files?.[0]);
  }, [disabled, uploading, processFile]);
  const handleDragOver = (e) => { e.preventDefault(); if (!disabled && !uploading) setDragging(true); };
  const handleDragLeave = () => setDragging(false);
  const handleRemove = (e) => {
    e.stopPropagation();
    onChange({ imageUrl: '', imagePath: '' });
    setError('');
    setProgress(0);
    if (inputRef.current) inputRef.current.value = '';
  };

  const zoneStyles = isFluid
    ? { width: '100%', height: 160 }
    : { width: size, height: size, flexShrink: 0 };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: isFluid ? 'stretch' : 'center', width: isFluid ? '100%' : size }}>
      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" hidden
        onChange={handleFileInput} disabled={disabled || uploading} />

      <Box
        onClick={() => !disabled && !uploading && inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        sx={{
          position: 'relative',
          ...zoneStyles,
          borderRadius: '14px',
          border: dragging
            ? '1.5px dashed rgba(118,255,3,0.85)'
            : previewUrl
              ? '1.5px solid rgba(255,255,255,0.12)'
              : '1.5px dashed rgba(255,255,255,0.14)',
          bgcolor: dragging ? 'rgba(118,255,3,0.05)' : 'rgba(255,255,255,0.01)',
          overflow: 'hidden',
          cursor: disabled || uploading ? 'default' : 'pointer',
          transition: 'border-color 0.18s, background 0.18s, box-shadow 0.18s, transform 0.18s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '&:hover': !disabled && !uploading && !previewUrl ? {
            borderColor: '#76ff03',
            bgcolor: 'rgba(118,255,3,0.03)',
            boxShadow: '0 0 0 3px rgba(118,255,3,0.06)',
            transform: 'translateY(-1px)',
          } : {},
        }}
      >
        {previewUrl ? (
          <>
            <Box component="img" src={previewUrl} alt="Vehicle preview"
              sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            {!disabled && !uploading && (
              <Box sx={{
                position: 'absolute', inset: 0,
                bgcolor: 'rgba(0,0,0,0.05)',
                transition: 'background 0.18s',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.55)' },
                '&:hover .remove-btn': { opacity: 1 },
              }}>
                <Tooltip title="Remove image">
                  <IconButton className="remove-btn" size="small" onClick={handleRemove}
                    sx={{
                      opacity: 0, transition: 'opacity 0.18s',
                      bgcolor: 'rgba(0,0,0,0.75)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      '&:hover': { bgcolor: '#f50057', borderColor: '#f50057' },
                    }}>
                    <CloseIcon sx={{ fontSize: 15 }} />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          </>
        ) : (
          <Box sx={{ textAlign: 'center', px: 2, pointerEvents: 'none' }}>
            <Box sx={{
              width: 44, height: 44, borderRadius: '12px',
              bgcolor: 'rgba(118,255,3,0.08)',
              border: '1px solid rgba(118,255,3,0.22)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              mx: 'auto', mb: 1.25,
            }}>
              <CloudUploadIcon sx={{ fontSize: 20, color: '#76ff03' }} />
            </Box>
            <Typography sx={{ fontSize: '0.78rem', fontWeight: 600, color: '#bbb', display: 'block', lineHeight: 1.3 }}>
              {uploading ? 'Uploading…' : 'Upload Vehicle Image'}
            </Typography>
            <Typography sx={{ fontSize: '0.67rem', color: '#666', display: 'block', mt: 0.5 }}>
              JPG, PNG, WEBP · Max 5MB
            </Typography>
          </Box>
        )}
      </Box>

      {uploading && (
        <Box sx={{ width: '100%', mt: 1 }}>
          <LinearProgress variant="determinate" value={progress} sx={{ height: 5, borderRadius: 10 }} />
          <Typography sx={{ fontSize: '0.68rem', color: '#555', mt: 0.5, display: 'block', textAlign: 'center' }}>
            {progress}%
          </Typography>
        </Box>
      )}

      {error && (
        <Typography variant="caption" color="error" sx={{ mt: 0.75, textAlign: 'center', display: 'block' }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}
