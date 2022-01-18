
import { ChakraProvider, useToast } from "@chakra-ui/react";
import * as React from "react";

export default ({ notice, alert }) => {
  const NoticeToaster = ({ description }) => {
    const toast = useToast()
    React.useEffect(() => {
      toast({
        title: "Notice",
        description: description,
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    }, [])
    return <></>
  }
  const AlertToaster = ({ description }) => {
    const toast = useToast()
    React.useEffect(() => {
      toast({
        title: "Alert",
        description: description,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }, [])
    return <></>
  }
  return (
    <ChakraProvider>
      {notice && <NoticeToaster description={notice} />}
      {alert && <AlertToaster description={alert} />}
    </ChakraProvider>
  )
}