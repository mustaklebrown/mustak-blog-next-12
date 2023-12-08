import axios from 'axios';
import react, { useState } from 'react'
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';
import Router, { useRouter } from 'next/router';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import { Post } from '@prisma/client';
import { AppProps } from 'next/dist/pages/_app';
import { KeyedMutator, } from 'swr';
import ScopedMutator from 'swr';





const initialState = {
    title: '',
    imageUrl: '',
    category: '',
    excerpt: ''
};
const options = [
    'scholarship',
    'education',
    'news',
    'history',
    'descover',
];
const modules = {
    toolbar: [
        [{ font: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script: "sub" }, { script: "super" }],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
        ["link", "image", "video"],
        ["clean"],
    ],
};
interface Blog extends Post {
    category: {
        name: string;
        id: number
    },
}
interface Props {
    setShowModel: React.Dispatch<React.SetStateAction<boolean>>
    postup: Blog
    mutate: any
}


const Update = ({ setShowModel, postup, mutate }: Props) => {
    const [formvalue, setFormvalue] = useState(postup);
    const [content, setContent] = useState(postup.content);
    const { data: session, status } = useSession();

    const router = useRouter()
    const { title, excerpt, imageUrl, category: { name }, } = formvalue;

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!title && !content && excerpt && !imageUrl) {
            return;
        }
        if (title && content && excerpt && imageUrl) {
            const updatedForm = {
                ...formvalue,
                imageUrl: imageUrl,
                content: content,
            };
            const res = await axios.put(
                `http://localhost:3000/api/post/${postup.slug}`,
                updatedForm,

            );
            if (res.status === 200) {
                setShowModel(false)
                console.log("post updated successfully");
                mutate(`/api/post/${postup.slug}`,)
                mutate('api/post')

            } else {
                console.log('somethings went wrong');
            }
        }
    }


    const onInputChange = (e: any) => {
        let { name, value } = e.target;
        setFormvalue({ ...formvalue, [name]: value });
    };
    const onCategoryChange = (e: any) => {
        setFormvalue({ ...formvalue, category: e.target.value });
    };
    const onUploadImage = (file: any) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'kmyv04ai');
        axios
            .post(`http://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY}/image/upload`, formData)
            .then((res) => {
                setFormvalue({ ...formvalue, imageUrl: res.data.url });
                console.log("image uploaded successfully");

            })
            .catch((err) => {
                console.log('error', err);
            });
    };
    if (!session) {
        return <div>
            <h1>you re not authorize to this section </h1>
            <button className="btn" onClick={() => Router.push("/")}>go home</button>
        </div>
    }

    return (
        <form
            className="mx-10 lg:mx-1 p-4 mt-20 bg-gray-400 overflow-y-scroll rounded-lg "
            onSubmit={handleSubmit}
        >
            <div className="mb-6">
                <label
                    htmlFor="base-input"
                    className="text-lg font-semibold uppercase block mb-2  font-serif text-gray-900 dark:text-white"
                >
                    title
                </label>
                <input
                    type="text"
                    name="title"
                    value={title || ''}
                    onChange={onInputChange}
                    placeholder="title ..."
                    id="base-input"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>
            <div className="mb-6">
                <label
                    htmlFor="excerpt"
                    className="text-lg font-semibold uppercase block mb-2  font-serif text-gray-900 dark:text-white"
                >
                    excerpt
                </label>
                <textarea
                    onChange={onInputChange}
                    id="excerpt"
                    rows={2}
                    name="excerpt"
                    value={excerpt || ''}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="excerpt for your plate ....."
                ></textarea>
            </div>
            <div className="mb-6">
                <label
                    htmlFor="message"
                    className="text-lg font-semibold uppercase block mb-2  font-serif text-gray-900 dark:text-white"
                >
                    content
                </label>
                <ReactQuill className='bg-white' value={content} modules={modules} onChange={setContent} placeholder="Content goes here..." />
            </div>
            <div className="mb-6">s
                <label
                    className="block mb-2 font-semibold uppercase text-lg font-serif text-gray-900 dark:text-white"
                    htmlFor="user_avatar"
                >
                    Upload file
                </label>
                <input
                    onChange={(e) => {
                        onUploadImage(e.target.files[0]!);
                    }}
                    className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    aria-describedby="user_avatar_help"
                    id="user_avatar"
                    type="file"
                ></input>
            </div>
            <div className="text-center flex space-x-10 items-center justify-center">
                <button
                    onClick={() => setShowModel(false)}
                    type="submit"
                    className="uppercase font-bold text-gray-100 rounded-2xl py-2 px-4 bg-rose-500 hover:bg-rose-700 transition-all duration-300"
                >
                    cancel
                </button>
                <button
                    type="submit"
                    className="uppercase font-bold text-gray-100 rounded-2xl py-2 px-4 bg-indigo-500 hover:bg-indigo-700 transition-all duration-300"
                >
                    update post
                </button>
            </div>
        </form>
    )
}

export default Update