import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useProductsQuery } from '../api/store';
import { MdOutlineNavigateNext } from "react-icons/md"
import Filter from '../components/Sort&Filter';
import { useDispatch, useSelector } from 'react-redux';
import { setSubCategories, setPage, clearFilters } from "../slices/shop";
import { useNavigate } from 'react-router';
import SortOptions from '../components/SortOptions';

export default function Products() {
    const { category, subCategory, search, minPrice, maxPrice, sortOrder } = useSelector(state => state.shop);
    const navigate = useNavigate();

    if (!category) navigate("/");

    const [page, setPage] = useState(1);
    const [showFilter, setShowFilter] = useState(false);
    const [showSort, setShowSort] = useState(false);

    const { data, isLoading, err } = useProductsQuery({
        category,
        subCategory,
        search,
        page,
        limit: 20,
        minPrice,
        maxPrice,
        sortOrder
    });

    useEffect(() => {
        setPage(1);
    }, [subCategory]);

    if (err) {
        return <p>Error loading products.</p>;
    }

    return (
        <div>
            <div className='flex flex-col md:flex-row gap-2 w-full'>
                <div className='relative w-full md:w-80'>
                    <div className='md:sticky md:bg-gray-100 top-3 w-full md:mt-3'>
                        {/* Dropdowns for small screens */}
                        <div className='md:hidden flex gap-2 mb-3 p-2'>
                            <div
                                className='relative'
                                onMouseEnter={() => setShowFilter(true)}
                                onMouseLeave={() => setShowFilter(false)}
                            >
                                <button className='bg-gray-200 px-3 py-2 rounded text-lg font-semibold'>
                                    Filter
                                </button>
                                {showFilter && (
                                    <div className='absolute pt-2'>
                                        <div className=' bg-gray-100 p-4 rounded shadow-lg mt-2 w-max'>
                                            <Filter subCategories={data?.subCategories || null} />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div
                                className='relative'
                                onMouseEnter={() => setShowSort(true)}
                                onMouseLeave={() => setShowSort(false)}
                            >
                                <button className='bg-gray-200 px-3 py-2 rounded text-lg font-semibold'>
                                    Sort
                                </button>
                                {showSort && (
                                    <div className='absolute pt-2'>
                                        <div className=' bg-gray-100 p-4 rounded shadow-lg mt-2 w-max'>
                                            <SortOptions />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Filter and Sort on larger screens */}
                        <div className='hidden md:block'>
                            <div className='flex flex-col gap-4'>
                                <Filter subCategories={data?.subCategories || null} />
                                <SortOptions />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex w-full flex-col items-center'>
                    <div className="flex gap-5 flex-wrap py-3">
                        {(data?.products || Array.from({ length: 20 }, () => null)).map((product, index) => (
                            <Product product={product} key={`prod_${product?._id || index}`} />
                        ))}
                    </div>

                    <Pagination totalPages={data?.totalPages || null} page={page} setPage={setPage} />
                </div>
            </div>
        </div>
    );
}


function Product({ product, key }) {
    const [ref, inView] = useInView({
        triggerOnce: true,
    });
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/view/${product._id}`)
    }


    if (!product) {
        return null
    }

    return (
        <div
            ref={ref}
            onClick={handleClick}
            key={key}
            className={`p-2 w-60 bg-gray-200 rounded-md hover:scale-105 hover:cursor-pointer duration-100`}
        >
            {inView && (
                <div className={`bg-white h-60 w-full p-4 `}>
                    <img
                        src={product.images[0]}
                        alt={product.title}
                        className={`h-full mx-auto ${isImageLoaded ? "block" : "hidden"} `}
                        onLoad={() => setIsImageLoaded(true)}
                    />
                </div>
            )}

            <div className='p-2'>
                <p className="font-bold overflow-hidden">{product.title}</p>
                <p className='font-bold text-lg'>
                    {product.discountedPrice}

                    {
                        product.discountedPrice < product.retailPrice ?
                            <span className="text-gray-400 line-through ml-2">{product.retailPrice}</span> :
                            null
                    }
                </p>
            </div>
        </div>
    );
}


function Pagination({ totalPages, page, setPage }) {

    if (!totalPages)
        return null;

    const start = Math.max(1, page - 3);
    const end = Math.min(start + 2, totalPages);

    return (
        <div className='flex gap-4 max-w-60 w-fit mx-auto justify-between mt-10'>
            {
                Array.from({ length: end - start + 1 }, (_, i) => {

                    return (
                        <div className={`w-8 h-8 rounded-full font-semibold p-1 text-center hover:cursor-pointer
                            ${page == i + start ? "bg-yellow-500" : "bg-gray-400"}`}
                            onClick={() => setPage(i + start)}
                        >
                            {i + start}
                        </div>
                    )
                })
            }
        </div>
    )
}