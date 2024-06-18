export default function DotAdvice({state}){
    return(
        <span className={` transition-all ease-out duration-300 bg-secondary mt-3 w-3 h-3 rounded-full ${state? "opacity-100" : "opacity-50"}`}  ></span>
    )
}