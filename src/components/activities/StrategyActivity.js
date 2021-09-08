import { LocationMarkerIcon } from '@heroicons/react/outline';
import { shortDate, shortTime } from '../../utilities/format';
import { Link } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';
import UserImagePlaceholder from '../../assets/images/userImagePlaceholder.png';

const StrategyActivity = ({ activity }) => {
  return (
    <div className="shadow rounded px-4 py-5 sm:px-6 sm:px-6">
      <div className="flex justify-between">
        <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
          <div className="flex space-x-3">
            <div className="flex items-start">
              <Link to={`/profiles/${activity.user.id}`} className="flex-shrink-0">
                <img
                  className="h-16 w-16 rounded-full"
                  src={activity.user.image ? activity.user.image : UserImagePlaceholder}
                  alt={activity.user.name}
                />
              </Link>
            </div>

            <div className="truncate">
              <div className="mt-2 flex items-stretch">
                <p className="font-medium text-indigo-600 truncate text-lg">
                  <Link to={`/profiles/${activity.user.id}`} className="hover:text-gray-400 mx-1">
                    {activity.user.name}
                  </Link>
                </p>
                <p className="ml-0.5 self-end font-normal text-gray-500 text-sm">
                  from
                  <Link to={`/entities/${activity.company.id}`} className="hover:text-gray-400 mx-1">
                    {activity.company.name}
                  </Link>
                </p>
              </div>
              <div className="mt-2 flex">
                <div className="flex items-center text-sm text-gray-500">
                  <LocationMarkerIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                  <p>Strategy created in {activity.place.name} </p>
                </div>
              </div>

              <div className="mt-3">
                <h3 className="leading-6 font-medium text-gray-900">{activity.name}</h3>
                <p>{activity.description}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-900">{shortDate(new Date(activity.createdAt))}</div>
          <div className="text-sm text-gray-500">at {shortTime(new Date(activity.createdAt))}</div>
        </div>
      </div>

      <div className="mt-4 h-60">
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAFFq4EXZl9GzzCt1ceMRlEhc0hH9rFH-g' }}
          defaultCenter={{
            lat: parseFloat(activity.place?.geoPosition?.split(',')[0]),
            lng: parseFloat(activity.place?.geoPosition?.split(',')[1]),
          }}
          defaultZoom={parseInt(activity.place?.geoPosition?.split(',')[2])}
          yesIWantToUseGoogleMapApiInternals
        ></GoogleMapReact>
      </div>

      <div className="mt-4 mb-2 ml-1 flex flex-wrap">
        <Link
          to={activity.link}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
        >
          <span>See More</span>
        </Link>
      </div>
    </div>
  );
};

export default StrategyActivity;
