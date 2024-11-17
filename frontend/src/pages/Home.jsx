import Button from "../Components/UI/Button.jsx";
import {NavigationLink} from "../Components/UI/NavLink.jsx";

function HomePage() {



    return (
        <div className='flex flex-col items-center justify-around' style={{height: '90vh'}}>
            <div className='text-center'>
                <h1 className='text-3xl uppercase'>
                    create your own blog ...
                </h1>
                <span>
                and be popular ⭐️️️⭐️️️⭐️️️⭐️️️⭐️️️
            </span>
            </div>
            <div className='flex flex-col items-center'>
                <Button>
                    get started
                </Button>
                <div className='py-6'>
                    <p>or</p>
                </div>
                <NavigationLink to='/posts'>
                    continue to blogs
                </NavigationLink>
            </div>
        </div>
    );
}

export default HomePage;