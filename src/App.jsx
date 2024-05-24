import { useState } from 'react'
import './App.css'
import { InputBox } from './Components'
import useCurrencyInfo from './Hooks/useCurrencyInfo'
function App() {

  const [data, setData] = useState({
    from: 'USD',
    to: 'INR',
    amount: 0,
    convertedAmount: 0
  })


  const { data: currencyInfo, loading } = useCurrencyInfo(data.from)
  const options = currencyInfo ? Object.keys(currencyInfo) : []

  const swap = () => {

    setData(prevData => ({
      ...prevData,
      from: data.to,
      to: data.from,
      amount: data.convertedAmount,
      convertedAmount: data.amount
    }))
  }

  const convert = () => {
    if (!loading && currencyInfo && currencyInfo[data.to])
      setData(prevData => ({ ...prevData, convertedAmount: data.amount * currencyInfo[data.to] }))
  }



  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/3532540/pexels-photo-3532540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert()

            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={data.amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setData(prevData => ({ ...prevData, from: currency }))}
                selectCurrency={data.from}
                onAmountChange={(amount) => setData(prevData => ({ ...prevData, amount: amount, }))}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={data.convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setData(prevData => ({ ...prevData, to: currency }))}
                selectCurrency={data.to}
                amountDisable
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
              Convert {data.from.toUpperCase()} to {data.to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>

  )
}

export default App;
