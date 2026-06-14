const Loading = () => {
    return (
        <div className="flex justify-center items-center w-screen h-[calc(100vh-80px)]">
            <div
                className="w-10 h-10 rounded-full border-4 border-[#e0e0e0] dark:border-[#3c4043] border-t-primary animate-spin"
            />
        </div>
    );
};

export default Loading;
