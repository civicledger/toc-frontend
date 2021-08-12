import { Link, useRouteMatch } from 'react-router-dom';
import { useQuery } from 'react-query';
import { ChevronRightIcon } from '@heroicons/react/solid';
import GoogleMapReact from 'google-map-react';

import { locationQuery, goalsQuery } from '../../utilities/queries';

import PageHeader from '../layout/PageHeader';
import ArrangementView from '../location/ArrangementView';

const Location = () => {
  const { params } = useRouteMatch();

  const { data: location } = useQuery('getLocation', () => locationQuery(params.id), { keepPreviousData: true });
  const { data: goals } = useQuery('goals', goalsQuery, { keepPreviousData: true });
  if (!location || !goals) return '';

  let [lat, lng, zoom] = location?.geoPosition?.split(',');
  zoom = parseInt(zoom);

  return (
    <>
      <div className="h-96">
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAFFq4EXZl9GzzCt1ceMRlEhc0hH9rFH-g' }}
          defaultCenter={{ lat: parseFloat(lat), lng: parseFloat(lng) }}
          defaultZoom={zoom}
          yesIWantToUseGoogleMapApiInternals
        ></GoogleMapReact>
      </div>
      <div className="p-10">
        <PageHeader title={location.name}>
          <li>
            <div>
              <Link to="/locations" className="text-sm font-medium text-gray-500 hover:text-gray-700">
                All Locations
              </Link>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" />
              <span className="ml-4 text-sm font-medium text-gray-500">{location.name}</span>
            </div>
          </li>
        </PageHeader>

        <div className="grid grid-cols-4 gap-4 my-3 mt-10">
          <div className="px-5 py-2 text-center">Outcome</div>
          <div className="px-5 py-2 text-center">2021</div>
          <div className="px-5 py-2 text-center">2022</div>
          <div className="px-5 py-2 text-center">2023</div>
        </div>

        <ArrangementView strategies={location.strategies} goals={goals} />
      </div>
    </>
  );
};

export default Location;
