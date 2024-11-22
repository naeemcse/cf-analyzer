
import ResultView from "@/components/ResultView";
import Link from "next/link";
export default function Home() {
  return (
      <>

   <h1 className={"text-3xl text-center text-blue-400 mt-10 "}>
     Codeforces Analyzer
   </h1>
         <p className={"text-center font-sans"}>
          <Link href={"https://github.com/naeemcse"} className={"text-center text-sm font-bold hover:text-green-300"}>Made by Naeem</Link>
         </p>
          <ResultView/>
</> );
}
