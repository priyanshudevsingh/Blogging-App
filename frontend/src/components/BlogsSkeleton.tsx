export const BlogsSkeleton = () => {
    return (<div role="status" className="min-w-lg animate-pulse">
        <div className="border-b border-slate-200 p-4 max-w-screen-lg w-screen">
            <div className="flex items-center">
                <div className="w-8 h-8 px-2 bg-gray-200 rounded-full mb-4"></div>

                <div className="mx-2 h-2.5 bg-gray-200 rounded-full w-28 mb-4"></div>

                <div className="mx-2 h-2.5 bg-gray-200 rounded-full w-28 mb-4"></div>

            </div>

            <div className="h-2 bg-gray-200 rounded-full mb-4"></div>

            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full mb-5 w-64"></div>

            <div className="flex justify-between mt-2">
                <div className="h-2.5 bg-gray-200 rounded-full w-28 mb-4"></div>

                <div className="h-2.5 bg-gray-200 rounded-full w-28 mb-4"></div>
            </div>
        </div>
    </div>
    );
}