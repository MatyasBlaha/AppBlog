export default function Input({ type, id, name, labelText, spanText, ...props }) {
    return (
        <p>
            <label htmlFor={id} className="block mb-1 font-medium">
                {labelText}
            </label>
            {type === "textarea" ? (
                <textarea id={id} name={name} {...props} className="text-gray-700 border p-2 w-full" />
            ) : type === "checkbox" ? (
                <>
                    <input type={type} id={id} name={name} {...props} className="h-4 w-4"/>
                    <span>{spanText}</span>
                </>
            ) : (
                <input type={type} id={id} name={name} {...props} className="text-gray-700 border p-2 w-full text" />
            )}
        </p>
    );
}
