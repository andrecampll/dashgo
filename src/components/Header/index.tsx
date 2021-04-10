import { Flex } from "@chakra-ui/react";

import { Logo } from "./Logo";
import { NotificationsNav } from "./NotificationsNNav";
import { Profile } from "./Profile";
import { SearchBox } from "./SearchBox";

export function Header() {
  return (
    <Flex
      w="100%"
      h="20"
      as="header"
      maxWidth={1480}
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      <Logo />

      <SearchBox />
    
      <Flex
        align="center"
        ml="auto"
      >
        <NotificationsNav />

        <Profile />
      </Flex>
    </Flex>
  );
}