import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import Chart from 'react-apexcharts'; // Grafikler için ApexCharts kullanabiliriz

const Dashboard = () => {
    // Örnek veri
    const stats = [
        { title: 'Toplam Kullanıcılar', value: 1200 },
        { title: 'Toplam Ürünler', value: 350 },
        { title: 'Toplam Siparişler', value: 870 },
        { title: 'Bugünkü Ziyaretler', value: 150 },
    ];

    const chartOptions = {
        series: [{
            name: 'Ziyaretler',
            data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
        }],
        options: {
            chart: {
                type: 'line',
                height: 350
            },
            title: {
                text: 'Haftalık Ziyaret Sayısı',
                align: 'center'
            },
            xaxis: {
                categories: ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt']
            }
        }
    };

    return (
        <Grid container spacing={3} sx={{ padding: 3 }}>
            {stats.map((stat, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                    <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
                        <Typography variant="h6" component="div">{stat.title}</Typography>
                        <Typography variant="h4" component="div">{stat.value}</Typography>
                    </Paper>
                </Grid>
            ))}

            <Grid item xs={12}>
                <Paper elevation={3} sx={{ padding: 2 }}>
                    <Chart
                        options={chartOptions.options}
                        series={chartOptions.series}
                        type="line"
                        height={350}
                    />
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
