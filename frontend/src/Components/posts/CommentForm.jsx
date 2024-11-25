import {Form, Link} from "react-router-dom";
import Input from "../UI/Input.jsx";
import Button from "../UI/Button.jsx";

export default function CommentForm(){
    const isLogin = localStorage.getItem('token')

    return(
        <>
            <Form method='post' className='max-w-96'>
                    <div>
                        <Input type='textarea' id='content' name='content' labelText='Add comment' />
                    </div>
                    <div className='flex flex-row-reverse mt-4'>
                        {isLogin ? (
                            <Button>Send</Button>
                        ) : (
                            <Link to='/auth' className='text-gray-500'>Please log in to comment</Link>
                        )}
                    </div>
            </Form>
        </>
    )
}