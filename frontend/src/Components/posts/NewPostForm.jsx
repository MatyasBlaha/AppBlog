import { Form, useNavigation } from "react-router-dom";
import Input from "../UI/Input.jsx";
import Button from "../UI/Button.jsx";
import { useState, useEffect } from "react";
import LoadingModal from "../UI/LoadingModal.jsx";

export default function NewPostForm({ onFormChange }) {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

    const [categories, setCategories] = useState([""]);
    const [sections, setSections] = useState([{ type: "text", content: "" }]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setIsModalOpen(isSubmitting);
    }, [isSubmitting]);

    function handleCategoryChange(index, value) {
        const updatedCategories = [...categories];
        updatedCategories[index] = value;
        setCategories(updatedCategories);
    }

    function removeCategory(index) {
        setCategories(categories.filter((_, i) => i !== index));
    }

    function addCategoryField() {
        setCategories([...categories, ""]);
    }

    function handleTextChange(index, value) {
        const updatedSections = [...sections];
        updatedSections[index] = { type: "text", content: value };
        setSections(updatedSections);
    }

    function handleImageChange(index, file) {
        const updatedSections = [...sections];
        updatedSections[index] = { type: "image", content: file };
        setSections(updatedSections);
    }

    function handleAddText() {
        setSections([...sections, { type: "text", content: "" }]);
    }

    function handleAddImage() {
        setSections([...sections, { type: "image", content: null }]);
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-800 text-gray-200 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-center mb-6">Create a New Post</h1>

            <Form method="post" encType="multipart/form-data" className="space-y-8">
                {/* Title Field */}
                <div>
                    <Input
                        type="text"
                        id="title"
                        name="title"
                        labelText="Post Title"
                        className="w-full border border-gray-600 p-2 rounded-md bg-gray-700 text-gray-200"
                        required
                    />
                </div>

                {/* Sections for Text and Image */}
                <div className="space-y-6">
                    {sections.map((section, index) => (
                        <div key={index} className="space-y-2">
                            {section.type === "text" && (
                                <div>
                                    <Input
                                        type="textarea"
                                        name={`section.text.${index}`}
                                        value={section.content}
                                        onChange={(e) =>
                                            handleTextChange(index, e.target.value)
                                        }
                                        placeholder="Write your text here..."
                                        className="w-full border border-gray-600 rounded-md bg-gray-700 text-gray-200 p-2"
                                    />
                                </div>
                            )}
                            {section.type === "image" && (
                                <div className="space-y-2">
                                    <Input
                                        type="file"
                                        name={`section.image.${index}`}
                                        onChange={(e) =>
                                            handleImageChange(index, e.target.files[0])
                                        }
                                        className="block w-full text-gray-200"
                                    />
                                    {section.content && (
                                        <img
                                            src={URL.createObjectURL(section.content)}
                                            alt={`Preview ${index}`}
                                            className="w-32 h-auto rounded-md shadow-md"
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Buttons to Add Sections */}
                    <div className="flex space-x-4">
                        <Button
                            onClick={handleAddText}
                            type="button"
                            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md"
                        >
                            Add Text
                        </Button>
                        <Button
                            onClick={handleAddImage}
                            type="button"
                            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md"
                        >
                            Add Image
                        </Button>
                    </div>
                </div>

                {/* Categories */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Categories</h2>
                    {categories.map((category, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <Input
                                type="text"
                                name={`categories[${index}]`}
                                value={category}
                                onChange={(e) =>
                                    handleCategoryChange(index, e.target.value)
                                }
                                className="w-full border border-gray-600 p-2 rounded-md bg-gray-700 text-gray-200"
                                required
                            />
                            <Button
                                type="button"
                                onClick={() => removeCategory(index)}
                                className="bg-red-500 hover:bg-red-600 px-2 py-1 rounded-md text-white"
                            >
                                Remove
                            </Button>
                        </div>
                    ))}
                    <Button
                        type="button"
                        onClick={addCategoryField}
                        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md"
                    >
                        Add Category
                    </Button>
                </div>

                {/* Published Checkbox */}
                <div className="flex items-center space-x-2">
                    <Input
                        type="checkbox"
                        id="published"
                        name="published"
                        className="w-5 h-5"
                    />
                    <label
                        htmlFor="published"
                        className="text-gray-300 cursor-pointer"
                    >
                        Published
                    </label>
                </div>

                {/* Submit Button */}
                <Button
                    disabled={isSubmitting}
                    className={`w-full py-2 text-lg rounded-md ${
                        isSubmitting
                            ? "bg-gray-600 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                    }`}
                >
                    {isSubmitting ? "Submitting..." : "Create Post"}
                </Button>
            </Form>

            {/* Loading Modal */}
            <LoadingModal
                isOpen={isModalOpen}
                message="Uploading post, please wait..."
            />
        </div>
    );
}