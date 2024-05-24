import { useEffect, useState } from "react";



function useCurrencyInfo(currency) {

    const [data, setData] = useState({})

    const url = `https://currencyconverter9.p.rapidapi.com/fetch-all?from=${currency}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'd5954b5b9emsh7c9a963540a5437p1ea164jsn848d2c0c6f4f',
            'x-rapidapi-host': 'currencyconverter9.p.rapidapi.com'
        }
    };
    

    useEffect(() => {
        fetch(url, options)
            .then((res) => res.json())
            .then((res) => setData(res[currency]))
            console.log(data);
    }, [currency])

    return data
}

export default useCurrencyInfo;