export default function DotAdvice({state}){
    return(
        <span className={` transition-all ease-out duration-300 bg-secondary mt-2 md:mt-3 w-2 h-2 rounded-full ${state? "opacity-100" : "opacity-50"}`}  ></span>
    )
}