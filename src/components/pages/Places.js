import { useQuery } from 'react-query';
import { ChevronRightIcon } from '@heroicons/react/solid';
import GoogleMapReact from 'google-map-react';

import { placesQuery, strategiesQuery } from '../../utilities/queries';

import PageHeader from '../layout/PageHeader';
import PlaceList from '../place/PlaceList';

const Places = () => {
  const { data: places } = useQuery('getPlaces', placesQuery, { keepPreviousData: true });
  const { data: strategies } = useQuery('getStrategies', () => strategiesQuery(), { keepPreviousData: true });
  if (!strategies || !places) return '';

  const [lat, lng] = strategies[0]?.place?.geoPosition?.split(',');

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
        <PageHeader title="All Places">
          <li>
            <div className="flex items-center">
              <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" />
              <span className="ml-4 text-sm font-medium text-gray-500">All Places</span>
            </div>
          </li>
        </PageHeader>

        <div className="mt-10 mb-10">
          <PlaceList places={places} strategies={strategies} />
        </div>
      </div>
    </>
  );
};

export default Places;
