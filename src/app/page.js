
'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '@/store/slices/apiSlice'

export default function Home() {
  const dispatch = useDispatch()
  const { products, productsLoading, productsError } = useSelector((state) => state.api)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  if (productsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading products...</div>
      </div>
    )
  }

  if (productsError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-xl">Error: {productsError}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-md mb-4 flex items-center justify-center">
              {product.images && product.images[0] ? (
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <span className="text-gray-400">No Image</span>
              )}
            </div>
            <h2 className="text-xl font-semibold mb-2 line-clamp-2">{product.title}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
              {product.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-green-600">
                ${product.price}
              </span>
              <span className="text-sm text-gray-500">
                {product.rating ? (
                  <>
                    Rating: {typeof product.rating === 'object' ? product.rating.rate : product.rating}
                    {typeof product.rating === 'object' && product.rating.count && (
                      <span className="ml-1">({product.rating.count})</span>
                    )}
                  </>
                ) : (
                  'Rating: N/A'
                )}
              </span>
            </div>
            {product.stock !== undefined && (
              <div className="mt-2 text-sm text-gray-500">
                Stock: {product.stock}
              </div>
            )}
          </div>
        ))}
      </div>
      {products.length === 0 && !productsLoading && (
        <div className="text-center text-gray-500 mt-8">
          No products found
        </div>
      )}
    </div>
  )
}
