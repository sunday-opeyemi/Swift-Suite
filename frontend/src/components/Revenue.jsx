import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';



const Revenue = () => {
    const [state, setState] = useState({
        series: [
            {
                data: [
                    170, 200, 230, 260, 350, 230, 200, 170, 170, 150, 150, 112,
                ],
            },
        ],
    });

    const options = {
        colors: ['#027840'],
        chart: {
            fontFamily: 'Satoshi, sans-serif',
            type: 'bar',
            height: 300,
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                borderRadius: 2,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 4,
            colors: ['transparent'],
        },
        xaxis: {
            categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
            ],
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        legend: {
            show: true,
            position: 'top',
            horizontalAlign: 'left',
            fontFamily: 'inter',
            markers: {
                radius: 99,
            },
        },
        grid: {
            yaxis: {
                lines: {
                    show: false,
                },
            },
        },
        fill: {
            opacity: 1,
        },
        tooltip: {
            x: {
                show: false,
            },
        },
    };

    return (
        <div className="col-span-12 rounded-lg bg-white lg:h-[99%] px-5 pt-7.5 pb-5 shadow-lg sm:px-7.5">
            <div className='flex lg:gap-[50%] text-sm gap-[37%] pt-10'>
                <div>
                    <p>Total Revenue</p>
                    <h3 className="text-xl font-bold text-black dark:text-white">
                        $70,000
                    </h3>
                </div>
            </div>
            <div className="mb-2">
                <div className="-ml-5">
                    <ReactApexChart
                        options={options}
                        series={state.series}
                        type="bar"
                        height={348}
                    />
                </div>
            </div>
        </div>
    );
};

export default Revenue;
