
type BoxProps = {
    title: string
    borderClass: string
    height: number | string
    width: number | string
    children?: React.ReactNode
}

export default function Box({ title, borderClass, height, width, children }: BoxProps) {


    return (
        <div
            className="logo"
            style={{
                minHeight: `${height}rem`,
                minWidth: `${width}rem`,
                height: `${height}rem`,
                width: `${width}rem`,
            }}
        >
            <h3 className="text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight p-3">
                {title}
            </h3>
            <div
                className={`${borderClass} rounded-md w-full h-full p-3`}
            >
                <div className={`${borderClass} rounded-md w-full h-full`}>
                    {children}
                </div>
            </div>
        </div>
    )
}