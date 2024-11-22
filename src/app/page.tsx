import Image from "next/image";
import ResultView from "@/components/ResultView";

export default function Home() {
  return (
      <>

   <h1 className={"text-3xl text-center text-blue-400 mt-10 "}>
     Codeforces Analyzer
   </h1>

          <ResultView/>
</> );
}
