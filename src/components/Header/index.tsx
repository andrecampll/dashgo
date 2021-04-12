import { Flex, Icon, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { RiMenuLine } from "react-icons/ri";
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContent";

import { Logo } from "./Logo";
import { NotificationsNav } from "./NotificationsNav";
import { Profile } from "./Profile";
import { SearchBox } from "./SearchBox";

export function Header() {
  const { onOpen } = useSidebarDrawer();

  const isWiderVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

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
      { !isWiderVersion && (
        <IconButton
          aria-label="Open navigation"
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          mr="2"
        >

        </IconButton>
      )}

      <Logo />

      { isWiderVersion && <SearchBox /> }
    
      <Flex
        align="center"
        ml="auto"
      >
        <NotificationsNav />

        <Profile showProfileData={isWiderVersion} />
      </Flex>
    </Flex>
  );
}