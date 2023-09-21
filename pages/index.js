import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowRight } from "@mui/icons-material";

export async function getStaticProps() {
    const res = await fetch("https://type.fit/api/quotes");
    const data = await res.json();
    return {
        props: {
            data,
        },
    };
}

export default function Home({ data }) {
    const [quotes, setQuotes] = useState(null);

    useEffect(() => {
        randomQuote();
    }, []);

    function randomQuote() {
        let q = data[Math.floor(Math.random() * 10 + 1)];
        setQuotes(q);
    }

    return (
        <div className="grid place-items-center h-[100vh] bg-[#272b46] ">
            <div className="p-6 bg-[#485b83] border-solid border-black rounded-lg w-[400px]">
                <div className="flex flex-col items-center text-center gap-3">
                    <Image
                        src="/quotation.png"
                        alt="quotation image"
                        width={55}
                        height={55}
                        className=""
                    />
                    <p>{quotes?.text || ""}</p>
                    <div className="self-end">
                        - {quotes?.author.split(",")[0] || ""}
                    </div>
                    <button
                        className=" p-2 self-end bg-[#1f428c] rounded-md"
                        onClick={randomQuote}
                    >
                        Next <ArrowRight />
                    </button>
                </div>
            </div>
        </div>
    );
}
