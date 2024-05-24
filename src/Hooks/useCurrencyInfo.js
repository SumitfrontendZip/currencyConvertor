import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {

    const [data, setData] = useState({})

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'd5954b5b9emsh7c9a963540a5437p1ea164jsn848d2c0c6f4f',
            'x-rapidapi-host': 'currencyconverter9.p.rapidapi.com'
        }
    };



    useEffect(() => {

        fetch(`https://currencyconverter9.p.rapidapi.com/fetch-all?from=${currency}`, options)
            .then(response => response.json())
            .then(response => setData(response))
            .catch(err => console.error(err));
    }, [currency]);



    return data.results
}

export default useCurrencyInfo;