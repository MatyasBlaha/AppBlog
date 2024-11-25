import React, {useState} from "react";
import NewPostForm from "../Components/posts/NewPostForm.jsx";
import {json} from "react-router-dom";

export default function CreatePostPage() {




    return (
        <div>
            <h2>Create post</h2>
            <NewPostForm  />
        </div>
    );
}

export async function action({ request }) {
    const formData = await request.formData();

    const formEntries = Object.fromEntries(formData.entries());
    console.log("Raw Form Data:", formEntries);

    const sections = [];
    const categories = [];
    const published = formEntries.published === "on";
    const title = formEntries.title;

    for (const [key, value] of formData.entries()) {
        if (key.startsWith("section.text.")) {
            const index = key.split(".")[2];
            sections[index] = { type: "text", content: value };
        } else if (key.startsWith("section.image.")) {
            const index = key.split(".")[2];
            sections[index] = { type: "image", imageUrl: value };
        } else if (key.startsWith("categories[")) {
            categories.push(value);
        }
    }

    const filteredSections = sections.filter(Boolean);

    const imageSections = filteredSections.filter((section) => section.type === 'image' && section.imageUrl instanceof File)


    for(const imageSection of imageSections) {

        const file = imageSection.imageUrl;
        console.log(file)

        const uploadFormData = new FormData();
        uploadFormData.append("image", file);

        try {
            console.log(uploadFormData)

            const response = await fetch("http://localhost:8080/imageUpload", {
                method: "POST",
                body: uploadFormData,
            });

            if(!response.ok){
                throw json(
                    {message: 'failed to upload images on cloudinary'},
                    {status: 404}
                )
            }

            const result = await response.json();
            console.log(result)

            imageSection.imageUrl = result.url;
        } catch(error) {
            console.error('error while uploading image:', error);
            throw json(
                {message: 'failed to upload images on cloudinary'},
                {status: 500}
            )
        }
    }


    const orderedSections = filteredSections.map((section, index) => ({
        ...section,
        order: index + 1
    }))

    const data = {
        title,
        content: orderedSections,
        published,
        categories
    };

    const token = localStorage.getItem('token');

    try {

        const response = await fetch('http://localhost:8080/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(data)
        })

        if(!response.ok){
            throw json(
                {message: 'could not fetch'},
                { status: 404}
            )
        } else {
            return response
        }

    } catch(error) {
        throw json(
            {message: 'failed to upload'},
            {status: 500}
        )
    }
}
