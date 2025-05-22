import {
  Menu,
  MenuItem,
  MenuItemOption,
  MenuItemDivider,
} from "@/components/menu/Menu";

export const CharacterSheetMenu = ({}) => {
  return (
    <Menu>
      <MenuItem label="File">
        <MenuItemOption label="New" onClick={() => {}} />
        <MenuItemOption label="Open" onClick={() => {}} />
        <MenuItemOption label="Save" onClick={() => {}} />
        <MenuItemOption label="Save As..." onClick={() => {}} />
        <MenuItemDivider />
        <MenuItemOption label="Export" onClick={() => {}} />
        <MenuItemOption label="Import" onClick={() => {}} />
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
