import React, { FunctionComponent } from 'react';
import { Select, DatePicker } from 'antd';

import Button from 'src/components/SharedLayout/Shared/Button';

const { Option } = Select;

const defaultvalue = [
  { label: 'Select category' },
  { label: 'Select Location' },
];

const categoryOptions = [
  { value: 'Tech', label: 'Tech' },
  { value: 'Theatre', label: 'Theatre Art' },
];

const locationOptions = [
  { value: 'Lagos', label: 'Lagos' },
  { value: 'Abuja', label: 'Abuja' },
  { value: 'Ibadan', label: 'Ibadan' },
  { value: 'Ogun', label: 'Ogun' },
  { value: 'Abia', label: 'Abia' },
  { value: 'Imo', label: 'Imo' },
  { value: 'Anambra', label: 'Anambra' },
  { value: 'Ebonyi', label: 'Ebonyi' },
];

const EventSearch: FunctionComponent<{}> = () => {
  return (
    <div className="hidden md:block c-eventSearch">
      <div className="c-eventSearch-select">
        <div className="w-full mr-2">
          <label htmlFor="">What</label>
          <Select className="w-full" defaultValue={defaultvalue[0].label}>
            {categoryOptions.map((category) => {
              return (
                <Option key={category.value} value={category.value}>
                  {category.label}
                </Option>
              );
            })}
          </Select>
        </div>
        <div className="w-full mr-2">
          <label htmlFor="">Where</label>
          <Select className="w-full" defaultValue={defaultvalue[1].label}>
            {locationOptions.map((location) => {
              return (
                <Option key={location.value} value={location.value}>
                  {location.label}
                </Option>
              );
            })}
          </Select>
        </div>
        <div className="w-full mr-4">
          <label htmlFor="">When</label>
          <DatePicker className="w-full" id="eventDate" size="middle" />
        </div>
        <div>
          <Button
            type="button"
            className="bg-red-400 px-8 py-1 rounded text-white mt-6 c-eventSearch-btn"
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventSearch;
