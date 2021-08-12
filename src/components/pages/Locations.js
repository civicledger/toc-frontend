import { useQuery } from 'react-query';
import { ChevronRightIcon } from '@heroicons/react/solid';
import GoogleMapReact from 'google-map-react';

import { locationsQuery, strategiesQuery } from '../../utilities/queries';

import PageHeader from '../layout/PageHeader';
import LocationList from '../location/LocationList';

const Locations = () => {
  const { data: locations } = useQuery('getLocations', locationsQuery, { keepPreviousData: true });
  const { data: strategies } = useQuery('getStrategies', () => strategiesQuery(), { keepPreviousData: true });
  if (!strategies || !locations) return '';

  const [lat, lng] = strategies[0]?.location?.geoPosition?.split(',');

  return (
    <>
      <div className="h-96">
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAFFq4EXZl9GzzCt1ceMRlEhc0hH9rFH-g' }}
          defaultCenter={{ lat: parseFloat(lat), lng: parseFloat(lng) }}
          defaultZoom={7}
          yesIWantToUseGoogleMapApiInternals
        ></GoogleMapReact>
      </div>
      <div className="p-10">
        <PageHeader title="All Locations">
          <li>
            <div className="flex items-center">
              <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" />
              <span className="ml-4 text-sm font-medium text-gray-500">All Locations</span>
            </div>
          </li>
        </PageHeader>

        <div className="mt-10 mb-10">
          <LocationList locations={locations} strategies={strategies} />
        </div>
      </div>
    </>
  );
};

export default Locations;
