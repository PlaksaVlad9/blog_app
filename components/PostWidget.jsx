import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Link from 'next/dist/client/link';

import { getRecentPosts, getSimilarPosts } from '../services';

const PostWidget = ({ categories, slug }) => {
    const [relatedPosts, setRelatedPosts] = useState([]);

    useEffect(() => {
        if(slug){
            getSimilarPosts(categories, slug)
                .then((res) => setRelatedPosts(res))
        } else {
            getRecentPosts()
                .then((res) => setRelatedPosts(res))
        }
    }, [slug])

    console.log(relatedPosts);

    return (
        <div className="bg-white shadow-lg p-6 mb-6 rounded-lg">
            <h3 className="text-xl mb-9 font-semibold border-b pb-3">
                {slug ? 'Related Posts' : 'Recent Posts'}
            </h3>
            {relatedPosts.map((post) => (
                <div key={post.title} className="flex item-center w-full mb-3">
                    <div className="w-16 flex-none">
                        <Link href={`/post/${post.slug}`}>
                            <img
                                src={post.featuredImage.url}
                                alt={post.title}
                                height="60px" 
                                width="60px" 
                                className="align-center rounded-full"
                            />
                        </Link>
                    </div>
                    <div className="flex-grow ml-4">
                        <p className="text-gray-500 font-xs">
                            {moment(post.createdAt).format('MMM DD, YYYY')}
                        </p>
                        <Link href={`/post/${post.slug}`} key={post.title} className="text-md">
                            {post.title}
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PostWidget
