import React, { FunctionComponent } from 'react';
import Select from 'react-select';
import Button from 'src/components/SharedLayout/Shared/Button';

const Defaultvalue = [
  {value: 'default', label: 'Select category'},
  {value: 'default', label: 'Select Location'},
];

const categoryOptions = [
  {value: 'Tech', label: 'Tech'},
  {value: 'Theatre', label: 'Theatre Art'}
];

const locationOptions = [
  {value: 'Lagos', label: 'Lagos'},
  {value: 'Abuja', label: 'Abuja'},
  {value: 'Ibadan', label: 'Ibadan'},
  {value: 'Ogun', label: 'Ogun'},
  {value: 'Abia', label: 'Abia'},
  {value: 'Imo', label: 'Imo'},
  {value: 'Anambra', label: 'Anambra'},
  {value: 'Ebonyi', label: 'Ebonyi'},
];

const EventSearch: FunctionComponent<{}> = () => {
  return (
    <div className="c-eventSearch">
      <div className="c-eventSearch-select">
        <div className="w-full mr-2">
          <label htmlFor="">What</label>
          <Select defaultValue={Defaultvalue[0]} options={categoryOptions} className="w-full" />
        </div>
        <div className="w-full mr-2">
          <label htmlFor="">Where</label>
          <Select defaultValue={Defaultvalue[1]} options={locationOptions} className="w-full" />
        </div>
        <div className="w-full mr-4">
          <label htmlFor="">When</label>
          <input type="date" name="" id="" className="w-full c-eventSearch-when" />
        </div>
        <div>
          <Button type="button" className="bg-red-400 px-8 py-2 rounded text-white mt-6 c-eventSearch-btn">
            Search
          </Button>
        </div>
      </div>
    </div>
  )
};

export default EventSearch;
