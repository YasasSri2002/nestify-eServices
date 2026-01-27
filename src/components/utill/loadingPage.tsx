export function FullPageLoading(){
    return(
        <div className="w-full h-dvh grid content-center justify-items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
    )
}

export function LoadingPage(){
    return(
        <div className="w-full h-full grid content-center justify-items-center my-5">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
    )
}