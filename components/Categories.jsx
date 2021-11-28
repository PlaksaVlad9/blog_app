import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { getCategories } from '../services';

const Categories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories()
            .then((newCategories) => setCategories(newCategories))
    }, []);

    return (
        <div className="bg-white shadow-lg p-8 mb-8 rounded-lg pb-8">
            <h3 className="text-xl mb-5 font-semibold border-b pb-4">
                Categories
            </h3>
            {categories.map((category) => (
                <Link key={category.slug} href={`/category/${category.slug}`}>
                    <span className="cursor-pointer block mb-2 pb-2">
                        {category.name}
                    </span>
                </Link> 
            ))}
        </div>
    )
}

export default Categories
