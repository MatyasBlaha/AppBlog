function Button({ children, textOnly, ...props}) {

    const cssClasses = textOnly
        ? 'relative text-md w-fit block after:block after:content-[\'\'] after:absolute after:h-[2px] after:bg-gray-200 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left'
        : 'cursor-pointer hover:bg-gray-100 border-2 rounded-md border-gray-100 hover:text-gray-700 px-4 py-2 bg-gray-700 text-gray-200 duration-150';

    return (
        <button className={cssClasses} {...props}>
            {children}
        </button>
    );
}

export default Button;