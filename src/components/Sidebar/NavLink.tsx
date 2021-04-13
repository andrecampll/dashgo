import { ElementType } from "react";
import { Text, Link as ChakraLink, Icon, LinkProps as ChakraLinkProps } from "@chakra-ui/react";
import Link from 'next/link';

type NavLinkProps = {
  icon: ElementType;
  children: string;
  href: string
} & ChakraLinkProps;

export function NavLink({ icon, children, href, ...rest }: NavLinkProps) {
  return (
    <Link href={href} passHref>
      <ChakraLink display="flex" align="center" {...rest}>
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">{children}</Text>
      </ChakraLink>
    </Link>
  );
}
