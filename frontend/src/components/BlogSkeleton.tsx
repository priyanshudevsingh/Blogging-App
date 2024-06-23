export const BlogSkeleton = () => {
    return (<div role="status" className="min-w-lg animate-pulse">
        <div className="grid grid-cols-12 px-10 pt-20">
            <div className="col-span-8 pr-5">
                <div className="h-10 bg-gray-200 rounded-full mb-1"></div>
                <div className="h-10 bg-gray-200 rounded-full mb-3"></div>

                <div className="flex justify-between mb-4">
                    <div className="h-2 w-36 bg-gray-200 rounded-full mb-4 pb-4"></div>

                    <div className="h-2 w-36 bg-gray-200 rounded-full pb-4"></div>
                </div>

                <div className="h-4 mb-2 bg-gray-200 rounded-full"></div>
                <div className="h-4 mb-2 bg-gray-200 rounded-full"></div>
                <div className="h-4 mb-2 bg-gray-200 rounded-full"></div>
                <div className="h-4 mb-2 bg-gray-200 rounded-full"></div>
                <div className="h-4 mb-2 bg-gray-200 rounded-full"></div>
                <div className="h-4 mb-2 bg-gray-200 rounded-full"></div>
                <div className="h-4 mb-2 bg-gray-200 rounded-full"></div>
                <div className="h-4 mb-2 bg-gray-200 rounded-full"></div>
            </div>

            <div className="col-span-4 pl-5">
                <div className="h-3 w-20 bg-gray-200 rounded-full"></div>

                <div className="flex mt-3">
                    <div>
                        <div className="w-11 h-11 px-2 bg-gray-200 rounded-full mb-4"></div>
                    </div>

                    <div className="px-2">
                        <div className="h-5 w-48 mb-5 bg-gray-200 rounded-full"></div>
                        <div className="h-2 w-96 mb-2 bg-gray-200 rounded-full"></div>
                        <div className="h-2 w-40 bg-gray-200 rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}