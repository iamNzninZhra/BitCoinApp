/* eslint-disable no-undef */
/* eslint-disable no-unreachable */
/* eslint-disable no-dupe-keys */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import { coinData } from "./CoinsData"
import { DataGrid } from '@mui/x-data-grid';
// import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import { mirage } from 'ldrs'

const CoinList = () => {
    const defaultCoins = useRef([])
    const [coins, setCoins] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd'
                );
                const data = await response.json();
                setCoins(data);
                defaultCoins.current = data;
            } catch (error) {
                console.error("Error while fetching data", error);
            }
        };

        fetchData();

        const interval = setInterval(() => {
            fetchData();
        }, 100);

        return () => clearInterval(interval);
    }, []);


    const formattedCoins = coins.map((coin) => ({
        name: coin.name,
        symbol: coin.symbol,
        price: coin.current_price,

    }));
    const handleChange = (event) => {
        const newCoins = coins.filter(coin => coin.id.includes(event.target.value)) || coins.filter(coin => coin.symbol.includes(event.target.value)) || coins.filter(coin => coin.image.includes(event.target.value))
        setCoins(newCoins)
    }

    const columns = [
        { field: 'image', headerName: 'Image', width: 40, editable: true, renderCell: (params) => <img src={params.value} style={{ width: "35px" }} /> },
        { field: 'id', headerName: 'Name', width: 100 },
        { field: 'current_price', headerName: 'Price', width: 100 },
        { field: 'market_cap_rank', headerName: 'Rank', width: 130, style: { fontWeight: "bold" } },
        { field: 'high_24h', headerName: 'high_24h', width: 130 },
        { field: 'low_24h', headerName: 'low_24h', width: 130 },
        { field: 'market_cap', headerName: 'Market-Cap', width: 130 },
        { field: 'max_supply', headerName: 'Max-supply', width: 130 },
        { field: 'total_volume', headerName: 'Volume', width: 130 },
        { field: 'price_change_24h', headerName: 'Price-Changed', width: 130, },
        { field: 'last_updated', headerName: 'Last Update', width: 210, }
    ]



    mirage.register()
    // if (coins.length === 0) {
    //     return 
    //     // <CircularProgress color="inherit" style={{display:"flex",margin:"0 auto",marginTop:"20%"}}/>
    //     <l-bouncy  style={{display:"flex",margin:"0 auto",marginTop:"20%"}}
    //         size="45"
    //         speed="1.75"
    //         color="black">
    //     </l-bouncy>

    // }

    mirage.register()

    return (
        <>
            {coins.length === 0 ? (
                <l-mirage style={{ display: "flex", margin: "0 auto", marginTop: "20%" }}
                    size="60"
                    speed="2.5"
                    color="#810bc1"
                ></l-mirage>
            ) : (
                <div style={{ marginLeft: "10px" }}>
                    <h2 style={{ borderBottom: "2px solid #000", display: "inline-block", marginLeft: "43%" }}>Cryptocurrency</h2>
                    <TextField id="outlined-search" label="Search field" type="search" sx={{ marginLeft: "-50%", marginTop: "15px" }} onChange={handleChange} />

                    <div style={{ height: 400, width: '100%', marginTop: "50px" }}>
                        <DataGrid
                            rows={coins}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 10 },
                                },
                            }}
                            pageSizeOptions={[5, 10]}
                        />
                    </div>
                </div>
            )}


        </>
    );
};


export default CoinList;