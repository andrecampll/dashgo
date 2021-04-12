import { Box, Flex, Text, Avatar } from "@chakra-ui/react";

type ProfileProps = {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {
        showProfileData && (
          <Box mr="4" textAlign="right">
            <Text>André</Text>
            <Text color="gray.300" fontSize="small">
              andrevictor50@gmail.com
            </Text>
          </Box>
        )
      }

      <Avatar size="md" name="André Victor" src="https://github.com/andrecampll.png"/>
    </Flex>
  );
}