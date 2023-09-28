"use client"
import { useEffect, useState } from 'react'
import Product from '../../components/Product'
import { findAllProducts } from './api/products/route'
import initMongoose from '../../lib/mongoose'
import useSWR from 'swr'


// async function getData(){
//   // const res = await fetch('/api/products')
//   // if(!data.ok) throw new Error('Failed to fetch data')

//   // try{
//   //   // const res = await fetch('/api/products/',{cache:'no-store'})
//   //   await initMongoose()
//   //   const res = await findAllProducts()

//   // }catch(err){
//   //   console.log(err)
//   // }

//   await initMongoose()
//   const res = await findAllProducts()

//   return res
// }


const fetcher = async ()=>{
  const response = await fetch('/api/products/')
  const data = await response.json()
  return data
}


const Home = () => {

  // const [productInfo, setProductInfo] = useState()
  const [phrase, setPhrase] = useState('')


  const find = {data, error, isLoading} = useSWR('/api/products/', fetcher)
  if(error) return <h1>Error</h1>
  if(isLoading) return <h1>Chargement...</h1>
  
  // const find = getData()
  const productsInfo = JSON.parse(JSON.stringify(find))

  // useEffect(()=>{
  //   fetch('/api/products/')
  //   .then(response => response.json())
  //   .then(json => setProductInfo(json))
  // },[])

  // const productsInfo = getData()
  const categoriesNames = [...new Set(productsInfo?.map(p => p.category))]

  let products;
  if(phrase){
    products = productsInfo.filter(p => p.name.toLowerCase().includes(phrase))
  }else{
    products = productsInfo
  }

  return (
   
      <div className='p-5'>
        <input value={phrase} onChange={e => setPhrase(e.target.value)} type="text" placeholder='Search for products...' className="bg-gray-100 w-full py-2 px-4 rounded-xl" />
        <div >
          {categoriesNames.map(cat => <div key={cat}>
              <div key={cat}>

                {products.find(p=>p.category === cat)  && (
                  <div>
                    <h2 className='text-2xl py-5 capitalize'>{cat} </h2>
                    <div className="flex mx-5 overflow-x-scroll snap-x scrollbar-hide">
                      {productsInfo.filter(p => p.category === cat).map(product => (
                        <div key={product._id} className='px-5 snap-start'>
                          <Product {...product} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}
          
        </div>  
      </div>
  )
}

export default Home

// export async function getServerSideProps(){
//   await initMongoose()
//   const products = await findAllProducts()
//   return {
//     props: {
//       products: J
//     }
//   }
// }
