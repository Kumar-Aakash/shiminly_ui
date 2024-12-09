import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const Dropdown = ({ value, onChange, options }) => {
  return (
    <Menu as="div" className="relative inline-block text-left w-full">
      <Menu.Button className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
        <span className='text-[12px]'>{options.find((option) => option.value === value)?.label || 'Select Classification'}</span>
        <ChevronDownIcon className="w-5 h-5 ml-2 -mr-1 text-gray-400" />
      </Menu.Button>
      <Menu.Items className="absolute z-10 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
        {options.map((option) => (
          <Menu.Item key={option.value}>
            {({ active }) => (
              <button
                onClick={() => onChange(option.value)}
                className={`${
                  active ? 'bg-gray-100' : ''
                } block w-full text-left px-4 py-2 text-sm text-gray-700`}
              >
                {option.label}
              </button>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
};

export default Dropdown;
