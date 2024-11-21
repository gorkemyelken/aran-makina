import React, { useState } from 'react';
import { Button, Typography, Box, CircularProgress } from '@mui/material';

const AdminPhotoUpload = ({ uploadEndpoint = "https://aran-makina-8fce3ead0cbf.herokuapp.com/api/files/upload" }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setUploadMessage('');
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadMessage('Lütfen bir dosya seçin.');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch(uploadEndpoint, {
        method: 'POST',
        body: formData, // FormData içinde dosya verisini gönderiyoruz
      });

      const result = await response.json(); // Yanıtı JSON formatında alıyoruz
      if (response.ok) {
        setUploadMessage('Dosya başarıyla yüklendi.');
      } else {
        setUploadMessage(`Yükleme hatası: ${result.message || result.error || 'Bilinmeyen hata'}`);
      }
    } catch (error) {
      console.error('Yükleme sırasında bir hata oluştu:', error);
      setUploadMessage('Dosya yüklenirken bir hata oluştu.');
    } finally {
      setIsUploading(false);
    }
  };


  return (
    <Box sx={{ margin: '20px 0', textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom>
        Fotoğraf Yükle
      </Typography>

      <input
        type="file"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="photo-upload"
      />
      <label htmlFor="photo-upload">
        <Button variant="outlined" component="span">
          Dosya Seç
        </Button>
      </label>

      {selectedFile && (
        <Typography variant="body1" sx={{ margin: '10px 0' }}>
          Seçilen dosya: {selectedFile.name}
        </Typography>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={isUploading}
        sx={{ marginTop: '10px' }}
      >
        {isUploading ? <CircularProgress size={24} /> : 'Yükle'}
      </Button>

      {uploadMessage && (
        <Typography
          variant="body2"
          color={uploadMessage.includes('başarı') ? 'green' : 'red'}
          sx={{ marginTop: '10px' }}
        >
          {uploadMessage}
        </Typography>
      )}
    </Box>
  );
};

export default AdminPhotoUpload;
