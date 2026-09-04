import { useNavbarSecondaryMenu } from '@docusaurus/theme-common/internal';

export default function NavbarMobileSidebarSecondaryMenu(): React.ReactNode | null {
  const secondaryMenu = useNavbarSecondaryMenu();
  return secondaryMenu.content || null;
}
