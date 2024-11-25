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
        if (isSubmitting) {
            setIsModalOpen(true);
        } else {
            setIsModalOpen(false);
        }
    }, [isSubmitting]);

    function handleCategoryChange(index, value) {
        const updatedCategories = [...categories];
        updatedCategories[index] = value;
        setCategories(updatedCategories);
    }

    function removeCategory(index) {
        const updatedCategories = categories.filter((_, i) => i !== index);
        setCategories(updatedCategories);
    }

    function addCategoryField() {
        const updatedCategories = [...categories, ""];
        setCategories(updatedCategories);
    }

    function handleTextChange(index, value) {
        const updatedSections = [...sections];
        updatedSections[index].type = "text";
        updatedSections[index].content = value;
        setSections(updatedSections);
    }

    function handleImageChange(index, file) {
        const updatedSections = [...sections];
        updatedSections[index].type = "image";
        updatedSections[index].content = file;
        setSections(updatedSections);
    }

    function handleAddText() {
        const updatedSections = [...sections, { type: "text", content: "" }];
        setSections(updatedSections);
    }

    function handleAddImage() {
        const updatedSections = [...sections, { type: "image", content: null }];
        setSections(updatedSections);
    }

    return (
        <>
            <Form method="post" encType="multipart/form-data">
                <Input type="text" id="title" name="title" labelText="Title" required />
                <div className="py-36">
                    {sections.map((section, index) => (
                        <div key={index}>
                            {section.type === "text" && (
                                <Input
                                    type="textarea"
                                    name={`section.text.${index}`}
                                    value={section.content}
                                    onChange={(e) => handleTextChange(index, e.target.value)}
                                    placeholder="Write text here"
                                    required
                                />
                            )}
                            {section.type === "image" && (
                                <div>
                                    <Input
                                        type="file"
                                        name={`section.image.${index}`}
                                        onChange={(e) => handleImageChange(index, e.target.files[0])}
                                        required
                                    />
                                    {section.content && (
                                        <img
                                            src={URL.createObjectURL(section.content)}
                                            alt={`Preview ${index}`}
                                            style={{ width: "100px", height: "auto", marginTop: "10px" }}
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    ))}

                    <Button onClick={handleAddText} type="button">
                        Add text
                    </Button>
                    <Button onClick={handleAddImage} type="button">
                        Add image
                    </Button>
                </div>

                {categories.map((category, index) => (
                    <div key={index} className="flex">
                        <Input
                            type="text"
                            name={`categories[${index}]`}
                            value={category}
                            onChange={(e) => handleCategoryChange(index, e.target.value)}
                            className="border p-2 flex-grow"
                            required
                        />
                        <Button type="button" onClick={() => removeCategory(index)}>
                            Remove
                        </Button>
                    </div>
                ))}

                <Button type="button" onClick={addCategoryField}>
                    Add category
                </Button>
                <Input type="checkbox" id="published" name="published" spanText="Published" />
                <Button disabled={isSubmitting}>{isSubmitting ? "Wait..." : "Create"}</Button>
            </Form>

            <LoadingModal isOpen={isModalOpen} message="Uploading post, please wait..." />
        </>
    );
}
