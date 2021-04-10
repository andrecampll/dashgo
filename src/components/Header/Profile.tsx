import { Box, Flex, Text, Avatar } from "@chakra-ui/react";

export function Profile() {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>André</Text>
        <Text color="gray.300" fontSize="small">
          andrevictor50@gmail.com
        </Text>
      </Box>

      <Avatar size="md" name="André Victor" src="https://github.com/andrecampll.png"/>
    </Flex>
  );
}