import { ReactNode } from "react";
import { Box, Stack, Text, Link, Icon } from "@chakra-ui/react";
import { RiContactsLine, RiDashboardLine } from "react-icons/ri";

type NavSectionProps = {
  title: string;
  children: ReactNode
}

export function NavSection({ title, children }: NavSectionProps) {
  return (
    <Box>
      <Text>
        <Text fontWeight="bold" color="gray.400" fontSize="small" >
          {title}
        </Text>
        <Stack spacing="4" mt="8" align="stretch">
          {children}
        </Stack>
      </Text>
    </Box>
  );
}