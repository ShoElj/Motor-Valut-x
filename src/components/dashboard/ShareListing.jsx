import React, { useState } from 'react';
import { Box, Tooltip, Snackbar } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { shareToWhatsApp, copyListing } from '../../utils/shareUtils';

const ActionBtn = ({ title, onClick, icon, hoverColor, hoverBg }) => (
  <Tooltip title={title} placement="top">
    <Box
      onClick={onClick}
      sx={{
        width: 32, height: 32,
        borderRadius: '8px',
        border: '1px solid rgba(255,255,255,0.08)',
        bgcolor: 'rgba(255,255,255,0.03)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer',
        color: '#555',
        transition: 'all 0.15s',
        flexShrink: 0,
        '&:hover': {
          color: hoverColor,
          bgcolor: hoverBg,
          borderColor: `${hoverColor}44`,
        },
      }}
    >
      {icon}
    </Box>
  </Tooltip>
);

export default function ShareListing({ car }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await copyListing(car);
    setCopied(true);
  };

  return (
    <>
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        <ActionBtn
          title="Share on WhatsApp"
          onClick={() => shareToWhatsApp(car)}
          icon={<WhatsAppIcon sx={{ fontSize: 15 }} />}
          hoverColor="#25D366"
          hoverBg="rgba(37,211,102,0.1)"
        />
        <ActionBtn
          title="Copy listing"
          onClick={handleCopy}
          icon={<ContentCopyIcon sx={{ fontSize: 14 }} />}
          hoverColor="#aaa"
          hoverBg="rgba(255,255,255,0.07)"
        />
      </Box>
      <Snackbar
        open={copied}
        autoHideDuration={2000}
        onClose={() => setCopied(false)}
        message="Listing copied to clipboard"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </>
  );
}
