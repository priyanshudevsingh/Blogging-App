import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import sm_logo from '../assets/sm-logo.png';
import gif from '../assets/gif.webp';

export const Home = () => {
    return (
        <div>
            <div className="flex justify-center flex-col items-center h-80">
                <div>
                    <img className="h-28 hidden sm:block" src={logo} alt="Logo" />
                    <img className="h-28 block sm:hidden" src={sm_logo} alt="Small logo" />
                </div>

                <div className="text-4xl font-bold mt-8">Welcome to Blogger</div>
                <div className="text-lg mt-2">The best place to share your thoughts with the world</div>
            </div>

            <div className="flex justify-center sm:h-96">
                <img src={gif} alt="Gif" />
            </div>

            <div className="flex justify-around underline text-slate-600 text-2xl mt-16">
                <Link to={"/signup"}>
                    <div>Create an account</div>
                </Link>
                <Link to={"/signin"}>
                    <div>Login to continue</div>
                </Link>
            </div>
        </div>

    )
}