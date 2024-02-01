import { Link, Box } from "@chakra-ui/react"

const ForumLink = ({ redirectLink }: { redirectLink: string }) => {
    return (
        <Box textAlign={"left"}>
        <Link href={redirectLink} textAlign={"left"} fontSize={"2xl"} textDecoration={"underline"} _hover={{
            color: "white",
        }}>Forum Link </Link>
        </Box>
    )
}

export default ForumLink;