import React from 'react';
import { Menu, MenuItem } from '@mui/material';
import { SaveAlt as SaveAltIcon } from '@mui/icons-material';
import { Tooltip } from '../Tooltip';
import { ToolbarButton } from '../Toolbar/ToolbarButton';

interface ExportMenuProps {
  onExport: (format: 'svg' | 'png') => void;
}

export const ExportMenu: React.FC<ExportMenuProps> = ({ onExport }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExport = (format: 'svg' | 'png') => {
    onExport(format);
    handleClose();
  };

  return (
    <>
      <Tooltip content="Export diagram">
        <button
          onClick={handleClick}
          className="p-2 text-stone-200 hover:text-white rounded-md hover:bg-stone-700/50 transition-colors duration-200"
        >
          <SaveAltIcon className="h-5 w-5" />
        </button>
      </Tooltip>
      <Menu
        id="export-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'export-button',
        }}
        className="relative"
        PaperProps={{
          style: {
            backgroundColor: '#1f2937',
            color: '#d1d5db',
          },
          className: "absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-stone-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        }}
      >
        <div className="py-1">
          <MenuItem 
            onClick={() => handleExport('svg')} 
            className={`hover:bg-stone-700 text-stone-200 group flex w-full items-center px-4 py-2 text-sm`}
          >
            Export as SVG
          </MenuItem>
          <MenuItem 
            onClick={() => handleExport('png')} 
            className={`hover:bg-stone-700 text-stone-200 group flex w-full items-center px-4 py-2 text-sm`}
          >
            Export as PNG
          </MenuItem>
        </div>
      </Menu>
    </>
  );
};
