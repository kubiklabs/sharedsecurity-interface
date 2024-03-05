import { Box } from "@chakra-ui/react";

import Ecosystem from "@/components/Aez/Ecosystem";
import CCStatus1 from "@/components/Aez/CCStatus1";
import Community from "@/components/Aez/Community";
import BrowserTitle from "@/components/BrowserTitle/BrowserTitle";
import Head from "next/head";

const Aez = () => {
    return (
        <>
            <BrowserTitle title="A.E.Z"/>
            <Head>
                {/* Set meta description */}
                <meta
                    name="A.E.Z."
                    content="Atom Economic Zone."
                />
            </Head>
            <Box flexDirection={"column"} display={"flex"} gap={"60px"}>
                <Ecosystem />
                <CCStatus1 />
                <Community />
            </Box>
        </>
    );
};

export default Aez;
