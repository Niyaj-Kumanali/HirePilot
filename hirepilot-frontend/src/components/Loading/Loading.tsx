import Spinner from '../ui/Spinner';

const Loading = () => {
    return (
        <div className="flex justify-center items-center w-screen h-[calc(100vh-80px)]">
            <Spinner size="lg" />
        </div>
    );
};

export default Loading;
