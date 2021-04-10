import { ElementType } from "react";
import { Text, Link, Icon, LinkProps as ChakraLinkProps } from "@chakra-ui/react";

type NavLinkProps = {
  icon: ElementType;
  children: string;
} & ChakraLinkProps;

export function NavLink({ icon, children, ...rest }: NavLinkProps) {
  return (
    <Link display="flex" align="center" {...rest}>
      <Icon as={icon} fontSize="20" />
      <Text ml="4" fontWeight="medium">{children}</Text>
    </Link>
  );
}