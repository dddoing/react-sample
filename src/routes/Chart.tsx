import {useQuery} from 'react-query';
import {fetchCoinChart} from '../api';
import ApexChart from 'react-apexcharts'

interface CoinChartProps {
    coinId: string
}

interface IHistorical {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

export default function Chart({coinId}: CoinChartProps) {
    //
    const {isLoading, data: chart} = useQuery<IHistorical[]>(["chart", coinId],
        () => fetchCoinChart(coinId));

    return (
        <div>{isLoading ? "Loading..." :
            <ApexChart
                type="line"
                series={[
                    {
                        name: "Price",
                        data: chart?.map((price) => price.close),
                    },
                ]}
                options={{
                    theme: {
                        mode: "dark",
                    },
                    chart: {
                        height: 300,
                        width: 500,
                        toolbar: {
                            show: false,
                        },
                        // background: "transparent",
                    },
                    grid: {show: false},
                    stroke: {
                        curve: "smooth",
                        width: 4,
                    },
                    yaxis: {
                        show: false,
                    },
                    xaxis: {
                        axisBorder: {show: false},
                        axisTicks: {show: false},
                        labels: {show: false},
                        type: "datetime",
                        categories: chart?.map((price) => price.time_close),
                    },
                    fill: {
                        type: "gradient",
                        gradient: {gradientToColors: ["#0be881"], stops: [0, 100]},
                    },
                    colors: ["#0fbcf9"],
                    tooltip: {
                        y: {
                            formatter: (value) => `$${value.toFixed(2)}`,
                        },
                    },
                }}
            />
        }
        </div>
    )
}