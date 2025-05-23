import {
  Menu,
  MenuItem,
  MenuItemOption,
  MenuItemDivider,
} from "@/components/menu/Menu";

interface CharacterSheetMenuProps {
  handleSave?: () => void;
}

export const CharacterSheetMenu: React.FC<CharacterSheetMenuProps> = ({
  handleSave,
}) => {
  return (
    <Menu>
      <MenuItem label="File">
        <MenuItemOption label="New" disabled onClick={() => {}} />
        <MenuItemOption label="Open" disabled onClick={() => {}} />
        <MenuItemOption label="Save" onClick={handleSave} />
        <MenuItemOption label="Save As..." disabled onClick={() => {}} />
        <MenuItemDivider />
        <MenuItemOption label="Export" disabled onClick={() => {}} />
        <MenuItemOption label="Import" disabled onClick={() => {}} />
      </MenuItem>
      <MenuItem label="Edit">
        <MenuItemOption label="Undo" disabled onClick={() => {}} />
        <MenuItemOption label="Redo" disabled onClick={() => {}} />
        <MenuItemDivider />
        <MenuItemOption label="Cut" disabled onClick={() => {}} />
        <MenuItemOption label="Copy" disabled onClick={() => {}} />
        <MenuItemOption label="Paste" disabled onClick={() => {}} />
      </MenuItem>
    </Menu>
  );
};
