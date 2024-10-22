import React, { useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Box, Alert, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, getServerDetails } from '../../features/QRSlice'; // Adjust the path as needed
import './QrCodePage.css';

const QrCodePage = () => {
    const { serverId } = useParams();
    const dispatch = useDispatch();
    const { serverDetails, error } = useSelector((state) => state.qrCode);

    useEffect(() => {
        dispatch(getServerDetails({ serverId }));
        dispatch(clearError());
    }, [dispatch, serverId]);

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
            <Grid item xs={12} sm={10} md={8} lg={6}>
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <QRCodeSVG 
                        value={`/get-scanned-company/${serverDetails?.companyId}`} 
                        size={Math.min(window.innerWidth * 0.8, 500)} // Responsive size
                    />
                    {!error && <Alert severity="success" sx={{ mt: 2 }}>{'Connected'}</Alert>}
                    {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
                </Box>
            </Grid>
        </Grid>
    );
};

export default QrCodePage;
