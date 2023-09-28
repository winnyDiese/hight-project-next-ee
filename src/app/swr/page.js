
import useSWR from 'swr'

const fetcher = async ()=>{
    const response = await fetch('/api/products/')
    const data = await response.json()
    return data
}

function DashboardSWR(){
    const {data, error} = useSWR(('dashboard', fetcher))

    if(error) return 'An error accured'
    if(!data) return 'Loading'

    return <div>
        <h1>{data.title} </h1>
        <p>{data.description} </p>
    </div>
}