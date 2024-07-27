import React, { useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
// import { Progress } from 'flowbite-react';

// Dummy data to use if no items prop is provided
const dummyData = {
  data: {
    ordersByCity: [
      { city: 'New York', percentage: 75 },
      { city: 'Los Angeles', percentage: 50 },
      { city: 'Chicago', percentage: 25 },
    ],
  },
};

const GeoChart = ({ items = dummyData }) => {
  const [data, setData] = useState(dummyData.data);

  useEffect(() => {
    if (items?.data) {
      setData(items.data);
      console.log(items);
    }
  }, [items]);

  return (
    <div className="w-full h-full">
      <div className="w-full p-5 bg-white rounded-md">
        <div className="my-3">
          <ComposableMap>
            <Geographies geography="https://unpkg.com/world-atlas@2.0.2/countries-50m.json">
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: {
                        fill: '#F4F7FD',
                        outline: 'none',
                        stroke: '#939393',
                        strokeWidth: 0.5,
                      },
                      hover: {
                        fill: '#E6E6E6',
                        outline: 'none',
                        stroke: '#939393',
                        strokeWidth: 0.5,
                      },
                      pressed: {
                        fill: '#a4a0a0',
                        outline: 'none',
                        stroke: '#939393',
                        strokeWidth: 0.5,
                      },
                    }}
                  />
                ))
              }
            </Geographies>
          </ComposableMap>
        </div>
        <div>
          {data?.ordersByCity?.map((item, index) => (
            <div className="mt-3" key={index}>
              {/* <Progress
                progress={item.percentage}
                color="blue"
                labelProgress
                size="md"
                progressLabelPosition="outside"
                textLabel={item.city}
                textLabelPosition="outside"
                labelText
              /> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GeoChart;
