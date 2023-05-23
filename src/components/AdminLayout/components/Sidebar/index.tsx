import Image from 'next/image';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import {
  Flex,
  Button,
  Box,
  BoxProps,
  useMediaQuery,
  Avatar,
  Text,
  Link,
  Icon
} from '@chakra-ui/react';
import { SlGrid } from 'react-icons/sl';
import { FaRegEdit } from 'react-icons/fa';
import { AiOutlineFileText } from 'react-icons/ai';
import { MdOutlineArrowBackIos } from 'react-icons/md';
import { SidebarButton, SidebarButtonProps } from './components';

interface SidebarProps extends BoxProps {}

const Sidebar = ({ ...rest }: SidebarProps) => {
  const [isLargerSM] = useMediaQuery('(min-width: 640px)');
  const router = useRouter();

  const { id } = router.query;

  const menu: {
    title: string;
    href: string;
    props: Omit<SidebarButtonProps, '_href' | 'isActive'>;
  }[] = [
    {
      title: 'Dashboard',
      href: `/admin/${id}/dashboard`,
      props: { icon: SlGrid, fontWeight: { base: 400 } }
    },
    {
      title: '專案管理',
      href: `/admin/${id}/settings`,
      props: { icon: FaRegEdit, fontWeight: { base: 500 } }
    },
    {
      title: '訂單管理',
      href: `/admin/${id}/order`,
      props: { icon: AiOutlineFileText, fontWeight: { base: 500 } }
    }
  ];

  return (
    <Box
      h="full"
      pos="relative"
      display={{ base: 'block' }}
      px={{ base: 3, sm: 5, lg: 5 }}
      pt={{ base: 5, sm: 10, lg: 20 }}
      pb={{ base: 5, sm: 10, lg: 20 }}
      {...rest}
    >
      <Link
        as={NextLink}
        href="/admin/projects"
        className="flex items-center gap-x-1"
        color="primary.600"
        fontWeight={500}
        fontSize="sm"
        display={{ base: 'block', md: 'none' }}
        mx={3}
        pt={2}
        pb={5}
        _hover={{ textDecoration: 'none' }}
      >
        <Icon as={MdOutlineArrowBackIos} /> 回專案列表
      </Link>
      <Flex className="gap-y-5" h="full" flexDirection="column">
        <div className="flex justify-center sm:px-[115px]">
          <Image
            src="/images/logo.png"
            width={isLargerSM ? 172 : 129}
            height={isLargerSM ? 48 : 36}
            alt="TripPlus-Admin"
            priority
          ></Image>
        </div>
        <div className="my-5 flex flex-col items-center justify-center gap-y-3 sm:my-10">
          <Avatar
            size="2xl"
            className="outline outline-8 outline-offset-0 outline-secondary"
            name="王小明"
          ></Avatar>
          <Text
            fontWeight={{ base: 400 }}
            fontSize={{ base: 'sm', sm: '16px' }}
          >
            王小明
          </Text>
        </div>
        <Flex
          flexDirection={{ base: 'row', md: 'column' }}
          justifyContent={{ base: 'space-between' }}
          className="sm:gap-y-2"
        >
          {menu.map((item) => (
            <SidebarButton
              key={item.href}
              _href={item.href}
              isActive={item.href === router.asPath}
              {...item.props}
            >
              {item.title}
            </SidebarButton>
          ))}
        </Flex>
        <NextLink href="/admin/projects" legacyBehavior passHref>
          <Button
            h="auto"
            display={{ base: 'none', md: 'block' }}
            variant="outline"
            colorScheme="primary"
            mt={{ base: 0, sm: 'auto' }}
            py={{ base: 3 }}
          >
            返回專案列表
          </Button>
        </NextLink>
      </Flex>
    </Box>
  );
};

export default Sidebar;
