import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'd5954b5b9emsh7c9a963540a5437p1ea164jsn848d2c0c6f4f',
            'x-rapidapi-host': 'currencyconverter9.p.rapidapi.com'
        }
    };

    useEffect(() => {
        if (!currency) return;

        setLoading(true);
        fetch(`https://currencyconverter9.p.rapidapi.com/fetch-all?from=${currency}`, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error fetching data: ${response.statusText}`);
                }
                return response.json();
            })
            .then(response => {
                setData(response.results);
                setError(null);
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [currency]);
    return { data, error, loading };
}

export default useCurrencyInfo;
