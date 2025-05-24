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
        <MenuItemOption label="New" disabled onClick={() => {}} />
        <MenuItemDivider />
        <MenuItemOption label="Open" onClick={handleOpen} />
        <MenuItemDivider />
        <MenuItemOption label="Save" onClick={handleSave} />
        <MenuItemOption label="Save As..." disabled onClick={() => {}} />
      </MenuItem>
    </Menu>
  );
};
