import {
  Menu,
  MenuItem,
  MenuItemOption,
  MenuItemDivider,
} from "@/components/menu/Menu";

interface CharacterSheetMenuProps {
  handleSave?: () => void;
  handleOpen?: () => void;
}

export const CharacterSheetMenu: React.FC<CharacterSheetMenuProps> = ({
  handleSave,
  handleOpen,
}) => {
  return (
    <Menu>
      <MenuItem label="File">
        <MenuItemOption>New</MenuItemOption>
        <MenuItemDivider />
        <MenuItemOption onClick={handleOpen}>Open</MenuItemOption>
        <MenuItemDivider />
        <MenuItemOption onClick={handleSave}>Save</MenuItemOption>
        <MenuItemOption>Save As...</MenuItemOption>
      </MenuItem>
    </Menu>
  );
};
