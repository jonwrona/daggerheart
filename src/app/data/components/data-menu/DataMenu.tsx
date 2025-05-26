import {
  Menu,
  MenuItem,
  MenuItemOption,
  MenuItemDivider,
} from "@/components/menu/Menu";

export const DataMenu = ({
  handleNew,
  handleImport,
  handleExport,
}: {
  handleNew?: () => void;
  handleImport?: () => void;
  handleExport?: () => void;
}) => {
  return (
    <Menu>
      <MenuItem label="File">
        <MenuItemOption onClick={handleNew}>New</MenuItemOption>
        <MenuItemDivider />
        <MenuItemOption onClick={handleImport}>Import</MenuItemOption>
        <MenuItemOption onClick={handleExport}>Export</MenuItemOption>
      </MenuItem>
    </Menu>
  );
};
