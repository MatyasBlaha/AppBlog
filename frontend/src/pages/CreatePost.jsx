import React, {useState} from "react";
import NewPostForm from "../Components/posts/NewPostForm.jsx";
import {json} from "react-router-dom";
import {apiClient, uploadFiles} from "../util/apiCalls.js";

export default function CreatePostPage() {

    return (
        <div>
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

        const uploadFormData = new FormData();
        uploadFormData.append("image", file);

        const response = await uploadFiles(uploadFormData)

        imageSection.imageUrl = response
    }


    const orderedSections = filteredSections.map((section, index) => ({
        ...section,
        order: index + 1
    }))

    console.log(orderedSections)

    const data = {
        title,
        content: orderedSections,
        published,
        categories
    };

    console.log(data)

    const token = localStorage.getItem('token');

        const response = await apiClient('/posts', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer '+ token
            },
            body: JSON.stringify(data)
        })

        return response;

}
