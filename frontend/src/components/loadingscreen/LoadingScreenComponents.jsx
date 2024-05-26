/** @format */

import { Flex } from "@chakra-ui/react";
import { Puff } from "react-loader-spinner";

const LoadingScreenComponents = () => {
  const loading = () => (
    <Puff
      visible={true}
      height={140}
      width={140}
      color="#4fa94d"
      ariaLabel="puff-loading"
      wrapperStyle={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      wrapperClass=""
    />
  );

  return (
    <Flex
      pos="fixed"
      bg="primary.800"
      inset={0}
      h="100vh"
      justify="center"
      align="center"
      w="100%"
      style={{ zIndex: "124444222222" }}
      
    >
      {loading()}
    </Flex>
  );
};

export default LoadingScreenComponents;
