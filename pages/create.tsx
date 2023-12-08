import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Quill } from 'react-quill';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import Router, { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

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

const create = () => {
  const [formvalue, setFormvalue] = useState(initialState);
  const [content, setContent] = useState("");
  const { data: session, status } = useSession();

  const router = useRouter()
  const { title, excerpt, imageUrl, category } = formvalue;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!title && !content && excerpt && !category && !imageUrl) {
      return;
    }
    if (title && content && excerpt && category && imageUrl) {
      const updatedForm = {
        ...formvalue,
        imageUrl: imageUrl,
        content: content,
        slug: title.replace(" ", "-")
      };
      const res = await axios.post(
        'http://localhost:3000/api/post',
        updatedForm,

      );
      if (res.status === 200) {
        console.log('post create successfully');
        setFormvalue({
          title: '',
          excerpt: '',
          category: '',
          imageUrl: '',
        });
        setContent('')
        Router.push("/")

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
    formData.append('upload_preset', 'kuvhjttg');
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
    <div >
      <div className="max-w-lg mx-auto my-8">
        <h1 className="font-serif text-2xl font-bold text-center uppercase">
          create a post
        </h1>
        <form
          className="p-4 mx-10 bg-gray-400 rounded-lg lg:mx-1 "
          onSubmit={handleSubmit}
        >
          <div className="mb-6">
            <label
              htmlFor="base-input"
              className="block mb-2 font-serif text-lg font-semibold text-gray-900 uppercase dark:text-white"
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
              className="block mb-2 font-serif text-lg font-semibold text-gray-900 uppercase dark:text-white"
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
              className="block mb-2 font-serif text-lg font-semibold text-gray-900 uppercase dark:text-white"
            >
              content
            </label>
            <ReactQuill className='bg-white' value={content} modules={modules} onChange={setContent} placeholder="Content goes here..." />
          </div>
          <div className="mb-6">s
            <label
              className="block mb-2 font-serif text-lg font-semibold text-gray-900 uppercase dark:text-white"
              htmlFor="user_avatar"
            >
              Upload file
            </label>
            <input
              onChange={(e) => {
                onUploadImage(e.target.files[0]!);
              }}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              aria-describedby="user_avatar_help"
              id="user_avatar"
              type="file"
            ></input>
          </div>

          <div className="mb-6">
            <label
              htmlFor="countries"
              className="block mb-2 font-serif text-lg font-semibold text-gray-900 uppercase dark:text-white"
            >
              select a category
            </label>
            <select
              onChange={onCategoryChange}
              value={category}
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option>chose a category </option>
              {options.map((op, i) => {
                return (
                  <option value={op || ''} key={i}>
                    {' '}
                    {op}{' '}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex items-center justify-center space-x-10 text-center">
            <button
              onClick={() => Router.push('/')}
              type="submit"
              className="px-4 py-2 font-bold text-gray-100 uppercase transition-all duration-300 rounded-2xl bg-rose-500 hover:bg-rose-700"
            >
              cancel
            </button>
            <button
              disabled={!imageUrl}
              type="submit"
              className="px-4 py-2 font-bold text-gray-100 uppercase transition-all duration-300 bg-indigo-500 rounded-2xl hover:bg-indigo-700"
            >
              create
            </button>
          </div>
        </form>
      </div>
    </div>
  );

};

export default create
