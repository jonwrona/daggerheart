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
    </Menu>
  );
};
