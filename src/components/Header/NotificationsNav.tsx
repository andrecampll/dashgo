import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

import { HStack, Icon, ButtonGroup, Button } from "@chakra-ui/react";
import { RiNotificationLine } from "react-icons/ri";
import { FiPower } from "react-icons/fi";

export function NotificationsNav() {
  const { signOut } = useContext(AuthContext);

  return (
    <HStack
      spacing={["6", "8"]}
      mx={["6", "8"]}
      pr={["6", "8"]}
      py="1"
      color="gray.300"
      borderRightWidth={1}
      borderColor="gray.700"
    >
      <ButtonGroup spacing="2">
        <Button background="transparent" _hover={{
          background: 'transparent',
          color: 'pink.500',
        }}>
          <Icon as={RiNotificationLine} fontSize="20" />
        </Button>
        <Button
          background="transparent"
          onClick={signOut}
          _hover={{
            background: 'transparent',
            color: 'pink.500',
          }}
        >
          <Icon as={FiPower} fontSize="20" />
        </Button>
      </ButtonGroup>
    </HStack>
  );
}